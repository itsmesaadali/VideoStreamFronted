import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {axiosInstance } from '../../utils/axiosConfig'

// Async thunk for getting user channel profile
export const fetchUserChannelProfile = createAsyncThunk(
  'userProfile/fetchChannelProfile',
  async (username, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/users/c/${username}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Async thunk for getting watch history
export const fetchWatchHistory = createAsyncThunk(
  'userProfile/fetchWatchHistory',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get('/users/history');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    channelProfile: null,
    watchHistory: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearChannelProfile: (state) => {
      state.channelProfile = null;
    },
    clearWatchHistory: (state) => {
      state.watchHistory = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Channel Profile
      .addCase(fetchUserChannelProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserChannelProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.channelProfile = action.payload.data;
      })
      .addCase(fetchUserChannelProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch channel profile';
      })
      // Watch History
      .addCase(fetchWatchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWatchHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.watchHistory = action.payload.data;
      })
      .addCase(fetchWatchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch watch history';
      });
  },
});

export const { clearChannelProfile, clearWatchHistory } = userProfileSlice.actions;
export default userProfileSlice.reducer;