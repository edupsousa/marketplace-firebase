import { useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "../firebase/auth";

export default function LogoutPage() {
  const navigate = useNavigate();
  const { logout } = useAuthContext();
  useEffect(() => {
    logout().then(() => {
      navigate("/", { replace: true });
    });
  }, [logout]);
  return <></>;
}
