import type { Metadata } from "next";

import "./globals.css";


export const metadata: Metadata = {
  title: "Secure Voting System",
  description:
    "Secure electronic voting system",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">

      <body>
        {children}
      </body>

    </html>
  );
}