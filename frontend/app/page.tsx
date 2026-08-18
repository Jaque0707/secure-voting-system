import Link from "next/link";

import Navbar from "@/components/Navbar";

import "./home.css";

export default function HomePage() {

  return (
    <main className="home-page">

      <Navbar />


      {/* =====================================
          Hero
          ===================================== */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-eyebrow">
            SECURE • PRIVATE • VERIFIABLE
          </span>


          <h1>
            Secure Voting
            <br />
            for a Digital Future
          </h1>


          <p className="hero-description">
            A secure electronic voting system designed
            to protect voter identity, ballot integrity,
            and the confidentiality of every vote.
          </p>


          <div className="hero-actions">

            <Link
              href="/register"
              className="hero-button hero-button-primary"
            >
              Create an account
            </Link>


            <Link
              href="/login"
              className="hero-button hero-button-secondary"
            >
              Log in
            </Link>

          </div>

        </div>


        {/* Security visual */}

        <div className="hero-visual">

          <div className="security-orbit orbit-one" />
          <div className="security-orbit orbit-two" />


          <div className="security-core">

            <svg
              width="100"
              height="100"
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >

              <path
                d="
                  M50 10
                  L82 22
                  V47
                  C82 67
                  69 83
                  50 91
                  C31 83
                  18 67
                  18 47
                  V22
                  L50 10Z
                "
                fill="#23354D"
              />

              <path
                d="
                  M50 20
                  L72 28
                  V46
                  C72 60
                  63 71
                  50 78
                  C37 71
                  28 60
                  28 46
                  V28
                  L50 20Z
                "
                fill="#02122F"
              />

              <rect
                x="36"
                y="38"
                width="28"
                height="22"
                rx="4"
                fill="#F0ECDD"
              />

              <path
                d="M42 45H58"
                stroke="#8BA3C5"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <path
                d="M42 51H53"
                stroke="#8BA3C5"
                strokeWidth="3"
                strokeLinecap="round"
              />

              <path
                d="M54 55L58 59L65 50"
                stroke="#F0ECDD"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

            </svg>

          </div>

        </div>

      </section>


      {/* =====================================
          About / Features
          ===================================== */}

      <section
        id="about"
        className="features-section"
      >

        <div className="section-heading">

          <span>
            SECURITY BY DESIGN
          </span>

          <h2>
            Built around trust
          </h2>

          <p>
            Every component of the voting process
            is designed with security and
            verifiability in mind.
          </p>

        </div>


        <div className="features-grid">

          <article className="feature-card">

            <div className="feature-icon">
              🔐
            </div>

            <h3>
              Private Identity
            </h3>

            <p>
              Cryptographic keys allow users to
              establish their identity without
              exposing their private key.
            </p>

          </article>


          <article className="feature-card">

            <div className="feature-icon">
              ✓
            </div>

            <h3>
              Secure Ballots
            </h3>

            <p>
              Votes are protected through
              cryptographic mechanisms designed
              to preserve ballot integrity.
            </p>

          </article>


          <article className="feature-card">

            <div className="feature-icon">
              ◇
            </div>

            <h3>
              Verifiable Voting
            </h3>

            <p>
              The system is designed to provide
              mechanisms for verifying the
              integrity of the voting process.
            </p>

          </article>

        </div>

      </section>


      {/* =====================================
          Footer
          ===================================== */}

      <footer className="home-footer">

        <span>
          Secure Voting System
        </span>

        <span>
          Secure • Private • Verifiable
        </span>

      </footer>

    </main>
  );
}