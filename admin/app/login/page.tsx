'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [step, setStep] = useState<'login' | '2fa'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('http://localhost:8088/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Login failed');
            }

            if (data.message === '2FA_REQUIRED') {
                setStep('2fa');
            } else {
                // Store tokens
                localStorage.setItem('access_token', data.access_token);
                localStorage.setItem('refresh_token', data.refresh_token);

                // Success! Redirect to dashboard
                router.push('/');
            }
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handle2FA = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('http://localhost:8088/api/login/2fa', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || 'Invalid 2FA code');
            }

            // Store tokens
            localStorage.setItem('access_token', data.access_token);
            localStorage.setItem('refresh_token', data.refresh_token);

            // Success! Redirect to dashboard
            router.push('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-zinc-900 flex items-center justify-center p-4 z-[100]">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl border border-zinc-200">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-900 text-white text-2xl mb-4 font-bold shadow-lg shadow-zinc-200">
                        OA
                    </div>
                    <h1 className="text-2xl font-black text-zinc-900">Oriental Admin</h1>
                    <p className="text-zinc-500 mt-1">
                        {step === 'login' ? 'Please sign in to continue' : 'Security Check'}
                    </p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium animate-shake">
                        ⚠️ {error}
                    </div>
                )}

                {step === 'login' ? (
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-zinc-800 mb-2">Email Address</label>
                            <input
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-4 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-zinc-100 focus:border-zinc-900 outline-none text-black transition-all"
                                placeholder="admin@oriental.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-800 mb-2">Password</label>
                            <input
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-4 border border-zinc-200 rounded-xl focus:ring-4 focus:ring-zinc-100 focus:border-zinc-900 outline-none text-black transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-zinc-900 text-white p-4 rounded-xl font-bold hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl shadow-zinc-200"
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handle2FA} className="space-y-6">
                        <div className="text-center">
                            <p className="text-sm text-zinc-600 mb-4">
                                We've sent a 6-digit verification code to <span className="font-bold text-zinc-900">{email}</span>
                            </p>
                            <input
                                required
                                type="text"
                                maxLength={6}
                                value={code}
                                onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                                className="w-full p-4 text-center text-3xl font-black tracking-[0.5em] border border-zinc-200 rounded-xl focus:ring-4 focus:ring-zinc-100 focus:border-zinc-900 outline-none text-black transition-all"
                                placeholder="000000"
                            />
                        </div>
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-zinc-900 text-white p-4 rounded-xl font-bold hover:bg-black transition-all active:scale-[0.98] disabled:opacity-50"
                        >
                            {loading ? 'Verifying...' : 'Verify & Sign In'}
                        </button>
                        <button
                            type="button"
                            onClick={() => setStep('login')}
                            className="w-full text-zinc-500 text-sm font-semibold hover:text-zinc-900 transition-colors"
                        >
                            Back to Login
                        </button>
                    </form>
                )}

                <div className="mt-8 pt-8 border-t border-zinc-100 text-center">
                    <p className="text-zinc-400 text-xs font-medium uppercase tracking-widest">
                        Hikma Anwar &copy; 2026 Admin Panel
                    </p>
                </div>
            </div>
        </div>
    );
}
