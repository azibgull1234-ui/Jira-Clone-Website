import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loginUser } from "../Services/authService";

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  userEmail: string | null;
}

const storedToken = typeof window !== "undefined" ? localStorage.getItem("token") : null;
const storedEmail = typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;

const initialState: AuthState = {
  token: storedToken,
  isAuthenticated: Boolean(storedToken),
  loading: false,
  error: null,
  userEmail: storedEmail,
};

interface LoginPayload {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginPayload, { rejectWithValue }) => {
    try {
      return await loginUser(email, password);
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Login failed";
      return rejectWithValue(message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.userEmail = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
    },
    clearError: (state) => {
      state.error = null;
    },
    setAuthFromStorage: (state, action: PayloadAction<{ token: string; userEmail: string }>) => {
      state.token = action.payload.token;
      state.userEmail = action.payload.userEmail;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.userEmail = action.payload.user.email;
        state.isAuthenticated = true;
        state.error = null;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("userEmail", action.payload.user.email);
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, setAuthFromStorage } = authSlice.actions;
export default authSlice.reducer;
