'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Users, Fuel, Settings2, Calendar, ShieldCheck, ArrowLeft, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import client from '@/lib/apollo-client';
import { gql } from '@apollo/client';
import { Car } from '@/types';
import { useNotification } from '@/context/NotificationContext';

const GET_CAR = gql`
  query GetCar($id: ID!) {
    car(id: $id) {
      id
      name
      brand
      pricePerDay
      available
      imageUrl
    }
  }
`;


export default function CarDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { showNotification } = useNotification();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await client.query<{ car: Car }>({
          query: GET_CAR,
          variables: { id },
        });
        if (response?.data?.car) {
          setCar(response.data.car);
        }
      } catch (err) {
        console.error("Fetch car error:", err);
        showNotification('error', 'Error', 'Failed to load vehicle details');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCar();
  }, [id, showNotification]);

  const handleBooking = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setBookingLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const startDate = formData.get('startDate') as string;
    const endDate = formData.get('endDate') as string;

    try {
      const response = await fetch('http://localhost:8088/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          carId: id,
          startDate,
          endDate,
          userEmail: "test@guest.com" // Placeholder
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create booking');
      }
      
      showNotification('success', 'Booking Confirmed!', `Your reservation for the ${car?.brand} ${car?.name} is ready.`);
      router.push('/');
    } catch (err: any) {
      console.error("Booking error:", err);
      showNotification('error', 'Booking Failed', err.message || 'Something went wrong while processing your request.');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-zinc-900" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8">
        <h1 className="text-2xl font-bold mb-4">Vehicle Not Found</h1>
        <button onClick={() => router.back()} className="text-blue-600 font-bold flex items-center gap-2">
          <ArrowLeft size={20} /> Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col pt-20">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-12">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-zinc-400 hover:text-zinc-900 transition-colors font-bold text-sm mb-8 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          BACK TO EXPLORE
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Image Gallery */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-[40px] p-8 aspect-video relative overflow-hidden border border-zinc-100 shadow-xl shadow-zinc-200/50">
              <Image 
                src={car.imageUrl || "/cars/byd.png"} 
                alt={car.name} 
                fill 
                className="object-contain p-4"
                priority
              />
              {!car.available && (
                <div className="absolute top-8 right-8 bg-zinc-900 text-white px-6 py-2 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl">
                  Currently Rented
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-4">
               {[1,2,3].map(i => (
                 <div key={i} className="bg-white rounded-3xl p-4 aspect-square border border-zinc-100 opacity-40 grayscale">
                    <Image src={car.imageUrl || "/cars/byd.png"} alt="view" width={200} height={200} className="object-contain w-full h-full" />
                 </div>
               ))}
            </div>
          </motion.div>

          {/* Right: Info & Booking */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <span className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 inline-block">
                Premium Selection
              </span>
              <h1 className="text-5xl md:text-6xl font-black text-zinc-900 tracking-tighter leading-none mb-4 italic">
                {car.brand} <br />
                <span className="text-zinc-400 not-italic">{car.name}</span>
              </h1>
              
              <div className="flex flex-wrap gap-4 mt-8">
                <SpecBadge icon={<Users size={18} />} label="5 Seats" />
                <SpecBadge icon={<Fuel size={18} />} label="Petrol" />
                <SpecBadge icon={<Settings2 size={18} />} label="Automatic" />
                <SpecBadge icon={<ShieldCheck size={18} />} label="Fully Insured" />
              </div>
            </div>

            <div className="bg-white rounded-[32px] p-8 border border-zinc-100 shadow-xl shadow-zinc-200/50">
              <div className="flex items-center justify-between mb-8 pb-6 border-b border-zinc-50">
                <div>
                  <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest mb-1">Rental Cost</p>
                  <p className="text-4xl font-black text-zinc-900">${car.pricePerDay}<span className="text-base text-zinc-400 font-bold lowercase"> / day</span></p>
                </div>
                <div className="text-right">
                  <p className="text-green-500 font-black text-xs uppercase tracking-widest">Free Cancellation</p>
                  <p className="text-zinc-400 text-[10px] font-medium mt-1">Up to 24h before</p>
                </div>
              </div>

              <form onSubmit={handleBooking} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Pick-up Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                      <input required name="startDate" type="date" className="w-full bg-zinc-50 border border-zinc-100 p-4 pl-12 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-bold transition-all" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-zinc-400 uppercase tracking-widest ml-1">Return Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
                      <input required name="endDate" type="date" className="w-full bg-zinc-50 border border-zinc-100 p-4 pl-12 rounded-2xl outline-none focus:ring-4 focus:ring-blue-50 font-bold transition-all" />
                    </div>
                  </div>
                </div>

                <button 
                  disabled={!car.available || bookingLoading}
                  type="submit"
                  className="w-full py-5 bg-zinc-900 text-white rounded-[20px] font-black tracking-widest uppercase text-sm hover:bg-black transition-all shadow-xl shadow-zinc-200 active:scale-[0.98] disabled:opacity-50 disabled:grayscale"
                >
                  {bookingLoading ? 'Processing Request...' : car.available ? 'Reserve Now' : 'Vehicle Unavailable'}
                </button>
              </form>
              
              <p className="text-center text-zinc-400 text-[10px] mt-6 font-medium italic">
                No payment required now. You'll pay at the rental desk.
              </p>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function SpecBadge({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-2 bg-white border border-zinc-100 px-5 py-3 rounded-2xl shadow-sm text-zinc-500 font-bold text-xs hover:border-zinc-300 transition-colors">
      <span className="text-blue-500">{icon}</span>
      {label}
    </div>
  );
}
