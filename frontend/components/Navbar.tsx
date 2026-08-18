"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import Logo from "./Logo";


export default function Navbar() {

  const pathname = usePathname();


  return (
    <header className="navbar">

      <div className="navbar-inner">

        <Link
          href="/"
          className="navbar-brand"
        >
          <Logo />
        </Link>


        <nav className="navbar-navigation">

          <Link
            href="/"
            className={
              pathname === "/"
                ? "nav-link active"
                : "nav-link"
            }
          >
            Home
          </Link>


          <a
            href="#about"
            className="nav-link"
          >
            About
          </a>


          <Link
            href="/login"
            className="nav-link"
          >
            Log in
          </Link>


          <Link
            href="/register"
            className="nav-button"
          >
            Get started
          </Link>

        </nav>

      </div>

    </header>
  );
}