import React from 'react';
import { Activity } from '../types';
import { CheckCircle2, Circle, MapPin, AlertTriangle, Clock, ArrowRight } from 'lucide-react';
import { formatTimeRemaining, calculateDuration } from '../services/utils';

interface TimelineProps {
  itinerary: Activity[];
  onToggleComplete: (id: string) => void;
  onLocate: (coords: { lat: number, lng: number }, endCoords?: { lat: number, lng: number }) => void;
  userLocation: { lat: number, lng: number } | null;
}

const Timeline: React.FC<TimelineProps> = ({ itinerary, onToggleComplete, onLocate, userLocation }) => {
  
  // Helper to determine status color
  const getStatusColor = (act: Activity) => {
    if (act.completed) return 'border-emerald-500 bg-emerald-50';
    if (act.type === 'logistics' && act.notes === 'CRITICAL') return 'border-red-500 bg-red-50';
    return 'border-fjord-100 bg-white';
  };

  return (
    <div className="pb-24 px-4 pt-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold text-fjord-500 mb-6">Itinerario Lujo Matutino</h2>
      
      <div className="relative border-l-2 border-fjord-200 ml-3 space-y-8">
        {itinerary.map((act) => {
          const isCritical = act.notes === 'CRITICAL';
          const duration = calculateDuration(act.startTime, act.endTime);
          
          return (
            <div key={act.id} className="mb-8 ml-6 relative">
              {/* Timeline Dot */}
              <div 
                className={`absolute -left-[31px] top-0 rounded-full bg-white border-2 cursor-pointer transition-colors ${
                  act.completed ? 'border-emerald-500 text-emerald-500' : 'border-fjord-500 text-fjord-500'
                }`}
                onClick={() => onToggleComplete(act.id)}
              >
                {act.completed ? <CheckCircle2 size={24} /> : <Circle size={24} />}
              </div>

              {/* Card */}
              <div className={`p-4 rounded-lg border shadow-sm transition-all ${getStatusColor(act)}`}>
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-bold bg-fjord-100 text-fjord-700">
                        {act.startTime} - {act.endTime}
                        </span>
                        <span className="inline-block px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                        {duration}
                        </span>
                    </div>
                    <h3 className="font-bold text-lg text-gray-800 leading-tight">{act.title}</h3>
                  </div>
                  {isCritical && <AlertTriangle className="text-red-500 animate-pulse" size={20} />}
                </div>

                {/* Location Info */}
                <div className="mb-3 text-sm text-gray-600 flex items-center flex-wrap gap-1">
                    <span className="font-medium flex items-center">
                        <MapPin size={14} className="mr-0.5 text-fjord-500"/> 
                        {act.locationName}
                    </span>
                    {act.endLocationName && (
                        <>
                            <ArrowRight size={14} className="text-slate-400 mx-1" />
                            <span className="font-medium flex items-center">
                                <MapPin size={14} className="mr-0.5 text-mountain-500"/>
                                {act.endLocationName}
                            </span>
                        </>
                    )}
                </div>

                <p className="text-sm text-gray-600 mb-3">{act.description}</p>
                
                {/* Details Box */}
                <div className="bg-slate-50 p-3 rounded text-sm text-slate-700 italic border-l-4 border-sunset-500 mb-4">
                  "{act.keyDetails}"
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-3">
                    <button 
                      onClick={() => onLocate(act.coords, act.endCoords)}
                      className="flex items-center text-xs font-medium text-fjord-600 hover:text-fjord-800 bg-fjord-50 px-2 py-1 rounded"
                    >
                      <MapPin size={14} className="mr-1" />
                      {act.endCoords ? 'Ver Ruta' : 'Ubicación'}
                    </button>
                    {!act.completed && (
                      <span className="flex items-center text-xs text-orange-600 font-medium">
                        <Clock size={14} className="mr-1" />
                        {formatTimeRemaining(act.startTime) !== "Terminado" 
                          ? `En ${formatTimeRemaining(act.startTime)}` 
                          : "En curso / Pasado"}
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => onToggleComplete(act.id)}
                    className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider ${
                      act.completed 
                        ? 'bg-emerald-100 text-emerald-700' 
                        : 'bg-fjord-500 text-white shadow-md active:scale-95 transition-transform'
                    }`}
                  >
                    {act.completed ? 'Completado' : 'Check-in'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Timeline;