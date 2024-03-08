import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function getUserByEmail(email: string, accessToken: string) {
  console.log("email", email);
  
  try {
    const response = await axios.get(`${apiUrl}/users`, {
      params: {
        email: email
      },
      headers: {
        "Content-Type": "application/json", // Update content type to JSON
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status !== 200) {
      throw new Error('Failed to fetch user');
    }
    return response.data;
  } catch (error: any) {
    console.error('Error fetching user:', error.message);
    throw error;
  }
}

