import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { getUserByEmail } from "./getUserByEmail";

export async function getSession() {
  return await getServerSession(authOptions);
}

export async function getCurrentUser() {
  try {
    const session = await getSession();
    // console.log("sessions", session);
    

    if (!session?.user?.email) return null;
    // const data = await getUserByEmail(session.user.email);
    

    return session?.user
  } catch (error: any) {
    console.error("Error in getCurrentUser:", error);
    return null;
  }
}
