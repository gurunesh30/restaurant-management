import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Animated fork & knife route-transition loader.
 * Shows a brief animation when navigating between pages.
 */
const RouteLoader = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setLoading(true);
        setVisible(true);

        // Keep the loader on screen briefly so the animation is visible
        const timer = setTimeout(() => {
            setLoading(false);
            // Allow the fade-out to finish before hiding
            setTimeout(() => setVisible(false), 400);
        }, 600);

        return () => clearTimeout(timer);
    }, [location.pathname]);

    if (!visible) return null;

    return (
        <div
            className={`route-loader-overlay ${loading ? 'active' : 'fade-out'}`}
            aria-label="Loading page"
        >
            <div className="cutlery-container">
                {/* Fork – left side */}
                <svg
                    className="cutlery fork"
                    viewBox="0 0 24 80"
                    width="28"
                    height="80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect x="4" y="0" width="2" height="30" rx="1" fill="currentColor" />
                    <rect x="8" y="0" width="2" height="30" rx="1" fill="currentColor" />
                    <rect x="12" y="0" width="2" height="30" rx="1" fill="currentColor" />
                    <rect x="16" y="0" width="2" height="30" rx="1" fill="currentColor" />
                    <path d="M4 30 Q4 38 10 38 Q16 38 16 30" fill="currentColor" />
                    <rect x="9" y="36" width="4" height="40" rx="2" fill="currentColor" />
                </svg>

                {/* Knife – right side */}
                <svg
                    className="cutlery knife"
                    viewBox="0 0 18 80"
                    width="22"
                    height="80"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6 0 C6 0 14 4 14 20 L14 36 Q14 40 10 40 L8 40 Q6 40 6 38 Z"
                        fill="currentColor"
                    />
                    <rect x="7" y="38" width="4" height="40" rx="2" fill="currentColor" />
                </svg>
            </div>
        </div>
    );
};

export default RouteLoader;
