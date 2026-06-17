import "./globals.css";
import { Inter } from "next/font/google";

import { AuthProvider } from "@/context/auth-context";
import { EstoqueProvider } from "@/context/estoque-context";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Estoque+ | Sistema de Estoque",
  description:
    "Trabalho de Front-end — sistema de estoque com Next.js, Tailwind CSS e shadcn/ui.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <EstoqueProvider>
            <Navbar />
            {children}
            <Toaster richColors position="top-right" />
          </EstoqueProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
