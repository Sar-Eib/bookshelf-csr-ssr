'use client'; // Fortæller Next.js, at dette er en Client Component

import { useStore } from '../lib/store'; // Importerer global state (Zustand)
import Link from 'next/link'; // Importerer Link-komponenten til navigation

export default function CheckoutPage() {
  // Vi trækker data og funktioner ud fra vores globale store
  const { cart, totalProfit, lemonsUsed, clearCart } = useStore();

  // --- GRUPPERINGSLOGIK ---
  // Vi fortæller TypeScript at 'acc' er et array af CartItem (eller any) med en ekstra 'quantity' property
  const groupedCart = cart.reduce((acc: any[], item: any) => {
  // Tjek om denne drink allerede er i vores "opsamler" (acc)
  const existingItem = acc.find((i) => i.idDrink === item.idDrink);

  if (existingItem) {
    // Nu ved TypeScript at 'existingItem' har en 'quantity' property
    existingItem.quantity += 1;
  } else {
    // Vi tilføjer den nye drink og giver den en 'quantity' på 1
    acc.push({ ...item, quantity: 1 });
  }
  return acc;
  }, [] as any[]); 

  return (
    <div className="min-h-screen p-8 text-gray-800">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Gul header sektion */}
        <div className="bg-yellow-400 p-6 text-center">
          <h1 className="text-3xl font-bold text-white">🍋 Kvittering 🍋</h1>
        </div>

        <div className="p-8">
          {cart.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-xl mb-6">Din kurv er tom...</p>
              <Link href="/" className="bg-yellow-400 px-6 py-2 rounded-full font-bold hover:bg-yellow-500 transition">
                Gå til shoppen
              </Link>
            </div>
          ) : (
            <>
              {/* Liste over grupperede drinks */}
              <div className="space-y-4 mb-8">
                {/* Vi mapper nu over groupedCart i stedet for cart */}
                {groupedCart.map((item, index) => (
                  <div key={index} className="flex justify-between items-center border-b pb-4">
                    <div className="flex items-center gap-4">
                      <img src={item.strDrinkThumb} alt={item.strDrink} className="w-14 h-14 rounded-lg object-cover shadow-sm" />
                      <div>
                        <h3 className="font-bold text-gray-800">{item.strDrink}</h3>
                        <p className="text-xs font-bold text-green-800">
                          {item.quantity} stk.
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      {/* Samlet pris for denne specifikke drink-linje */}
                      <span className="font-black text-lg text-gray-800">
                        {item.price * item.quantity} kr.
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Køb-knappen: Når der klikkes, nulstilles systemet til næste kunde */}
              <button 
                onClick={() => { 
                  alert('Tak for købet! Beløbet er sendt til terminalen.'); 
                  clearCart(); // Nulstiller kurven i store
                }}
                className="w-full bg-[#6ab734] text-white text-xl font-bold py-4 rounded-xl hover:bg-green-600 transition-all shadow-lg active:scale-95"
              >
                Gennemfør køb
              </button>
            </>
          )}
        </div>
      </div>
      
      {/* Navigation tilbage til POS systemet */}
      <div className="text-center mt-6">
        <Link href="/" className="text-white hover:underline opacity-80">← Tilbage til shoppen</Link>
      </div>
    </div>
  );
}