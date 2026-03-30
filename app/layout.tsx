import type { Metadata } from "next";
import Providers from "@/components/Providers";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://palacioeventcentre.com"),
  title: {
    default: "Palacio Event Centre",
    template: "%s",
  },
  description:
    "Luxury event venue and banquet hall in Mississauga for weddings, corporate events, and private celebrations.",
  icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
