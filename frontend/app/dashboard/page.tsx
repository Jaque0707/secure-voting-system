"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  getCurrentUser,
} from "@/lib/api";


interface User {
  id: number;
  username: string;
  is_admin: boolean;
}


export default function DashboardPage() {

  const router = useRouter();


  const [user, setUser] =
    useState<User | null>(null);


  const [loading, setLoading] =
    useState(true);


  useEffect(() => {

    async function loadUser() {

      try {

        const currentUser =
          await getCurrentUser();

        setUser(
          currentUser
        );

      } catch {

        router.push(
          "/login"
        );

      } finally {

        setLoading(false);

      }

    }


    loadUser();

  }, [router]);


  if (loading) {

    return (
      <main
        style={{
          padding: "40px",
        }}
      >
        <p>
          Loading...
        </p>
      </main>
    );

  }


  if (!user) {
    return null;
  }


  return (
    <main
      style={{
        padding: "40px",
      }}
    >

      <h1>
        Welcome, {user.username}
      </h1>


      <p>
        User ID: {user.id}
      </p>


      <p>
        Role:{" "}
        {user.is_admin
          ? "Administrator"
          : "User"}
      </p>

    </main>
  );
}