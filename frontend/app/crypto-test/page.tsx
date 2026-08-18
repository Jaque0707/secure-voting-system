"use client";

import { useState } from "react";

import {
  generateUserKeyPair,
  exportPublicKey,
  exportPrivateKey,
  downloadPrivateKey,
} from "@/lib/crypto/userKeys";

export default function CryptoTestPage() {
  const [result, setResult] = useState("");

  async function testKeys() {
  try {
    const keyPair = await generateUserKeyPair();

    const publicKey = await exportPublicKey(
      keyPair.publicKey
    );

    const privateKey = await exportPrivateKey(
      keyPair.privateKey
    );

    downloadPrivateKey(privateKey);

    setResult(
      [
        "Keys generated successfully.",
        "",
        "Public key:",
        publicKey,
        "",
        "Private key downloaded as private_key.pem",
      ].join("\n")
    );
  } catch (error) {
    console.error(error);
    setResult("Error during cryptographic test");
  }
}

  return (
    <main>
      <h1>DOCKER HOT RELOAD 9999999999</h1>

      <button onClick={testKeys}>
        Generate and Test Keys
      </button>

      <pre>{result}</pre>
    </main>
  );
}