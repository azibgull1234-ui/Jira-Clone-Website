export interface LoginResponse {
  success: boolean;
  token: string;
  user: {
    email: string;
  };
  message: string;
}

interface RegisteredUser {
  fullName: string;
  email: string;
  password: string;
}

const USERS_STORAGE_KEY = "registeredUsers";

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
      user: { email: matchedUser.email },
      message: "Login successful",
    };
  }

  if (email === "admin@example.com" && password === "123456") {
    return {
      success: true,
      token: "mock-jwt-token-admin",
      user: { email },
      message: "Login successful",
    };
  }

  if (email === "user@example.com" && password === "password123") {
    return {
      success: true,
      token: "mock-jwt-token-user",
      user: { email },
      message: "Login successful",
    };
  }

  throw new Error("Invalid email or password");
};
