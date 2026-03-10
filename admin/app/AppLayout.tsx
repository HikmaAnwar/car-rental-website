'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AppLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isLoginPage = pathname === '/login';

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="bg-gray-50 flex min-h-screen text-black">
            {/* Sidebar */}
            <aside className="w-64 bg-zinc-900 text-white flex flex-col fixed inset-y-0 shadow-xl z-10 transition-all">
                <div className="p-8 text-center">
                    <h1 className="text-2xl font-black bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">ORIENTAL</h1>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">Admin Panel</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <SidebarLink href="/" icon="📊" label="Dashboard" active={pathname === '/'} />
                    <SidebarLink href="/cars" icon="🚗" label="Vehicle Fleet" active={pathname === '/cars'} />
                </nav>

                <div className="p-6 border-t border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-xs font-bold border border-zinc-700 shadow-inner">HA</div>
                        <div className="text-xs">
                            <p className="font-bold text-white">Hikma Anwar</p>
                            <p className="text-zinc-500">Administrator</p>
                        </div>
                        <button
                            onClick={() => {
                                localStorage.removeItem('access_token');
                                localStorage.removeItem('refresh_token');
                                window.location.href = '/login';
                            }}
                            className="ml-auto p-2 opacity-50 hover:opacity-100 hover:text-red-400 transition-all"
                            title="Logout"
                        >
                            🚪
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 min-h-screen overflow-auto">
                {children}
            </main>
        </div>
    );
}

function SidebarLink({ href, icon, label, active }: { href: string; icon: string; label: string; active?: boolean }) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-4 rounded-xl transition-all group ${active
                    ? 'bg-zinc-800/50 text-white border-l-2 border-blue-400 shadow-lg'
                    : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
                }`}
        >
            <span className={`text-xl transition-transform group-hover:scale-110 ${active ? 'opacity-100' : 'opacity-50 group-hover:opacity-100'}`}>
                {icon}
            </span>
            <span className={`font-bold text-sm tracking-wide ${active ? 'text-white' : ''}`}>
                {label}
            </span>
            {active && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400"></span>}
        </Link>
    );
}
