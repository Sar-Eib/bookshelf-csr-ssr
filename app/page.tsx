import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center px-4 py-12 font-sans">
      <header className="text-center max-w-2xl mb-12">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-800 mb-4">
          📖 Den Hyggelige Bogreol
        </h1>
        <p className="text-stone-600 text-lg">
          Eksamensprototype: En praktisk sammenligning af Client-Side Rendering (CSR) med Custom Hooks vs. Server-Side Rendering (SSR).
        </p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-8 max-w-4xl w-full justify-center">
        
        {/* CSR Kort */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-200 flex-1 flex flex-col justify-between transition-transform hover:scale-[1.01]">
          <div>
            <span className="text-4xl">💻</span>
            <h2 className="text-2xl font-serif font-semibold text-amber-900 mt-4 mb-3">Klientside (CSR)</h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-6">
              Data hentes i browseren via vores eget <strong className="text-amber-800">Custom Hook</strong> efter siden er loadet. Brugeren oplever en kort loading-tilstand.
            </p>
          </div>
          <Link href="/bookshelf-csr" className="w-full text-center py-3 bg-amber-800 hover:bg-amber-900 text-white font-medium rounded-xl transition-colors">
            Åbn CSR Reol ➡️
          </Link>
        </div>
        
        {/* SSR Kort */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-emerald-100 flex-1 flex flex-col justify-between transition-transform hover:scale-[1.01]">
          <div>
            <span className="text-4xl">🌍</span>
            <h2 className="text-2xl font-serif font-semibold text-emerald-950 mt-4 mb-3">Serverside (SSR)</h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-6">
              Next.js laver HTML'en 100% færdig på serveren inden afsendelse. Siden popper op med det samme, hvilket giver maksimal ydeevne og optimal <strong className="text-emerald-800">SEO</strong>.
            </p>
          </div>
          <Link href="/bookshelf-ssr" className="w-full text-center py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-medium rounded-xl transition-colors">
            Åbn SSR Reol ➡️
          </Link>
        </div>

      </div>
    </div>
)};