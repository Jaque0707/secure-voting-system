const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";


export interface RegisterRequest {
  username: string;
  password: string;
  public_key: string;
}


export interface RegisterResponse {
  id: number;
  username: string;
  message: string;
}


export async function registerUser(
  data: RegisterRequest
): Promise<RegisterResponse> {

  const response = await fetch(
    `${API_URL}/auth/register`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    }
  );

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.detail ||
      "Error during registration"
    );
  }

  return responseData;
}