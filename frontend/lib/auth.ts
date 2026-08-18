const TOKEN_KEY = "svs_access_token";


export function saveAccessToken(
  token: string
): void {

  sessionStorage.setItem(
    TOKEN_KEY,
    token
  );

}


export function getAccessToken(): string | null {

  return sessionStorage.getItem(
    TOKEN_KEY
  );

}


export function removeAccessToken(): void {

  sessionStorage.removeItem(
    TOKEN_KEY
  );

}