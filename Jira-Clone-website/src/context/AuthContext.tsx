import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clearSession,
  getStoredSession,
  loginUser,
  persistSession,
  registerUser,
  updateStoredUser,
  type AuthUser,
} from "../Services/authService";

interface AuthContextValue {
  currentUser: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>;
  logout: () => void;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  updateProfile: (fullName: string, email: string) => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const readInitialUser = (): AuthUser | null => getStoredSession()?.user ?? null;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(readInitialUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const login = useCallback(
    async (email: string, password: string, rememberMe = true) => {
      setLoading(true);
      setError(null);
      try {
        const result = await loginUser(email, password);
        persistSession({ token: result.token, user: result.user }, rememberMe);
        setCurrentUser(result.user);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Login failed";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const register = useCallback(
    async (fullName: string, email: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        await registerUser({ fullName, email, password });
      } catch (err) {
        const message = err instanceof Error ? err.message : "Registration failed";
        setError(message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const logout = useCallback(() => {
    clearSession();
    setCurrentUser(null);
    setError(null);
  }, []);

  const updateProfile = useCallback((fullName: string, email: string) => {
    setCurrentUser((previous) => {
      if (!previous) {
        return previous;
      }
      const next = { ...previous, fullName, email, id: email };
      updateStoredUser(next);
      return next;
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      loading,
      error,
      login,
      logout,
      register,
      updateProfile,
      clearError,
    }),
    [clearError, currentUser, error, loading, login, logout, register, updateProfile]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
