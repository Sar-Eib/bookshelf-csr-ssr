import DrinkCard from './ui/drinkcard'; // Importerer det kort-design, vi gennemgik før

// DATA FETCHING: En asynkron funktion der henter drinks fra et eksternt API
async function getDrinks() {
  // Vi bruger 'fetch' til at kalde TheCocktailDB og leder efter alt med "lemon"
  const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=lemon');
  const data = await res.json();
  
  // Vi returnerer listen af drinks. Hvis der ingen er, returnerer vi et tomt array []
  return data.drinks || [];
}

// Selve siden er en 'async' funktion, fordi den skal "vente" på data
export default async function ShopPage() {
  // Her kalder vi vores funktion og venter på, at vi har alle drinks
  const drinks = await getDrinks();

  return (
    <div className="max-w-[1400px] mx-auto p-5">
      
      {/* CENTERERET LOGO SEKTION */}
      <div className="flex flex-col items-center justify-center mb-16 mt-10">
        <img 
          src="/images/lemonslogo.png" 
          alt="Lemons! Logo" 
          /* 'drop-shadow': Giver logoet en flot skygge, så det "svæver"
             'hover:scale-105': Gør logoet lidt større når man holder musen over */
          className="h-[180px] w-auto drop-shadow-[0_10px_15px_rgba(0,0,0,0.5)] transition-transform hover:scale-105"
        />
        <p className="text-white text-lg font-medium mt-4 tracking-widest uppercase opacity-80">
          Freshly Squeezed Since 2026
        </p>
      </div>

      {/* DRINK GRID: Her styrer vi hvor mange drinks der vises ved siden af hinanden 
          - 'grid-cols-1': 1 drink ad gangen på små mobiler
          - 'sm:grid-cols-2': 2 drinks på store mobiler
          - 'md:grid-cols-3': 3 drinks på tablets
          - 'lg:grid-cols-4': 4 drinks på bærbare
          - 'xl:grid-cols-5': 5 drinks på store computerskærme
      */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-4 md:px-10">
        {/* Vi løber gennem 'drinks' arrayet og sender data for hver drink ind i et DrinkCard */}
        {drinks.map((drink: any) => (
          <DrinkCard key={drink.idDrink} drink={drink} />
        ))}
      </div>
    </div>
  );
}