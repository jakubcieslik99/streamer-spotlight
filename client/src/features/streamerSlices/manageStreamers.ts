import { Slice, createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosPublic from '../../api/axiosPublic';
import IStreamer from '../../types/IStreamer';

export interface GetStreamers {
  searching?: string;
  sorting?: string;
  page?: number;
}

const getStreamers = createAsyncThunk('streamers/getStreamers', async (sendData: GetStreamers, thunkAPI) => {
  try {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    const { searching, sorting, page } = sendData;

    const { data } = await axiosPublic.get(`/streamers?searching=${searching}&sorting=${sorting}&page=${page}`, {
      signal: controller.signal,
    });
    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

interface PutStreamerVote {
  streamerId: string;
  vote: 'vote' | 'unvote';
}

const putStreamerVote = createAsyncThunk('streamers/putStreamerVote', async (sendData: PutStreamerVote, thunkAPI) => {
  try {
    const controller = new AbortController();
    thunkAPI.signal.addEventListener('abort', () => controller.abort());

    const { streamerId, vote } = sendData;

    const { data } = await axiosPublic.put(`/streamers/${streamerId}/vote`, { vote }, { signal: controller.signal });

    //[INFO] for the simplicity we'll store voted streamers in a global state array & local storage
    if (data?.vote && data?.streamer) {
      const votedStreamers = JSON.parse(localStorage.getItem('votedStreamers') || '[]');
      if (data.vote === 'vote') {
        if (!votedStreamers.includes(data.streamer._id)) votedStreamers.push(data.streamer._id);
      } else if (data.vote === 'unvote') {
        if (votedStreamers.includes(data.streamer._id)) votedStreamers.splice(votedStreamers.indexOf(data.streamer._id), 1);
      }
      localStorage.setItem('votedStreamers', JSON.stringify(votedStreamers));
    }

    return data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export { getStreamers, putStreamerVote };

interface GetStreamersState {
  loading: boolean;
  count: number;
  streamers: IStreamer[];
  votedStreamers: string[]; //[INFO] for the simplicity we'll store voted streamers in a global state array & local storage
  error: boolean;
  errorMessage: string;
}

export const manageStreamersSlice: Slice<GetStreamersState> = createSlice({
  name: 'streamers/manageStreamers',
  initialState: {
    loading: false,
    count: 0,
    streamers: [],
    votedStreamers: JSON.parse(localStorage.getItem('votedStreamers') || '[]'),
    error: false,
    errorMessage: '',
  } as GetStreamersState,
  reducers: {
    errorReset: state => {
      state.error = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(getStreamers.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(getStreamers.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.count = action.payload.count;
      state.streamers = action.payload.streamers;
    });
    builder.addCase(getStreamers.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (action.payload) {
        state.error = true;
        state.errorMessage = action.payload;
      }
    });

    builder.addCase(putStreamerVote.pending, state => {
      state.loading = true;
      state.error = false;
    });
    builder.addCase(putStreamerVote.fulfilled, (state, action: PayloadAction<any>) => {
      state.loading = false;
      state.votedStreamers = JSON.parse(localStorage.getItem('votedStreamers') || '[]');

      const index = state.streamers.findIndex(streamer => streamer._id === action.payload.streamer._id);
      if (index !== -1) state.streamers[index] = action.payload.streamer;
    });
    builder.addCase(putStreamerVote.rejected, (state, action: PayloadAction<any>) => {
      state.loading = false;
      if (action.payload) {
        state.error = true;
        state.errorMessage = action.payload;
      }
    });
  },
});

export const { errorReset } = manageStreamersSlice.actions;
export default manageStreamersSlice.reducer;
