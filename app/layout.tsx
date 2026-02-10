import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PocketNotes",
  description: "Mobile-first notes app with tagging and search"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
