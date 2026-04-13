import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import LayoutStructure from "./LayoutStructure";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <LayoutStructure>
            {children}
          </LayoutStructure>
        </AuthProvider>
      </body>
    </html>
  );
}
