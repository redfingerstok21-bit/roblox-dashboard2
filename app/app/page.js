'use client';

import React, { useState, useEffect } from 'react';

const getRarityBadge = (rarity) => {
  const r = (rarity || '').toUpperCase();
  if (r.includes('DIVINE')) {
    return 'bg-[#eab308]/20 border-[#eab308] text-[#fef08a] shadow-[0_0_10px_rgba(234,179,8,0.3)]';
  }
  if (r.includes('ETERNAL')) {
    return 'bg-[#a855f7]/20 border-[#a855f7] text-[#e9d5ff] shadow-[0_0_10px_rgba(168,85,247,0.3)]';
  }
  if (r.includes('SECRET')) {
    return 'bg-[#10b981]/20 border-[#10b981] text-[#a7f3d0] shadow-[0_0_10px_rgba(16,185,129,0.3)]';
  }
  if (r.includes('MYTHIC')) {
    return 'bg-[#ec4899]/20 border-[#ec4899] text-[#fbcfe8] shadow-[0_0_10px_rgba(236,72,153,0.3)]';
  }
  return 'bg-[#0284c7]/20 border-[#38bdf8] text-[#bae6fd] shadow-[0_0_10px_rgba(56,189,248,0.3)]';
};

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch('/api/update');
        const json = await res.json();
        if (json && Object.keys(json).length > 0) {
          const firstUser = Object.keys(json)[0];
          setData(json[firstUser]);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchStats();
    const timer = setInterval(fetchStats, 2000);
    return () => clearInterval(timer);
  }, []);

  const defaultPets = [
    { name: 'Kitsune', rarity: 'DIVINE', income: '3.00B/s', icon: '🦊' },
    { name: 'Dragon', rarity: 'ETERNAL', income: '2.50B/s', icon: '🐲' },
    { name: 'Phoenix', rarity: 'SECRET', income: '1.80B/s', icon: '🦅' },
    { name: 'Wolf', rarity: 'MYTHIC', income: '950.00M/s', icon: '🐺' },
    { name: 'Cat', rarity: 'RARE', income: '420.00M/s', icon: '🐱' }
  ];

  const pets = data?.pets && data.pets.length > 0 ? data.pets : defaultPets;
  const bestPet = pets[0];

  return (
    <div className="min-h-screen bg-[#030712] text-white p-4 sm:p-6 lg:p-8 font-sans relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-[-100px] left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-100px] right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-6 relative z-10">
        
        {/* HEADER */}
        <header className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-b from-cyan-400/20 to-blue-600/20 border-2 border-cyan-400/50 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(34,211,238,0.25)] shrink-0">
              🥚
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-white">DASHBOARD</h1>
                <span className="text-cyan-400 text-xl">👑</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black tracking-wider bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                STEAL AN EGG
              </h2>
              <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                <span>• Real-time data dari game</span>
                <span>• Aman</span>
                <span>• Hanya menampilkan informasi</span>
              </p>
            </div>
          </div>

          <div className="bg-[#0b1222]/90 border border-slate-800 rounded-2xl px-4 py-2.5 flex items-center gap-4 shadow-xl">
            <div className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
              R
            </div>
            <div>
              <p className="text-xs font-bold text-white">Roblox</p>
              <p className="text-[11px] text-slate-400">{data?.username ? data.username : 'Steal an Egg'}</p>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 text-[11px] px-3 py-1 rounded-full font-bold ml-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </div>
          </div>
        </header>

        {/* 4 STAT CARDS */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#070e1c] border-2 border-emerald-500/80 rounded-2xl p-4 flex items-center gap-4 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/50 flex items-center justify-center text-2xl shrink-0 shadow-[0_0_10px_rgba(16,185,129,0.3)]">💰</div>
            <div>
              <h3 className="text-[11px] font-bold text-slate-300 tracking-wider">INCOME/S</h3>
              <p className="text-[10px] text-slate-400">Uang per detik</p>
              <p className="text-2xl font-black text-emerald-400 mt-0.5">{data?.income || '8.42B/s'}</p>
            </div>
          </div>

          <div className="bg-[#070e1c] border-2 border-cyan-500/80 rounded-2xl p-4 flex items-center gap-4 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
            <div className="w-14 h-14 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center text-2xl shrink-0 shadow-[0_0_10px_rgba(6,182,212,0.3)]">🪙</div>
            <div>
              <h3 className="text-[11px] font-bold text-slate-300 tracking-wider">MONEY</h3>
              <p className="text-[10px] text-slate-400">Total uang</p>
              <p className="text-2xl font-black text-cyan-400 mt-0.5">{data?.money || '237.56B'}</p>
            </div>
          </div>

          <div className="bg-[#070e1c] border-2 border-purple-500/80 rounded-2xl p-4 flex items-center gap-4 shadow-[0_0_15px_rgba(168,85,247,0.15)]">
            <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-400/50 flex items-center justify-center text-2xl shrink-0 shadow-[0_0_10px_rgba(168,85,247,0.3)]">🏃</div>
            <div>
              <h3 className="text-[11px] font-bold text-slate-300 tracking-wider">SPEED</h3>
              <p className="text-[10px] text-slate-400">Kecepatan karakter</p>
              <p className="text-2xl font-black text-purple-400 mt-0.5">{data?.speed || '210'}</p>
            </div>
          </div>

          <div className="bg-[#070e1c] border-2 border-pink-500/80 rounded-2xl p-4 flex items-center gap-4 shadow-[0_0_15px_rgba(236,72,153,0.15)]">
            <div className="w-14 h-14 rounded-full bg-pink-500/20 border border-pink-400/50 flex items-center justify-center text-2xl shrink-0 shadow-[0_0_10px_rgba(236,72,153,0.3)]">🐾</div>
            <div>
              <h3 className="text-[11px] font-bold text-slate-300 tracking-wider">PET EQUIP</h3>
              <p className="text-[10px] text-slate-400">Pet yang sedang digunakan</p>
              <p className="text-2xl font-black text-pink-400 mt-0.5">{data?.equippedPetsCount || '25'}</p>
            </div>
          </div>
        </section>

        {/* BEST PET & DETAIL PET TABLE */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-5 bg-[#070d19] border border-blue-900/40 rounded-3xl p-5 flex flex-col justify-between space-y-4 shadow-2xl">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-yellow-400 text-lg">👑</span>
                <h3 className="font-extrabold text-white tracking-wide">BEST PET</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">Hanya 1 yang terbaik</p>

              <div className="relative bg-gradient-to-br from-[#0c1328] to-[#060a17] border-2 border-yellow-400 rounded-2xl p-4 flex items-center gap-4 shadow-[0_0_25px_rgba(234,179,8,0.2)]">
                <span className="absolute top-2 right-3 text-yellow-400/40 text-lg">👑</span>
                <div className="w-28 h-28 rounded-2xl bg-gradient-to-b from-blue-900/40 to-purple-900/40 border border-blue-500/30 flex items-center justify-center text-6xl shrink-0">
                  {bestPet.icon || '🦊'}
                </div>
                <div className="space-y-1">
                  <span className={`inline-block border text-[10px] font-black px-2.5 py-0.5 rounded-full ${getRarityBadge(bestPet.rarity)}`}>
                    ★ {bestPet.rarity}
                  </span>
                  <h4 className="text-2xl font-black text-white">{bestPet.name}</h4>
                  <p className="text-[10px] text-slate-400">Income/s</p>
                  <p className="text-xl font-black text-yellow-400 flex items-center gap-1">
                    <span>🪙</span> {bestPet.income}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-[#0b1222] border border-slate-800/80 rounded-2xl p-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-blue-400 text-sm">📊</span>
                  <span className="text-slate-300 font-medium text-[11px]">Total Income Semua Pet</span>
                </div>
                <span className="font-black text-cyan-400 text-xs">{data?.income || '12.35B/s'}</span>
              </div>
              <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 h-full rounded-full w-[80%]" />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-[#070d19] border border-blue-900/40 rounded-3xl p-5 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-blue-400 text-lg">🐾</span>
                <h3 className="font-extrabold text-white tracking-wide">DETAIL PET EQUIP</h3>
              </div>
              <p className="text-xs text-slate-400 mb-4">Daftar pet yang memberikan kontribusi income</p>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="text-slate-400 border-b border-slate-800/80">
                      <th className="pb-3 font-semibold w-10 text-center">#</th>
                      <th className="pb-3 font-semibold">Nama Pet</th>
                      <th className="pb-3 font-semibold text-center">Rarity</th>
                      <th className="pb-3 font-semibold text-right">Income/s</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/40">
                    {pets.map((pet, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/20 transition-colors">
                        <td className="py-3 text-center">
                          <span className="w-6 h-6 rounded-full border border-slate-700 bg-slate-800/50 inline-flex items-center justify-center font-bold text-slate-300 text-[11px]">
                            {idx + 1}
                          </span>
                        </td>
                        <td className="py-3 font-bold text-white">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-blue-950/60 border border-blue-800/40 flex items-center justify-center text-sm">
                              {pet.icon || '🦊'}
                            </div>
                            <span>{pet.name}</span>
                          </div>
                        </td>
                        <td className="py-3 text-center">
                          <span className={`inline-block border text-[10px] font-black px-3 py-0.5 rounded-full ${getRarityBadge(pet.rarity)}`}>
                            {pet.rarity}
                          </span>
                        </td>
                        <td className="py-3 text-right font-black text-yellow-400 text-sm">
                          {pet.income}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-800/60 gap-2">
          <div className="flex items-center gap-1.5 italic">
            <span className="text-yellow-400">★</span>
            <span>“Collect more pets, get more income!”</span>
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span className="text-blue-400">🛡️</span>
            <span>Data hanya dari game (Read Only)</span>
          </div>
        </footer>

      </div>
    </div>
  );
    }
