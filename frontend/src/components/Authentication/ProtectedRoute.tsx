import { Box } from '@mui/system';
import { Navigate, useLocation } from 'react-router';
import { Outlet } from 'react-router-dom';
export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  requiredRole?: string;
  role?: string;
  outlet?: JSX.Element;
};

export default function ProtectedRoute({ isAuthenticated, authenticationPath, requiredRole, role, outlet }: ProtectedRouteProps) {
  if (!isAuthenticated) {
    return <Navigate to={{ pathname: authenticationPath }} />;
  } else if (requiredRole === "EDITOR" && role === "USER" || requiredRole === "ADMIN" && role !== "ADMIN") {
    return <Box style={{ textAlign: 'center' }}>Nie masz odpowiednich uprawnień do wykonania tej czynności!</Box>;
  }
  return outlet ? outlet : <Outlet />;
};