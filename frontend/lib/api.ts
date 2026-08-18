import {
  getAccessToken,
} from "@/lib/auth";

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

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
}

export async function loginUser(
  data: LoginRequest
): Promise<LoginResponse> {

  const response = await fetch(
    `${API_URL}/auth/login`,
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
      "Invalid username or password"
    );
  }

  return responseData;
}

export interface CurrentUser {
  id: number;
  username: string;
  is_admin: boolean;
}

export async function getCurrentUser():
  Promise<CurrentUser> {

  const token =
    getAccessToken();


  if (!token) {

    throw new Error(
      "Not authenticated"
    );

  }


  const response = await fetch(
    `${API_URL}/users/me`,
    {
      method: "GET",

      headers: {
        Authorization:
          `Bearer ${token}`,
      },
    }
  );


  const responseData =
    await response.json();


  if (!response.ok) {

    throw new Error(
      responseData.detail ||
      "Unable to get current user"
    );

  }


  return responseData;
}