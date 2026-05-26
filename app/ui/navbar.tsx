import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-stone-800 text-stone-100 shadow-md font-sans">
      <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="font-serif font-bold text-lg hover:text-amber-400 transition-colors">
          📚 Bogreolen
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link href="/bookshelf-csr" className="hover:text-amber-400 transition-colors">
            💻 CSR (Klient)
          </Link>
          <Link href="/bookshelf-ssr" className="hover:text-emerald-400 transition-colors">
            🌍 SSR (Server)
          </Link>
        </div>
      </div>
    </nav>
  );
}