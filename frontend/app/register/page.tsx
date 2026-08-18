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

import Logo from "@/components/Logo";

import Button from "@/components/ui/Button";

import Input from "@/components/ui/Input";

import Card from "@/components/ui/Card";

import Alert from "@/components/ui/Alert";


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

    <Card
      padding="large"
      className="register-card"
    >

      <div className="register-header">

        <Logo
          showText={false}
          size={58}
        />


        <h1>
          Secure Voting System
        </h1>


        <h2>
          Create an account
        </h2>


        <p>
          Register to participate in secure
          voting.
        </p>

      </div>


      <form
        className="register-form"
        onSubmit={handleRegister}
      >

        <Input
          id="username"
          label="Username"
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


        <Input
          id="password"
          label="Password"
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          placeholder="Enter your password"
          required
          minLength={8}
        />


        <Alert
          type="warning"
          title="Important"
        >
          During registration, your key pair
          will be generated automatically.
          Your private key will be downloaded
          to your device. Keep it in a safe place.
        </Alert>


        {error && (
          <Alert type="error">
            {error}
          </Alert>
        )}


        {success && (
          <Alert type="success">
            {success}
          </Alert>
        )}


        <Button
          type="submit"
          fullWidth
          loading={loading}
          loadingText="Creating account..."
        >
          Create account
        </Button>

      </form>


      <div className="login-link">

        <span>
          Already have an account?
        </span>

        <a href="/login">
          Log in
        </a>

      </div>

    </Card>

  </main>
);
}