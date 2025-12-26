import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DDPO - Deep Design Philosophy Orchestra",
  description:
    "Transform your ideas into professional designs with 20 master designer philosophies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
