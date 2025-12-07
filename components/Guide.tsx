import React, { useState } from 'react';
import { PRONUNCIATIONS } from '../constants';
import { Volume2, Thermometer, AlertCircle, ShoppingBag } from 'lucide-react';

const Guide: React.FC = () => {
  const [playing, setPlaying] = useState<string | null>(null);

  const playSimulatedAudio = (word: string) => {
    // In a real app, this would play an mp3.
    // For now, we simulate "speaking" state
    setPlaying(word);
    setTimeout(() => setPlaying(null), 1000);
  };

  return (
    <div className="pb-24 px-4 pt-6 max-w-lg mx-auto h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-fjord-500 mb-6">Guía y Consejos</h2>

      {/* Tips Grid */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-100">
          <div className="flex items-center mb-2 text-orange-700 font-bold">
             <AlertCircle size={18} className="mr-2"/> Reserva Online
          </div>
          <p className="text-sm text-orange-800">
            Reserva tickets (tren, barco) online con antelación. No esperes a las 07:00 AM.
          </p>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
          <div className="flex items-center mb-2 text-blue-700 font-bold">
             <Thermometer size={18} className="mr-2"/> El Clima (Mayo)
          </div>
          <p className="text-sm text-blue-800">
            La mañana (07:00) puede ser helada. Vístete con capas para quitarte ropa tras el almuerzo.
          </p>
        </div>

        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
          <div className="flex items-center mb-2 text-purple-700 font-bold">
             <ShoppingBag size={18} className="mr-2"/> Compras
          </div>
          <p className="text-sm text-purple-800">
            Las tiendas de souvenirs están junto al muelle. Ideal para los últimos 30 min.
          </p>
        </div>
      </div>

      {/* Pronunciation Table */}
      <h3 className="text-lg font-bold text-gray-800 mb-4">Pronunciación Exprés</h3>
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {PRONUNCIATIONS.map((item, idx) => (
          <div key={item.word} className={`p-4 flex justify-between items-center ${idx !== PRONUNCIATIONS.length - 1 ? 'border-b border-gray-100' : ''}`}>
            <div>
              <div className="flex items-baseline space-x-2">
                <span className="font-bold text-lg text-fjord-600">{item.word}</span>
                <span className="text-xs text-gray-400 font-mono">{item.phonetic}</span>
              </div>
              <div className="text-sm font-medium text-gray-700 mt-1">
                "{item.simplified}"
              </div>
              <p className="text-xs text-gray-500 mt-0.5 italic">{item.meaning}</p>
            </div>
            <button 
              onClick={() => playSimulatedAudio(item.word)}
              className={`p-3 rounded-full transition-colors ${playing === item.word ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}
            >
              <Volume2 size={20} className={playing === item.word ? 'animate-pulse' : ''} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guide;
