import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

export const metadata: Metadata = {
  title: "Чат-бот Администрации Ленинского района",
  description: "Чат-бот для ответов на вопросы жителей Ленинского района",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={inter.className}>
        <div className="main-container">
          <header className="header">
            <h1>Администрация Ленинского района</h1>
            <p>Официальный информационный портал</p>
          </header>
          <main className="content">
            {children}
          </main>
          <footer className="footer">
            <p>© 2024 Администрация Ленинского района. Все права защищены.</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
