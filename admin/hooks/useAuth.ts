'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export function useAuth() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (!token) {
            setIsAuthenticated(false);
            router.push('/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    return { isAuthenticated };
}
