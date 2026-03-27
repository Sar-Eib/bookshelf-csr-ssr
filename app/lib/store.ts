import { create } from 'zustand'; // Importerer create-funktionen fra Zustand til at lave din "store"

// INTERFACES (TypeScript): Fortæller koden præcis, hvordan en "Drink" og "Butikken" ser ud
interface CartItem {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
  price: number;
}

// Her defineres, hvilke data og funktioner vores globale "State" indeholder
interface ShopState {
  cart: CartItem[];         // Et array over drinks i kurven
  totalProfit: number;      // Den samlede fortjeneste i kr.
  lemonsUsed: number;       // Det samlede antal citroner brugt
  addToCart: (item: CartItem) => void; // Funktion til at tilføje drink
  clearCart: () => void;               // Funktion til at tømme alt
  getTotalPrice: () => number;         // Funktion til at regne prisen ud nu og her
}

// Selve "Storen", som komponenterne kan koble sig på
export const useStore = create<ShopState>((set, get) => ({
  // INITIAL STATE: Startværdierne når appen åbner
  cart: [],
  totalProfit: 0, 
  lemonsUsed: 0,  
  
  // LOGIK: Tilføj til kurv
  addToCart: (item) => set((state) => ({ 
    // Vi tager den eksisterende kurv (...state.cart) og tilføjer den nye drink til sidst
    cart: [...state.cart, item],
    
    // BEREGNING: Hver gang vi tilføjer en drink, lægges der 15 kr. til profitten og tælles 2 citroner mere
    totalProfit: state.totalProfit + 15, 
    lemonsUsed: state.lemonsUsed + 2 
  })),

  // LOGIK: Ryd alt (nulstil butikken)
  clearCart: () => set({ 
    cart: [],          // Tømmer listen
    totalProfit: 0,    // Nulstiller pengene
    lemonsUsed: 0      // Nulstiller citron-lageret
  }),

  // LOGIK: Beregn den aktuelle pris i kurven (bruger .reduce til at lægge alle 'price' sammen)
  // get() bruges her til at læse den nuværende tilstand uden at ændre den
  getTotalPrice: () => get().cart.reduce((sum, item) => sum + item.price, 0),
}));