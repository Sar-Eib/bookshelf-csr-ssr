'use client';

import { useStore } from '../lib/store';
import Link from 'next/link';

export default function InventoryPage() {
  // Vi henter data fra vores globale store
  const { totalProfit, lemonsUsed } = useStore();

  // Her simulerer vi nogle værdier, som i et rigtigt system ville komme fra en database
  const initialStock = 500; 
  const currentStock = initialStock - lemonsUsed;
  const lowStockThreshold = 50; // Grænse for hvornår vi skal advare

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Header med navigation tilbage */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-500">Administrer lager og se forretningens status</p>
          </div>
          <Link href="/" className="bg-red-900 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition">
            Tilbage til shoppen
          </Link>
        </div>

        {/* Oversigtskort (Stats) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          
          {/* Kort 1: Økonomi */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-green-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Samlet Omsætning</h3>
            <p className="text-3xl font-black text-gray-800">{totalProfit} kr.</p>
          </div>

          {/* Kort 2: Forbrug */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-yellow-400">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Citroner Brugt</h3>
            <p className="text-3xl font-black text-gray-800">{lemonsUsed} stk.</p>
          </div>

          {/* Kort 3: Aktuel Beholdning */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border-l-4 border-blue-500">
            <h3 className="text-gray-500 text-sm font-bold uppercase">Lagerstatus</h3>
            <p className={`text-3xl font-black ${currentStock < lowStockThreshold ? 'text-red-600' : 'text-gray-800'}`}>
              {currentStock} stk.
            </p>
          </div>
        </div>

        {/* Lagerstyring Sektion */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-200">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-800">Lagerbeholdning & Genbestilling</h2>
            {currentStock < lowStockThreshold && (
              <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold animate-pulse">
                LAV BEHOLDNING!
              </span>
            )}
          </div>
          
          <div className="p-6">
            <div className="mb-8">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Citron-lager (procentvis)</span>
                <span className="text-sm font-bold text-gray-700">{Math.round((currentStock / initialStock) * 100)}%</span>
              </div>
              {/* Progress bar til lageret */}
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div 
                  className={`h-4 rounded-full transition-all duration-500 ${currentStock < lowStockThreshold ? 'bg-red-500' : 'bg-yellow-400'}`}
                  style={{ width: `${(currentStock / initialStock) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Genbestillings-form (Simuleret) */}
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
              <h3 className="font-bold mb-4">Bestil nye forsyninger</h3>
              <div className="flex flex-col md:flex-row gap-4">
                <select className="flex-1 p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-yellow-400 outline-none">
                  <option>Økologiske Citroner (Parti: 100 stk.)</option>
                  <option>Standard Citroner (Parti: 200 stk.)</option>
                  <option>Premium Lemon-sirup (10 liter)</option>
                </select>
                <button 
                  onClick={() => alert('Bestilling afsendt til leverandør!')}
                  className="bg-[#6ab734] text-white font-bold px-6 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Send Bestilling
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-3">
                * Systemet beregner automatisk fragt baseret på nuværende lagerbehov.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}