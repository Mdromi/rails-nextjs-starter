import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialProviders from "next-auth/providers/credentials";
import axios from "axios";
import { getUserByEmail } from "@/actions/getUserByEmail";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialProviders({
      name: "credentials",
      credentials: {
        email: {
          label: "email",
          type: "text",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            throw new Error("Invalid email or password");
          }

          const data = {
            user: {
              email: credentials?.email,
              password: credentials?.password,
            },
          };
          
          const response = await axios.post(`${apiUrl}/login`, data);

          const user = response.data.status.data.user;

          // Extract bearer token from response headers
          const accessToken = response.headers.authorization.split(" ")[1];

          const userDataWithToken = {
            ...user,
            accessToken,
          };

          return userDataWithToken;
        } catch (error: any) {
          console.error("error", error.message);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  callbacks: {
    // async signIn({ account, profile, user }) {
    //   if (account?.type === "oauth") {
    //     try {
    //       const newUser = extractUserInfo(profile);
    //       const response = await signupUser(newUser);
    
    //       console.log("account", account);
    //       console.log("profile", profile);
    //       console.log("user", user);
    
    //       const accessToken = response.accessToken;
    //       const userData = { accessToken, ...response.data.data };
    //       console.log("signIn userData:", userData);
    //       return true; // Return true for successful sign-in
    //     } catch (error) {
    //       console.error("Error signing in:", error);
    //       return false; // Indicates failed sign-in
    //     }
    //   }
    
    //   return true; // Indicates successful sign-in
    // },
    async session({ session, token, user }) {
      // console.log("session_user", user);
      // console.log("session_session", session);
      // console.log("session_token", token);

      if (token && token.user) {
        session.user = token.user;
      }

      return session;
    },
    async jwt({ token, trigger, session, user }) {
      // console.log("jwt_token", token);
      // console.log("jwt_trigger", trigger);
      // console.log("jwt_session", session);
      // console.log("jwt_user", user);

      if (trigger === "update") {
        if (session) {
          token.user = session;
        }
      }
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

function extractUserInfo(profile: any) {
  const { name, email } = profile;
  const verified = profile?.email_verified || false;
  const password = generateRandomPassword();
  return { name, email, verified, password };
}

async function signupUser(userData: any) {
  try {
    const response = await axios.post(`${apiUrl}/signup`, { user: userData });
    const accessToken = response.headers.authorization.split(" ")[1];
    return { data: response.data, accessToken }; // Return signup result
  } catch (error: any) {
    throw new Error("Failed to signup user: " + error.message);
  }
}

function generateRandomPassword(length: number = 12) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return password;
}

export default NextAuth(authOptions);
