import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router';
import { Route } from "react-router-dom";
import { Outlet } from 'react-router-dom';
export type ProtectedRouteProps = {
  isAuthenticated: boolean;
  authenticationPath: string;
  outlet?: JSX.Element;
};

export default function ProtectedRoute({isAuthenticated, authenticationPath, outlet}: ProtectedRouteProps) {
  if(isAuthenticated) {
    return outlet ? outlet : <Outlet/>;
  } else {
    return <Navigate to={{ pathname: authenticationPath }} />;
  }
};