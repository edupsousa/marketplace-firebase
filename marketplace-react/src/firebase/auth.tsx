import {
  getAuth,
  connectAuthEmulator,
  GoogleAuthProvider,
  signInWithRedirect,
  User,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import app from "./app";

const auth = getAuth(app);
auth.useDeviceLanguage();
if (import.meta.env.DEV) {
  connectAuthEmulator(auth, "http://localhost:9099", { disableWarnings: true });
}
const authProvider = new GoogleAuthProvider();

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const useAuthContext = () => useContext(AuthContext)!;

function AuthContextProvider({ children }: PropsWithChildren<{}>) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
  }, []);

  const login = useCallback(() => {
    signInWithRedirect(auth, authProvider);
  }, []);

  const logout = useCallback(() => {
    signOut(auth);
  }, []);

  if (isLoading) return <p>Carregando...</p>;

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { useAuthContext, AuthContextProvider };
