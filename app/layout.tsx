import type { Metadata } from "next";
import React from "react";
import Header from "./components/Header";

export const metadata: Metadata = { title: "URL Shortener" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
      <html lang="en">
        <body style={{ margin: "0%", backgroundColor: "#eef6ef", color: "#1f2a22", font: "calc(2px + 1vw) ui-monospace, Menlo, monospace" }}>
          <Header />
        {children}
        </body>
      </html>
  );
}
