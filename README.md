# 📚 Personlig bogreol – React og Next.js Eksamensprojekt

Dette projekt er en interaktiv, responsiv bogreol inspireret af det klassiske Apple iBooks-design. Projektet er udviklet i **Next.js (App Router)** og **Tailwind CSS**, med det formål at demonstrere forskellen på **Client-Side Rendering (CSR)** og **Server-Side Rendering (SSR)**.

## 🛠️ Projektets Arkitektur & UI
- **Dynamisk CSS-Reol**: Hylderne er kodet i 3D "Dark Oak"-træstil ved hjælp af Tailwind CSS.
- **Responsivt Design**: Systemet er responsivt og bog-grid'et tilpasser sig automatisk ift. skærmstørrelsen.
- **Billedhåndtering**: Bogomslagene indlæses dynamisk via `bg-cover bg-center` i forhold til tilgængelig data. Der er et `default.png` for bøger uden omslag.

---

## 🔬 CSR vs. SSR (Eksamensfokus)

Applikationen er opdelt i to primære ruter for at demonstrere rendering-metoder i Next.js:

### 1. Client-Side Rendering (CSR) – `/bookshelf-csr`
- **Metode**: Henter data i browseren via et Custom Hook (`useFetchBooks`).
- **Karakteristika**: Siden viser en synlig loading-state (med simuleret netværksforsinkelse på 1,2 sekunder), mens data hentes. 

### 2. Server-Side Rendering (SSR) – `/bookshelf-ssr`
- **Metode**: Henter data direkte på serveren i en asynkron Server Component (`getSSRBooks`).
- **Karakteristika**: Siden er fuldstændig præ-renderet på serveren. Indholdet og bogreolen popper op med det samme ved besøg eller genindlæsning uden nogen loading-skærm.

---

## Opsætning lokalt

Installér projektets dependencies og starte dev serveren:

```bash
npm install
npm run dev
# eller
yarn dev
# eller
pnpm dev
```

Åbn http://localhost:3000 i browser.

Projektet kan også ses via /INDSÆT LINK TIL DEPLOYMENT

Projektstruktur
- **app/page.tsx** – Hovedmenu/forside med links til de to test-sider.

- **app/bogreol-csr/page.tsx** – Bogreolen renderet via klientsiden (CSR).

- **app/bogreol-ssr/page.tsx** – Bogreolen renderet via serveren (SSR).

- **app/hooks/useFetchBooks.ts** – Custom hook, der simulerer API-kald til CSR-siden.

- **public/covers/** – Mappen hvor bøgernes baggrundsbilleder/omslag er placeret.

🎨 Anvendte teknologier
**Framework:** Next.js (React-baseret framework)

**Styling:** Tailwind CSS (Utility-first CSS)

**Sprog:** TypeScript (Stærkt typet JavaScript)