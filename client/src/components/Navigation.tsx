import { useState, useEffect } from 'react';
import { Home, Utensils, CalendarDays, Mail, Moon, Sun, Lock } from 'lucide-react';
import { NavBar } from './ui/tubelight-navbar';

const Navigation = () => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme as 'light' | 'dark');
        document.documentElement.setAttribute('data-theme', savedTheme);
        if (savedTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    const navItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'Menu', url: '/menu', icon: Utensils },
        { name: 'Reservation', url: '/reservation', icon: CalendarDays },
        { name: 'Contact', url: '/contact', icon: Mail },
        { name: 'Admin', url: '/admin', icon: Lock }
    ];

    return (
        <>
            <NavBar items={navItems} />

            <button
                onClick={toggleTheme}
                className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-[var(--bg-light)] shadow-[0_4px_15px_rgba(0,0,0,0.1)] text-[var(--text-main)] transition-all border border-[rgba(0,0,0,0.1)] dark:border-[rgba(255,255,255,0.1)] bg-blue-gradient hover-glow"
                aria-label="Toggle Theme"
            >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
        </>
    );
};

export default Navigation;
