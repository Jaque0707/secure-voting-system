export async function generateUserKeyPair(): Promise<CryptoKeyPair> {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: "RSA-PSS",
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: "SHA-256",
    },
    true,
    ["sign", "verify"]
  );

  return keyPair;
}

export async function exportPublicKey(
  publicKey: CryptoKey
): Promise<string> {
  const exported = await window.crypto.subtle.exportKey(
    "spki",
    publicKey
  );

  const bytes = new Uint8Array(exported);

  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  const base64 = window.btoa(binary);

  const formatted = base64.match(/.{1,64}/g)?.join("\n") ?? "";

  return `-----BEGIN PUBLIC KEY-----\n${formatted}\n-----END PUBLIC KEY-----`;
}

export async function exportPrivateKey(
  privateKey: CryptoKey
): Promise<string> {
  const exported = await window.crypto.subtle.exportKey(
    "pkcs8",
    privateKey
  );

  const bytes = new Uint8Array(exported);

  let binary = "";

  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }

  const base64 = window.btoa(binary);

  const formatted = base64.match(/.{1,64}/g)?.join("\n") ?? "";

  return `-----BEGIN PRIVATE KEY-----\n${formatted}\n-----END PRIVATE KEY-----`;
}

export function downloadPrivateKey(
  privateKeyPem: string
): void {
  const blob = new Blob(
    [privateKeyPem],
    { type: "application/x-pem-file" }
  );

  const url = window.URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "private_key.pem";

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);

  window.URL.revokeObjectURL(url);
}

export async function signMessage(
  privateKey: CryptoKey,
  message: string
): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();

  return await window.crypto.subtle.sign(
    {
      name: "RSA-PSS",
      saltLength: 32,
    },
    privateKey,
    encoder.encode(message)
  );
}

export async function verifySignature(
  publicKey: CryptoKey,
  message: string,
  signature: ArrayBuffer
): Promise<boolean> {
  const encoder = new TextEncoder();

  return await window.crypto.subtle.verify(
    {
      name: "RSA-PSS",
      saltLength: 32,
    },
    publicKey,
    signature,
    encoder.encode(message)
  );
}