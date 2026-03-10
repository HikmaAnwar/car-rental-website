'use client';
import { useEffect, useState } from 'react';
import { Car } from '@/types';
import { fleetService } from '@/services/fleet-service';

export default function AdminCarsPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);

    // Form State
    const [formData, setFormData] = useState({ name: '', brand: '', price: '' });

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

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fleetService.addCar(
                formData.name,
                formData.brand,
                parseFloat(formData.price)
            );
            setShowModal(false);
            setFormData({ name: '', brand: '', price: '' });
            loadFleet(); // Refresh the list
        } catch (err) {
            alert("Error adding car. Check console.");
            console.error(err);
        }
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this car?")) {
            await fleetService.deleteCar(id);
            loadFleet(); // Refresh the list
        }
    };

    const handleUpdate = async (id: string, updates: Partial<Car>) => {
        try {
            await fleetService.updateCar(id, updates);
            loadFleet(); // Refresh the list
        } catch (err) {
            alert("Error updating car. Check console.");
            console.error(err);
        }
    };

    useEffect(() => { loadFleet(); }, []);

    return (
        <div className="min-h-screen bg-gray-50 p-8 text-black">
            <div className="max-w-6xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Vehicle Fleet</h1>
                        <p className="text-gray-500 mt-1 text-black">Manage your car inventory and pricing.</p>
                    </div>
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm"
                    >
                        + Add New Car
                    </button>
                </div>

                {/* Table Section */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {loading ? (
                        <div className="p-20 text-center text-gray-400">Loading fleet data...</div>
                    ) : (
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 text-xs font-semibold uppercase">
                                <tr>
                                    <th className="px-6 py-4">Vehicle (Brand & Model)</th>
                                    <th className="px-6 py-4 text-center">Daily Rate</th>
                                    <th className="px-6 py-4 text-center">Status</th>
                                    <th className="px-6 py-4 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {cars.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-10 text-center text-gray-500 italic">No vehicles found. Click "Add New Car" to start.</td>
                                    </tr>
                                ) : (
                                    cars.map((car) => (
                                        <tr key={car.id} className="hover:bg-gray-50 transition-colors group">
                                            <td className="px-6 py-4">
                                                <div className="font-semibold text-gray-900 group-hover:text-blue-600">{car.brand}</div>
                                                <div className="text-sm text-gray-500">{car.name}</div>
                                            </td>
                                            <td className="px-6 py-4 text-center text-green-600 font-bold">${car.pricePerDay}</td>
                                            <td className="px-6 py-4 text-center">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${car.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {car.available ? 'Available' : 'Rented'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right space-x-3">
                                                <button
                                                    onClick={() => handleUpdate(car.id, { available: !car.available })}
                                                    className="text-blue-500 hover:text-blue-700 font-medium text-sm transition-colors"
                                                >
                                                    Toggle
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(car.id)}
                                                    className="text-red-400 hover:text-red-700 font-medium text-sm transition-colors"
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
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl p-8 max-w-md w-full shadow-2xl">
                        <h2 className="text-xl font-bold mb-6 text-gray-900">Add New Vehicle</h2>
                        <form onSubmit={handleSave} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Brand</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.brand}
                                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                                    placeholder="e.g. Tesla"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Model Name</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                                    placeholder="e.g. Model X"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price Per Day ($)</label>
                                <input
                                    required
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-black"
                                    placeholder="200"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                                >
                                    Save Car
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
