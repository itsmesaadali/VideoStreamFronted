import { createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export const registerUser = createAsyncThunk(
    'user/register',
    async (formData, { rejectWithValue }) => { // Accept formData directly
        try {
            const response = await axios.post(`${backendUrl}/users/register`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);




export const loginUser = createAsyncThunk(
  'user/login',
  async ({ login, password }, { rejectWithValue }) => {
    try {
      // Determine if login is email or username
      const isEmail = login.includes('@');
      
      const requestData = isEmail 
        ? { email: login, password }
        : { username: login, password };

      const response = await axios.post(`${backendUrl}/users/login`, requestData);
      return response.data;
    } catch (error) {
      // Return consistent error format
      return rejectWithValue(error.response?.data?.message || 'Login failed. Please try again.');
    }
  }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async(_,{rejectWithValue}) =>{
        try {
            const response = await axios.post(`${backendUrl}/users/logout`)
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const refreshAccessToken = createAsyncThunk(
  'user/refreshToken',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${backendUrl}/users/refresh-token`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


export const getCurrentUser = createAsyncThunk(
  'user/currentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${backendUrl}/users/current-user`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



const initialState = {  
    user:null,
    accessToken:null,
    refreshToken:null,
    loading:false,
    error:null,
    isAuthenticated:false,
}


const userSlice = createSlice({
    name:'user',
    initialState,  
    reducers:{
        setCredentials:(state, action) =>{
            state.user = action.payload.user;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.isAuthenticated = true;
        },
        clearCredentials:(state) =>{
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            state.isAuthenticated = false;
            state.error = null;
        },
        clearError:(state) =>{
            state.error = null;
        }
    },
    extraReducers: (builder) =>{

    // Register User
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;  
      state.accessToken = action.payload.data.accessToken; 
      state.refreshToken = action.payload.data.refreshToken;  
      state.isAuthenticated = true;  
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Registration failed';
    });


    // Login User
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.accessToken = action.payload.data.accessToken;
      state.refreshToken = action.payload.data.refreshToken;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Login failed';
    });


    // Logout User
    builder.addCase(logoutUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.loading = false;
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Logout failed';
    });


    // Refresh Token
    builder.addCase(refreshAccessToken.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(refreshAccessToken.fulfilled, (state, action) => {
      state.loading = false;
      state.accessToken = action.payload.data.accessToken;
      state.refreshToken = action.payload.data.refreshToken;
    });
    builder.addCase(refreshAccessToken.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Token refresh failed';
      // Optionally logout user if token refresh fails
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    });


     // Get Current User
    builder.addCase(getCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCurrentUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload.data;
      state.isAuthenticated = true;
    });
    builder.addCase(getCurrentUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || 'Failed to fetch user';
      state.isAuthenticated = false;
    });


    }
})

// Export actions
export const { setCredentials, clearCredentials, clearError } = userSlice.actions;

export default userSlice.reducer;

// Selectors
export const selectCurrentUser = (state) => state.user.user;
export const selectIsAuthenticated = (state) => state.user.isAuthenticated;
export const selectAuthLoading = (state) => state.user.loading;
export const selectAuthError = (state) => state.user.error;
export const selectAccessToken = (state) => state.user.accessToken;