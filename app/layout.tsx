import Navbar from './ui/navbar';
// @ts-ignore
import './globals.css'; 

export const metadata = {
  title: 'Den Hyggelige Bogreol',
  description: 'Eksamensprototype i Next.js med CSR og SSR',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="da">
      <body className="bg-[#f3e1ce] text-stone-900 m-0 p-0 antialiased">
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}