import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ClientProvider from "@/components/Providers/ClientProvider";
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-cyan/theme.css';


// Modern Premium Fintech Font - Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// Code/Data Monospace Font - JetBrains Mono
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});



export const metadata: Metadata = {
  title: "CAP VENTURES",
  description: "empowers investors with secure and profitable commodities, stocks, forex and more investment opportunities",
  icons: {
    icon: './favicon.ico'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <head>
          
        </head>
      <body
        className={`${plusJakartaSans.variable} ${jetbrainsMono.variable} antialiased`}
        >
        <ClientProvider>
        {children}
      </ClientProvider>
      </body>
    </html>
  );
}
