import { Slice, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosPublic from '../../api/axiosPublic';

interface PostStreamer {
  name: string;
  description: string;
  platform: string;
  image: string;
}

const postStreamer = createAsyncThunk('streamers/postStreamer', async (sendData: PostStreamer, thunkAPI) => {
  try {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    const { data } = await axiosPublic.post(`/streamers`, sendData, { signal: controller.signal });
    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export { postStreamer };

interface PostStreamerState {
  loading: boolean;
  success: boolean;
  successMessage: string;
  error: boolean;
  errorMessage: string;
}

export const postStreamerSlice: Slice<PostStreamerState> = createSlice({
  name: 'streamers/postStreamer',
  initialState: {
    loading: false,
    success: false,
    successMessage: '',
    error: false,
    errorMessage: '',
  } as PostStreamerState,
  reducers: {
    successReset: state => {
      state.success = false;
    },
    errorReset: state => {
      state.error = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(postStreamer.pending, (state, _action) => {
      state.loading = true;
      state.success = false;
      state.error = false;
    });
    builder.addCase(postStreamer.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.success = true;
      state.successMessage = action.payload.message;
    });
    builder.addCase(postStreamer.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (action.payload) {
        state.error = true;
        state.errorMessage = action.payload;
      }
    });
  },
});

export const { successReset, errorReset } = postStreamerSlice.actions;
export default postStreamerSlice.reducer;
