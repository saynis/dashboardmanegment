import { Navigate } from 'react-router-dom';

const ProtectedLoginRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    
    // Haddii token uu jiro, toos u gudbi dashboard-ka
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default ProtectedLoginRoute; 