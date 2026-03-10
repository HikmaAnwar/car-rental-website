'use client';

import { useEffect, useState } from 'react';
import { Car } from '@/types';
import { fleetService } from '@/services/fleet-service';
import { useAuth } from '@/hooks/useAuth';

export default function AdminCarsPage() {
    const { isAuthenticated } = useAuth();
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCar, setEditingCar] = useState<Car | null>(null);

    // Form State
    const [formData, setFormData] = useState({ name: '', brand: '', price: '', imageUrl: '' });

    // Logical Handlers
    const loadFleet = async () => {
        setLoading(true);
        try {
            const data = await fleetService.getCars();
            setCars(data);
        } catch (err) {
            console.error("Failed to load fleet:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (car?: Car) => {
        if (car) {
            setEditingCar(car);
            setFormData({
                name: car.name,
                brand: car.brand,
                price: car.pricePerDay.toString(),
                imageUrl: car.imageUrl || '',
            });
        } else {
            setEditingCar(null);
            setFormData({ name: '', brand: '', price: '', imageUrl: '' });
        }
        setShowModal(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editingCar) {
                await fleetService.updateCar(editingCar.id, {
                    name: formData.name,
                    brand: formData.brand,
                    pricePerDay: parseFloat(formData.price),
                    imageUrl: formData.imageUrl,
                });
            } else {
                await fleetService.addCar(
                    formData.name,
                    formData.brand,
                    parseFloat(formData.price),
                    formData.imageUrl
                );
            }
            setShowModal(false);
            setFormData({ name: '', brand: '', price: '', imageUrl: '' });
            setEditingCar(null);
            loadFleet(); // Refresh the list
        } catch (err) {
            alert("Error saving car. Check console.");
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this car?")) {
            await fleetService.deleteCar(id);
            loadFleet(); // Refresh the list
        }
    };

    const handleToggleAvailability = async (id: string, currentStatus: boolean) => {
        try {
            await fleetService.updateCar(id, { available: !currentStatus });
            loadFleet();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (isAuthenticated) loadFleet();
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
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight italic">Vehicle Fleet</h1>
                        <p className="text-gray-500 mt-1 font-medium">Manage your car inventory, pricing, and availability.</p>
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="bg-zinc-900 hover:bg-black text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 border border-zinc-800"
                    >
                        + Add New Car
                    </button>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden text-black">
                    {loading ? (
                        <div className="p-20 text-center text-zinc-400 font-medium">Loading fleet data...</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-zinc-50 border-b border-gray-200 text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                                <tr>
                                    <th className="px-8 py-5">Vehicle</th>
                                    <th className="px-6 py-5 text-center">Daily Rate</th>
                                    <th className="px-6 py-5 text-center">Status</th>
                                    <th className="px-8 py-5 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {cars.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-10 text-center text-zinc-400 italic">No vehicles found. Click "Add New Car" to start.</td>
                                    </tr>
                                ) : (
                                    cars.map((car) => (
                                        <tr key={car.id} className="hover:bg-zinc-50/50 transition-colors group">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4">
                                                    {car.imageUrl ? (
                                                        <img src={car.imageUrl} alt={car.name} className="w-14 h-14 rounded-xl object-cover bg-gray-100 ring-2 ring-transparent group-hover:ring-zinc-100 transition-all shadow-sm" />
                                                    ) : (
                                                        <div className="w-14 h-14 rounded-xl bg-zinc-100 flex items-center justify-center text-2xl shadow-inner text-zinc-300">🚗</div>
                                                    )}
                                                    <div>
                                                        <div className="font-black text-zinc-900 leading-tight">{car.brand}</div>
                                                        <div className="text-sm text-zinc-400 font-medium">{car.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-5 text-center text-blue-600 font-black text-lg">${car.pricePerDay}</td>
                                            <td className="px-6 py-5 text-center">
                                                <button
                                                    onClick={() => handleToggleAvailability(car.id, car.available)}
                                                    className={`px-4 py-1.5 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all shadow-sm active:scale-90 ${car.available
                                                            ? 'bg-blue-50 text-blue-600 border border-blue-100 hover:bg-blue-100'
                                                            : 'bg-zinc-100 text-zinc-400 border border-zinc-200 hover:bg-zinc-200'
                                                        }`}
                                                >
                                                    {car.available ? 'Available' : 'Rented'}
                                                </button>
                                            </td>
                                            <td className="px-8 py-5 text-right space-x-3">
                                                <button
                                                    onClick={() => handleOpenModal(car)}
                                                    className="bg-white border border-zinc-200 px-4 py-2 rounded-xl text-zinc-600 hover:text-black hover:border-black font-bold text-xs transition-all shadow-sm active:scale-95"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(car.id)}
                                                    className="bg-zinc-50 border border-zinc-100 px-4 py-2 rounded-xl text-zinc-400 hover:text-red-500 hover:border-red-100 font-bold text-xs transition-all active:scale-95"
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Modal Form */}
            {showModal && (
                <div className="fixed inset-0 bg-zinc-900/60 flex items-center justify-center p-4 z-[100] backdrop-blur-md">
                    <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/20 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h2 className="text-2xl font-black text-zinc-900">{editingCar ? 'Edit Vehicle' : 'Add Vehicle'}</h2>
                                <p className="text-zinc-500 text-sm mt-1 font-medium italic">Enter car technical details below</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-zinc-100 text-zinc-400 transition-colors">&times;</button>
                        </div>
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Brand</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.brand}
                                        onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                        className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-4 focus:ring-blue-50 transition-all outline-none font-bold text-zinc-900"
                                        placeholder="Tesla"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Model</label>
                                    <input
                                        required
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-4 focus:ring-blue-50 transition-all outline-none font-bold text-zinc-900"
                                        placeholder="Model S"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Daily Price ($)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">$</span>
                                    <input
                                        required
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        className="w-full p-4 pl-8 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-4 focus:ring-blue-50 transition-all outline-none font-black text-zinc-900"
                                        placeholder="150"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-2">Image Link</label>
                                <input
                                    type="url"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-xl focus:ring-4 focus:ring-blue-50 transition-all outline-none font-medium text-zinc-500 text-sm"
                                    placeholder="https://images.unsplash.com/..."
                                />
                            </div>
                            <div className="flex gap-4 pt-6">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-4 border border-zinc-200 rounded-xl text-zinc-500 hover:text-black hover:border-black font-bold transition-all text-sm"
                                >
                                    Discard
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-4 bg-zinc-900 text-white rounded-xl hover:bg-black font-black transition-all shadow-xl shadow-zinc-200 active:scale-95 text-sm"
                                >
                                    {editingCar ? 'Update Fleet' : 'Push to Fleet'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
