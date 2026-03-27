'use client'; // Gør det muligt at bruge hooks som useState og useStore

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../lib/store'; // Henter data fra din globale "hjerne"

export default function Navbar() {
  // state til at styre om burger-menuen (mobil) er åben eller lukket
  const [isOpen, setIsOpen] = useState(false);
  
  // Vi henter 'cart' fra storen, så vi kan tælle hvor mange drinks der er tilføjet
  const cart = useStore((state) => state.cart);
  const totalItems = cart.length; // Tæller antallet af elementer i arrayet

  // Funktion der "flipper" menuen mellem åben/lukket
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    /* NAV-BAR CONTAINER:
       - 'sticky top-0': Sørger for at menuen bliver siddende i toppen, når man scroller.
       - 'z-[1000]': Sikrer at menuen ligger ovenpå alt andet indhold.
    */
    <nav className="sticky top-0 z-[1000] bg-[#67ab31] text-white px-8 h-16 flex items-center">
      <div className="flex justify-between items-center w-full max-w-[1400px] mx-auto">
        
        {/* LOGO: Linker altid tilbage til forsiden */}
        <Link href="/" className="p-1">
          <img src="/images/lemonslogo.png" alt="Logo" className="h-[60px]" />
        </Link>

        {/* BURGER KNAP (Kun synlig på mobil via 'md:hidden'):
           - Skifter ikon mellem ✕ og ☰ afhængig af 'isOpen' staten.
        */}
        <button className="md:hidden text-3xl focus:outline-none" onClick={toggleMenu}>
          {isOpen ? '✕' : '☰'}
        </button>

        {/* LINKS (Desktop & Mobil Menu):
           - Bruger en "template literal" `${}` til at skifte mellem 'flex' og 'hidden' på mobil.
           - På mobil (uden 'md:') ligger den absolut og fylder hele bredden.
           - På desktop ('md:') bliver den en del af den normale række.
        */}
        <div className={`
          ${isOpen ? 'flex' : 'hidden'} 
          md:flex flex-col md:flex-row absolute md:relative top-16 md:top-0 left-0 w-full md:w-auto 
          bg-[#333] md:bg-transparent gap-6 p-6 md:p-0 items-center transition-all duration-300
        `}>
          <Link href="/" className="hover:text-[#ffe762] transition-colors" onClick={() => setIsOpen(false)}>Shop</Link>
          <Link href="/dashboard" className="hover:text-[#ffe762] transition-colors" onClick={() => setIsOpen(false)}>Dashboard</Link>
          
          {/* KURV-IKON (Desktop): 
             - 'relative': Så vi kan placere tal-cirklen præcist ovenpå ikonet.
             - 'hidden md:block': Skjuler dette ikon på mobil (da vi har en flydende knap i stedet).
          */}
          <Link href="/checkout" className="relative group hidden md:block" onClick={() => setIsOpen(false)}>
            <img src="/images/cart-shopping-solid-full.svg" alt="Cart" className="h-[25px]" />
            {/* BADGE: Vises kun hvis der faktisk er varer i kurven (totalItems > 0) */}
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-4 bg-[#ede363] text-[#5b8f38] text-[0.7rem] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-[#bbe99d]">
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* FLOATING ACTION BUTTON (Kun mobil - 'md:hidden'):
           - En rund, grøn knap der svæver i bunden af skærmen på telefoner.
           - Gør det nemt at komme til kassen med én tommelfinger.
        */}
        <Link href="/checkout" className="md:hidden fixed bottom-6 right-6 bg-[#67ab31] w-16 h-16 rounded-full flex items-center justify-center shadow-2xl z-[2000] border-2 border-white/20">
          <img src="/images/cart-shopping-solid-full.svg" alt="Cart" className="h-[35px]" />
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-[#ede363] text-[#5b8f38] text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-[#bbe99d]">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}