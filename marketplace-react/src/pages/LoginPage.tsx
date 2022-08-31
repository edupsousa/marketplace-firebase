import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { useAuthContext } from "../firebase/auth";

export default function LoginPage() {
  const { login } = useAuthContext();
  return (
    <div>
      <h1>Login</h1>
      <Button variant="outline-primary" onClick={() => login()}>
        <FcGoogle className="fs-3 bg-white bg-opacity-75 rounded-circle" /> Faça
        login utilizando sua conta do Google
      </Button>
    </div>
  );
}
