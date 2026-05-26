import Link from 'next/link';

// Vi definerer datastrukturen direkte på serveren
interface Book {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
}

// En asynkron funktion der simulerer hentning af data direkte på serveren (f.eks. fra en database)
async function getSSRBooks(): Promise<Book[]> {
  // Ingen useEffect eller useState nødvendig her!
  return [
    { id: 1, title: 'Harry Potter & De Vises Sten', author: 'J.K. Rowling', coverUrl: '/covers/harrypotter.jpg' },
    { id: 2, title: 'Hobbitten', author: 'J.R.R. Tolkien', coverUrl: '/covers/thehobbit.png' },
    { id: 3, title: 'Baskervillehunden', author: 'A. Conan Doyle', coverUrl: '/covers/baskerville.png' },
    { id: 4, title: 'Da Vinci Mysteriet', author: 'Dan Brown', coverUrl: '/covers/davinci.png' },
    { id: 5, title: 'Alkemisten', author: 'Paulo Coelho', coverUrl: '' },
    { id: 6, title: '1984', author: 'George Orwell', coverUrl: '' },
    { id: 7, title: 'Eventyret om Ringen', author: 'J.R.R. Tolkien', coverUrl: '/covers/lotr.png' },
    { id: 8, title: 'Den Lille Prins', author: 'A. de Saint-Exupéry', coverUrl: '/covers/prins.png' },
    { id: 9, title: 'Frankenstein', author: 'Mary Shelley', coverUrl: '/covers/frankenstein.png' },
    { id: 10, title: 'Moby Dick', author: 'Herman Melville', coverUrl: '' }
  ];
}

// Selve komponenten er asynkron (async), fordi det er en Next.js Server Component
export default async function BogreolSSR() {
  // Serveren venter på dataen her, inden den overhovedet går i gang med at rendere HTML
  const books = await getSSRBooks();

  return (
    <div className="min-h-screen p-6 md:p-12 font-sans relative overflow-hidden">
      {/* Dekorativ baggrundseffekt (som på CSR) */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-black/5 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/" className="text-sm text-emerald-900 hover:underline font-semibold bg-white/60 px-3 py-1.5 rounded-full shadow-sm transition-all hover:bg-white">
          ⬅️ Gå tilbage til forsiden
        </Link>
        
        <div className="mt-6 mb-16 text-center md:text-left">
          <span className="bg-emerald-800 text-emerald-50 text-xs font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
            Server-Side Rendering (SSR)
          </span>
          <h1 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 mt-3 mb-2">
            Min iBooks Bogreol (Server)
          </h1>
          <p className="text-stone-700 text-sm md:text-base max-w-xl">
            Denne side er præ-renderet på serveren. Prøv at opdatere siden: Alt indhold og billeder popper op med det samme uden en loading-skærm!
          </p>
        </div>
        
        {/* SELVE BOGREOLEN (Præcis samme Grid layout og dimensioner som CSR) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-24 mt-12 px-4">
          {books.map((book) => (
            <div key={book.id} className="relative group flex flex-col items-center">
              
              {/* 1. SELVE BOGEN */}
              <div className="relative z-10 transition-transform duration-300 ease-out group-hover:-translate-y-3 cursor-pointer">
                {/* Bogoverside / 3D Bogeffekt */}
                <div 
                  className="w-40 h-52 bg-white rounded-r-md shadow-xl overflow-hidden border-l-8 border-black/20 flex flex-col items-center justify-between text-center p-3 bg-cover bg-center relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent"
                  style={{ backgroundImage: `url(${book.coverUrl || '/covers/default.png'})` }}
                >
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
                {/* Oversiden af hylden */}
                <div className="h-2 bg-[#543d2b] rounded-t-sm shadow-inner border-b border-black/10"></div>
                {/* Fronten af hylden */}
                <div className="h-4 bg-[#3a281a] rounded-b-sm shadow-2xl border-t border-white/5"></div>
                {/* Skyggen under hylden */}
                <div className="h-3 w-full bg-black/25 blur-md rounded-b-md"></div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}