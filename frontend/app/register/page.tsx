"use client";

import "./register.css";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import {
  generateUserKeyPair,
  exportPublicKey,
  exportPrivateKey,
  downloadPrivateKey,
} from "@/lib/crypto/userKeys";

import { registerUser } from "@/lib/api";


export default function RegisterPage() {

  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  async function handleRegister(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {

      /*
       * 1. Generar las llaves
       *
       * Esto ocurre SOLAMENTE durante el registro.
       */
      const keyPair = await generateUserKeyPair();


      /*
       * 2. Exportar la llave pública
       *
       * Esta sí puede enviarse al backend.
       */
      const publicKey = await exportPublicKey(
        keyPair.publicKey
      );


      /*
       * 3. Registrar usuario
       *
       * La llave privada todavía NO sale del navegador.
       */
      const result = await registerUser({
        username,
        password,
        public_key: publicKey,
      });


      /*
       * 4. Solamente después de que el backend
       * confirme el registro, exportamos la privada.
       */
      const privateKey = await exportPrivateKey(
        keyPair.privateKey
      );


      /*
       * 5. Descargar la privada.
       */
      downloadPrivateKey(privateKey);


      setSuccess(
        "Usuario registrado correctamente. " +
        "Tu llave privada fue descargada."
      );


      /*
       * 6. Mandar al login.
       *
       * Puedes dejar un pequeño tiempo para que
       * el usuario vea el mensaje.
       */
      console.log(
        "Registered user:",
        result
      );

      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (error) {

      console.error(error);

      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError(
          "Error durante el registro"
        );
      }

    } finally {

      setLoading(false);

    }
  }


  return (
  <main className="register-page">

    <section className="register-card">

      <div className="register-header">

        <div className="security-icon">
          🔐
        </div>

        <h1>Secure Voting System</h1>

        <h2>Create an account</h2>

        <p>
          Register to participate in secure 
          voting.
        </p>

      </div>


      <form
        className="register-form"
        onSubmit={handleRegister}
      >

        <div className="form-group">

          <label htmlFor="username">
            Username
          </label>

          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            placeholder="Enter your username"
            required
            minLength={3}
            maxLength={30}
          />

        </div>


        <div className="form-group">

          <label htmlFor="password">
            Password
          </label>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter your password"
            required
            minLength={8}
          />

        </div>


        <div className="security-info">

          <span className="security-info-icon">
            🔑
          </span>

          <div>

            <strong>
              Important
            </strong>

            <p>
              During registration, your 
              key pair will be generated 
              automatically. Your private 
              key will be downloaded to 
              your device. Keep it in a 
              safe place.
            </p>

          </div>

        </div>


        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        {success && (
          <div className="success-message">
            {success}
          </div>
        )}


        <button
          className="register-button"
          type="submit"
          disabled={loading}
        >

          {loading
            ? "Creating account..."
            : "Create account"}

        </button>

      </form>


      <div className="login-link">

        <span>
          Already have an account?
        </span>

        <a href="/login">
          Log in
        </a>

      </div>

    </section>

  </main>
);
}