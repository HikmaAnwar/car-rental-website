'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fleetService } from '@/services/fleet-service';
import { useAuth } from '@/hooks/useAuth';

export default function Home() {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    rented: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated === false) return;

    const fetchStats = async () => {
      try {
        const cars = await fleetService.getCars();
        setStats({
          total: cars.length,
          available: cars.filter(c => c.available).length,
          rented: cars.filter(c => !c.available).length,
        });
      } catch (err) {
        console.error("Dashboard stats error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [isAuthenticated]);

  if (isAuthenticated === null || isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin text-4xl">🚗</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 text-black">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight italic">Admin Dashboard</h1>
          <p className="text-gray-500 mt-2">Welcome back! Here's an overview of your fleet.</p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <StatCard
            title="Total Fleet"
            value={stats.total}
            loading={loading}
            icon="🚗"
            color="bg-zinc-900"
          />
          <StatCard
            title="Available Now"
            value={stats.available}
            loading={loading}
            icon="✅"
            color="bg-blue-600"
          />
          <StatCard
            title="Currently Rented"
            value={stats.rented}
            loading={loading}
            icon="🔑"
            color="bg-zinc-400"
          />
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
          <h2 className="text-xl font-bold mb-6 text-gray-900">Quick Actions</h2>
          <div className="flex gap-4">
            <Link
              href="/cars"
              className="flex-1 group bg-zinc-900 hover:bg-black text-white p-6 rounded-xl transition-all duration-300 transform hover:-translate-y-1 shadow-md border border-zinc-800"
            >
              <div className="text-2xl mb-2">📋</div>
              <div className="font-bold text-lg">Manage Fleet</div>
              <div className="text-zinc-400 text-sm mt-1">Add, edit or remove vehicles from your inventory.</div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, loading, icon, color }: { title: string, value: number, loading: boolean, icon: string, color: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm relative overflow-hidden group">
      <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 ${color} opacity-5 rounded-full group-hover:scale-110 transition-transform`}></div>
      <div className="flex items-center gap-4 mb-4">
        <span className="text-2xl">{icon}</span>
        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest">{title}</h3>
      </div>
      {loading ? (
        <div className="h-10 w-20 bg-gray-100 animate-pulse rounded"></div>
      ) : (
        <p className="text-4xl font-black text-zinc-900">{value}</p>
      )}
    </div>
  );
}
