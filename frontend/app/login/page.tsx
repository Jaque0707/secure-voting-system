"use client";

import "./login.css";

import {
  FormEvent,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  loginUser,
} from "@/lib/api";

import {
  saveAccessToken,
} from "@/lib/auth";

import Logo from "@/components/Logo";

import Button from "@/components/ui/Button";

import Input from "@/components/ui/Input";

import Card from "@/components/ui/Card";

import Alert from "@/components/ui/Alert";


export default function LoginPage() {

  const router = useRouter();


  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");


  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");


  async function handleLogin(
    event: FormEvent<HTMLFormElement>
  ) {

    event.preventDefault();

    setError("");

    setLoading(true);


    try {

      const result =
        await loginUser({
          username,
          password,
        });


      saveAccessToken(
        result.access_token
      );


      router.push(
        "/dashboard"
      );


    } catch (error) {

      console.error(error);


      if (error instanceof Error) {

        setError(
          error.message
        );

      } else {

        setError(
          "Unable to log in"
        );

      }


    } finally {

      setLoading(false);

    }

  }


  return (
    <main className="login-page">

      <Card
        padding="large"
        className="login-card"
      >

        <div className="login-header">

          <Logo
            showText={false}
            size={58}
          />


          <h1>
            Secure Voting System
          </h1>


          <h2>
            Log in
          </h2>


          <p>
            Access your secure voting account.
          </p>

        </div>


        <form
          className="login-form"
          onSubmit={handleLogin}
        >

          <Input
            id="username"
            label="Username"
            type="text"
            value={username}
            onChange={(event) =>
              setUsername(
                event.target.value
              )
            }
            placeholder="Enter your username"
            required
          />


          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
            placeholder="Enter your password"
            required
          />


          {error && (
            <Alert type="error">
              {error}
            </Alert>
          )}


          <Button
            type="submit"
            fullWidth
            loading={loading}
            loadingText="Logging in..."
          >
            Log in
          </Button>

        </form>


        <div className="register-link">

          <span>
            Don't have an account?
          </span>

          <a href="/register">
            Create an account
          </a>

        </div>

      </Card>

    </main>
  );
}