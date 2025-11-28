// /store/slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "@/lib/api";

// Async thunks
export const fetchMe = createAsyncThunk("auth/fetchMe", async (_, { rejectWithValue }) => {
  try {
    const res = await API.get("/auth/profile");
    // expect res.data.user
    return res.data.user ?? null;
  } catch (err) {
    return rejectWithValue(null);
  }
});

export const login = createAsyncThunk("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    const res = await API.post("/auth/login", { email, password });
    return res.data.user;
  } catch (err) {
    return rejectWithValue(err?.response?.data || { message: "Login failed" });
  }
});

export const signup = createAsyncThunk("auth/signup", async ({ name, email, password }, { rejectWithValue }) => {
  try {
    const res = await API.post("/auth/signup", { name, email, password });
    return res.data.user;
  } catch (err) {
    return rejectWithValue(err?.response?.data || { message: "Signup failed" });
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await API.post("/auth/logout");
    return null;
  } catch (err) {
    return rejectWithValue(err?.response?.data || { message: "Logout failed" });
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    status: "idle", // idle | loading | succeeded | failed
    error: null,
    initialized: false, // becomes true after fetchMe runs (to avoid flicker)
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchMe
      .addCase(fetchMe.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchMe.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
        state.initialized = true;
      })
      .addCase(fetchMe.rejected, (state) => {
        state.status = "failed";
        state.user = null;
        state.initialized = true;
      })
      // login
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // signup
      .addCase(signup.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      // logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.status = "idle";
      });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
