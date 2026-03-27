'use client'; // Fortæller Next.js, at denne komponent er interaktiv

import { useStore } from '../lib/store'; // Giver adgang til vores globale "hjerne"

// { drink }: { drink: any } betyder, at komponenten modtager data om én specifik drink som et "prop"
export default function DrinkCard({ drink }: { drink: any }) {
  
  // Vi udvælger kun 'addToCart' funktionen fra vores store.
  // Dette er en mere effektiv måde at hente data på i Zustand (selector-pattern).
  const addToCart = useStore((state) => state.addToCart);

  return (
    /* KORTETS CONTAINER:
       - 'bg-[#fff6d4]': En let gul baggrundsfarve.
       - 'hover:scale-[1.02]': En lækker effekt, hvor kortet bliver en lille smule større, når musen er over det.
       - 'transition-transform': Sørger for at forstørrelsen (scale) sker glidende.
    */
    <div className="bg-[#fff6d4] rounded-xl overflow-hidden shadow-lg flex flex-col transition-transform hover:scale-[1.02]">
      
      {/* DRINKens BILLEDE:
         - 'aspect-square': Sørger for at billedet altid er kvadratisk.
         - 'object-cover': Gør at billedet fylder hele rammen uden at blive mast.
      */}
      <img 
        src={drink.strDrinkThumb} 
        alt={drink.strDrink} 
        className="w-full h-[150px] aspect-square object-cover border-b border-gray-200"
      />
      
      {/* INDHOLD (Tekst og Knap): */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* NAVN: 'min-h-[2.5rem]' sikrer, at alle kasser har samme højde, selvom nogle navne fylder to linjer */}
        <h3 className="text-gray-800 font-bold text-lg mb-3 min-h-[2.5rem]">
          {drink.strDrink}
        </h3>
        
        {/* TILFØJ KNAP:
           - onClick: Når man klikker, kalder vi addToCart med de præcise data for denne drink.
           - 'active:scale-95': Så knappen "trykkes ned", når man klikker.
           - 'mt-auto': Skubber knappen helt ned i bunden af kortet, så alle knapper flugter.
        */}
        <button 
          onClick={() => addToCart({
            idDrink: drink.idDrink,
            strDrink: drink.strDrink,
            strDrinkThumb: drink.strDrinkThumb,
            price: 25 // Her fastsætter vi salgsprisen manuelt for alle
          })}
          className="bg-[#6ab734] hover:bg-[#3f701c] active:scale-95 text-white font-bold py-2 px-4 rounded-md mt-auto transition-all"
        >
          Tilføj til kurv
        </button>
      </div>
    </div>
  );
}