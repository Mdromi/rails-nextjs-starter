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
          console.log("user", user);

          // Extract bearer token from response headers
          const accessToken = response.headers.authorization.split(" ")[1];

          return { ...user, accessToken };
          // Save user data in session
          // return Promise.resolve({ ...user, accessToken });
        } catch (error: any) {
          console.error("error", error.message);
          throw new Error("Invalid email or password");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        console.log("data_sessions", session);
        const data = await getUserByEmail(session.user.email);
        
        
        session.user = data.userData;
        return session;
      } catch (error) {
        console.error("Error in session callback:", error);
        throw error;
      }
    },
  },
  pages: {
    signIn: "/login",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET
};

export default NextAuth(authOptions);
