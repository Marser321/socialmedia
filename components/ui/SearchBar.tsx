"use client";

import * as React from 'react';
import { MOCK_SERVICES } from '@/data/services';

export function SearchBar() {
  const [query, setQuery] = React.useState('');

  const results = React.useMemo(() => {
    if (!query.trim()) return [] as typeof MOCK_SERVICES;
    const q = query.toLowerCase();
    return MOCK_SERVICES.filter((s) => s.nombre.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="relative hidden md:block w-64">
      <input
        aria-label="Buscar servicios"
        placeholder="Buscar servicios..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full pl-3 pr-8 py-2 rounded-full bg-white/10 text-white placeholder:text-white/70 border border-white/20 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {query && results.length > 0 && (
        <div className="absolute left-0 right-0 mt-1 bg-background/90 border border-white/10 rounded-md shadow-lg z-20 max-h-40 overflow-auto">
          {results.map((r) => (
            <div key={r.id} className="px-3 py-2 text-sm text-white hover:bg-white/10 cursor-pointer" onClick={() => setQuery(r.nombre)}>
              {r.nombre}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
