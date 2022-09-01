import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../firebase/auth";

export default function LoginPage() {
  const { login, user } = useAuthContext();

  if (user !== null) return <Navigate to="/" replace={true} />;

  return (
    <div className="w-100 h-100 position-relative">
      <h1>Login</h1>
      <Button
        variant="outline-primary"
        onClick={() => login()}
        className="position-absolute top-50 start-50 translate-middle py-3 px-3"
      >
        <FcGoogle className="fs-3 bg-white bg-opacity-75 rounded-circle" /> Faça
        login utilizando sua conta do Google
      </Button>
    </div>
  );
}
