export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: AuthUser;
  message: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
}

interface RegisteredUser {
  fullName: string;
  email: string;
  password: string;
}

const USERS_STORAGE_KEY = "registeredUsers";
const SESSION_KEY = "authSession";

const getStoredUsers = (): RegisteredUser[] => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  } catch {
    return [];
  }
};

export const registerUser = async (user: RegisteredUser): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 400));

  const users = getStoredUsers();
  const userExists = users.some(
    (existingUser) => existingUser.email.toLowerCase() === user.email.toLowerCase()
  );

  if (userExists) {
    throw new Error("User already exists");
  }

  users.push(user);
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
};

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 700));

  if (!email || !password) {
    throw new Error("Email and password are required");
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error("Invalid email address");
  }

  if (password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  const storedUsers = getStoredUsers();
  const matchedUser = storedUsers.find(
    (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
  );

  if (matchedUser) {
    return {
      success: true,
      token: `mock-jwt-token-${matchedUser.email}`,
      user: {
        id: matchedUser.email,
        email: matchedUser.email,
        fullName: matchedUser.fullName,
      },
      message: "Login successful",
    };
  }

  if (email === "admin@example.com" && password === "123456") {
    return {
      success: true,
      token: "mock-jwt-token-admin",
      user: { id: email, email, fullName: "Admin User" },
      message: "Login successful",
    };
  }

  if (email === "user@example.com" && password === "password123") {
    return {
      success: true,
      token: "mock-jwt-token-user",
      user: { id: email, email, fullName: "Demo User" },
      message: "Login successful",
    };
  }

  throw new Error("Invalid email or password");
};

export const requestPasswordReset = async (email: string): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error("Enter a valid email address");
  }
};

const parseSession = (raw: string | null): AuthSession | null => {
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as AuthSession;
    if (parsed?.token && parsed?.user?.email) {
      return parsed;
    }
    return null;
  } catch {
    return null;
  }
};

export const getStoredSession = (): AuthSession | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const session =
    parseSession(localStorage.getItem(SESSION_KEY)) ??
    parseSession(sessionStorage.getItem(SESSION_KEY));

  if (session) {
    return session;
  }

  const token = localStorage.getItem("token");
  const email = localStorage.getItem("userEmail");
  if (token && email) {
    return {
      token,
      user: { id: email, email, fullName: email.split("@")[0] },
    };
  }

  return null;
};

export const persistSession = (session: AuthSession, rememberMe: boolean) => {
  clearSession();
  const storage = rememberMe ? localStorage : sessionStorage;
  storage.setItem(SESSION_KEY, JSON.stringify(session));
  storage.setItem("token", session.token);
  storage.setItem("userEmail", session.user.email);
};

export const updateStoredUser = (user: AuthUser) => {
  const session = getStoredSession();
  if (!session) {
    return;
  }
  const rememberMe = Boolean(localStorage.getItem(SESSION_KEY));
  persistSession({ ...session, user }, rememberMe);
};

export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");
  localStorage.removeItem("userEmail");
  sessionStorage.removeItem("userEmail");
};
