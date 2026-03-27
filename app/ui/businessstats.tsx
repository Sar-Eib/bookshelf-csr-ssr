'use client'; // Markeret som Client Component, da den lytter på vores "live" store

import { useStore } from '../lib/store'; // Forbinder komponenten til vores "hjerne" (Zustand)

export default function BusinessStats() {
  // Vi trækker kun de nødvendige tal ud fra storen: profit, citroner og selve kurven
  const { totalProfit, lemonsUsed, cart } = useStore();

  // LOGIK: "Early Return"
  // Hvis der ikke er lagt noget i kurven endnu (cart.length er 0), 
  // så returnerer vi 'null'. Det betyder, at hele komponenten slet ikke bliver tegnet på skærmen.
  if (cart.length === 0) return null;

  return (
    /* CONTAINER (Fixed positionering):
       - 'fixed': Den bliver stående på skærmen, selvom man scroller.
       - 'bottom-6 left-6': Placering på mobil (så den ikke dækker over menuer).
       - 'md:bottom-8 md:left-8': Flytter den længere ned i hjørnet på større skærme (PC).
       - 'z-[1500]': Sørger for, at den altid ligger "øverst" ovenpå andre elementer.
    */
    <div className="fixed bottom-6 left-6 z-[1500] md:bottom-8 md:left-8">
      
      {/* STYLING AF "BOBBLEN":
         - 'bg-white/90 backdrop-blur-sm': Gør baggrunden hvid, men lidt gennemsigtig med sløringseffekt.
         - 'animate-in fade-in slide-in-from-bottom-4': En lille Tailwind animation, der får boksen til at "glide op", når den dukker op.
      */}
      <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-2xl border-2 border-yellow-400 flex flex-col gap-2 min-w-[160px] animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {/* Overskrift til den lille boks */}
        <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400 border-b pb-1">
          🍋 Shop status 🍋
        </h4>
        
        {/* Række 1: Viser antal citroner fra vores store */}
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-gray-600">Citroner:</span>
          <span className="text-sm font-black text-yellow-600">{lemonsUsed}</span>
        </div>

        {/* Række 2: Viser den beregnede profit fra vores store */}
        <div className="flex justify-between items-center">
          <span className="text-xs font-bold text-gray-600">Profit:</span>
          <span className="text-sm font-black text-[#6ab734]">{totalProfit} kr.</span>
        </div>
      </div>
    </div>
  );
}