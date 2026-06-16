import { Navigate } from 'react-router-dom';
import { useWebsiteStore } from '../../store/useWebsiteStore';

export default function ProtectedRoute({ children }) {
    const isAdminLoggedIn = useWebsiteStore((state) => state.isAdminLoggedIn);

    if (!isAdminLoggedIn) {
        return <Navigate to="/console/root/admin/login" replace />;
    }

    return children;
}
