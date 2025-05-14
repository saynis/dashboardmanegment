import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    
    useEffect(() => {
        // Prevent using back button to go to login
        window.history.pushState(null, '', window.location.href);
        window.onpopstate = () => {
            window.history.pushState(null, '', window.location.href);
        };

        return () => {
            window.onpopstate = null;
        };
    }, []);

    if (!token) {
        return <Navigate to="/" replace />;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        if (payload.exp * 1000 < Date.now()) {
            localStorage.removeItem('token');
            return <Navigate to="/" replace />;
        }
    } catch (error) {
        localStorage.removeItem('token');
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute; 