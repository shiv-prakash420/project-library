import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./useAuth";

export const Protected = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth();
  return token ? <>{children}</> : <Navigate to="/" />;
};
