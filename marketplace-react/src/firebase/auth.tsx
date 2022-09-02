import {
  getAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
  signInWithRedirect,
  User,
  onAuthStateChanged,
  signOut,
  browserSessionPersistence,
} from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import app from "./app";
import { setOnline } from "./database";

const auth = getAuth(app);
auth.useDeviceLanguage();
auth.setPersistence(browserSessionPersistence);
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
}
const authProvider = new GoogleAuthProvider();

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

const useAuthContext = () => useContext(AuthContext)!;
const useAuthUser = () => {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  if (!user) {
    navigate("/login", { replace: true });
  }
  return user;
};

function AuthContextProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const setOffline = useRef<null | (() => Promise<void>)>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (user === null) return;
    setOnline(user.uid).then((onlineHandler) => {
      setOffline.current = onlineHandler;
    });
  }, [user]);

  const login = useCallback(() => {
    signInWithRedirect(auth, authProvider);
  }, []);

  const logout = useCallback(async () => {
    if (setOffline.current) await setOffline.current();
    signOut(auth);
  }, []);

  if (isLoading) return <p>Carregando...</p>;

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuthContext, AuthContextProvider, useAuthUser };
