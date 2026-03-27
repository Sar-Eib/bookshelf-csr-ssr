import type { Metadata } from "next"; // Type-sikring til SEO-data
import "./globals.css"; // Importerer dine globale CSS-regler (Tailwind osv.)
import Navbar from "./ui/navbar"; // Henter din navigationsbar
import BusinessStats from "./ui/businessstats"; // Henter din svævende statistik-boks

// METADATA: Dette er vigtigt for Google (SEO) og hvad der står på fanen i din browser
export const metadata: Metadata = {
  title: "Lemonade Stand",
  description: "En moderne lemonadebod bygget med Next.js",
};

// ROOT LAYOUT: Den overordnede "skal" for hele hjemmesiden
export default function RootLayout({
  children, // 'children' er den specifikke side, man er inde på (f.eks. ShopPage eller CheckoutPage)
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="da">
      {/* 'antialiased' gør skrifttyperne pænere og skarpere at se på */}
      <body className="antialiased">
        
        {/* NAVBAR: Ligger øverst i body, så den altid er til stede */}
        <Navbar />
        
        {/* BUSINESS STATS: Ligger herude i layoutet, så den kan "overvåge" 
            hvad der sker, uanset hvilken underside brugeren er på. */}
        <BusinessStats />

        {/* MAIN: Her bliver selve indholdet fra de andre filer sat ind.
            Når man skifter fra 'Shop' til 'Checkout', er det kun det, der er 
            inde i <main>, der skifter. Navbar og Stats bliver stående. */}
        <main>{children}</main>

      </body>
    </html>
  );
}