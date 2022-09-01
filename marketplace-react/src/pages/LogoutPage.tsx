import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../firebase/auth";

export default function LogoutPage() {
  const { logout } = useAuthContext();
  useEffect(() => {
    logout();
  }, [logout]);
  return <Navigate to="/" replace={true} />;
}
