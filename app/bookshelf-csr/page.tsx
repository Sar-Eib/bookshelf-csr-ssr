"use client"; // Tvinger Next.js til at køre denne rute som Client-Side Rendering

import { useFetchBooks } from '../hooks/useFetchBooks';
import Link from 'next/link';

export default function BogreolCSR() {
  // Vi trækker vores data og loading-state ud af vores Custom Hook
  const { books, loading } = useFetchBooks();

  // 1. Loading-tilstand (Viser, at klienten arbejder)
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center font-sans">
        <div className="text-center space-y-3 animate-pulse">
          <span className="text-4xl inline-block animate-spin">📖</span>
          <h2 className="text-xl font-medium text-stone-700">Sætter hylderne op... ✨</h2>
          <p className="text-sm text-stone-400 font-mono">Henter data via useFetchBooks()</p>
        </div>
      </div>
    );
  }

  // 2. Præsentationslag (Når data er klar - iBooks Style)
  return (
    <div className="min-h-screen bg-[#f3e1ce] p-6 md:p-12 font-sans relative overflow-hidden">
      {/* Dekorativ baggrundseffekt for at gøre det mere hyggeligt (som en væg bag reolen) */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/5 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/" className="text-sm text-amber-900 hover:underline font-semibold bg-white/60 px-3 py-1.5 rounded-full shadow-sm transition-all hover:bg-white">
          ⬅️ Gå tilbage til forsiden
        </Link>
        
        <div className="mt-6 mb-16 text-center md:text-left">
          <span className="bg-amber-800 text-amber-50 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Client-Side Rendering (CSR)
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mt-3 mb-2">
            Min iBooks Bogreol
          </h1>
          <p className="text-stone-700 text-sm md:text-base max-w-xl">
            Her kodes hylderne dynamisk i CSS. Hver række bøger tilpasser sig automatisk skærmen, og planken følger med!
          </p>
        </div>
        
        {/* SELVE BOGREOLEN (Grid layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-24 mt-12 px-4">
          {books.map((book) => (
            <div key={book.id} className="relative group flex flex-col items-center">
              
              {/* 1. SELVE BOGEN */}
              <div className="relative z-10 transition-transform duration-300 ease-out group-hover:-translate-y-3 cursor-pointer">
                {/* Bogoverside / 3D Bogeffekt */}
                <div className="w-40 h-52 bg-white rounded-r-md shadow-xl overflow-hidden border-l-8 border-black/20 flex flex-col items-center justify-between text-center p-3 bg-cover bg-center relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent"
                style={{ backgroundImage: `url(${book.coverUrl || '/covers/default.png'})` }}>
                  
                  {/* Titelbånd i bunden af bogen */}
                  <div className="w-full bg-stone-100/90 rounded mt-auto p-1 border border-stone-200">
                    <p className="text-[10px] md:text-xs font-serif font-bold text-stone-800 line-clamp-2 leading-tight">
                      {book.title}
                    </p>
                    <p className="mt-2 text-stone-800 text-[11px] md:text-xs font-serif italic tracking-wide text-center">
                    {book.author}
                    </p>
                  </div>
                </div>
                
                {/* Bogens skygge nede på selve hylden */}
                <div className="absolute -bottom-2 left-2 right-2 h-3 bg-black/30 blur-sm rounded-full -z-10 transition-opacity group-hover:opacity-60"></div>
              </div>

              {/* 2. HYLDEN (Kodet i 3D Dark Oak-stil) */}
              <div className="absolute bottom-[-16px] left-[-16px] right-[-16px] h-6 z-0 pointer-events-none">
                {/* Oversiden af hylden (Hvor bogen rører træet) */}
                <div className="h-2 bg-[#543d2b] rounded-t-sm shadow-inner border-b border-black/10"></div>
                {/* Fronten af hylden (Tykkelsen på planken) */}
                <div className="h-4 bg-[#3a281a] rounded-b-sm shadow-2xl border-t border-white/5"></div>
                {/* Skyggen som planken kaster ned på væggen under sig */}
                <div className="h-3 w-full bg-black/25 blur-md rounded-b-md"></div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}