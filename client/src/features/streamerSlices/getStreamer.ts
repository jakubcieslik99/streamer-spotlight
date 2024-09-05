import { Slice, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosPublic from '../../api/axiosPublic';
import IStreamer from '../../types/IStreamer';

export interface GetStreamer {
  id: string;
}

const getStreamer = createAsyncThunk('streamer/getStreamer', async (sendData: GetStreamer, thunkAPI) => {
  try {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    const { id } = sendData;

    const { data } = await axiosPublic.get(`/streamer/${id}`, { signal: controller.signal });
    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export { getStreamer };

interface GetStreamerState {
  loading: boolean;
  streamer: IStreamer | null;
  error: boolean;
  errorMessage: string;
}

export const getStreamerSlice: Slice<GetStreamerState> = createSlice({
  name: 'streamer/getStreamer',
  initialState: {
    loading: false,
    streamer: null,
    error: false,
    errorMessage: '',
  } as GetStreamerState,
  reducers: {
    updateStreamerVotes: (state, action: PayloadAction<any>) => {
      if (state.streamer && state.streamer._id === action.payload.id) {
        if (action.payload.vote === 'vote') state.streamer.votes++;
        else if (action.payload.vote === 'unvote') state.streamer.votes--;
      }
    },
    errorReset: state => {
      state.error = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getStreamer.pending, (state, _action) => {
      state.loading = true;
      state.streamer = null;
      state.error = false;
    });
    builder.addCase(getStreamer.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.streamer = action.payload.streamer;
    });
    builder.addCase(getStreamer.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (action.payload) {
        state.error = true;
        state.errorMessage = action.payload;
      }
    });
  },
});

export const { updateStreamerVotes, errorReset } = getStreamerSlice.actions;
export default getStreamerSlice.reducer;
