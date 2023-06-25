import IStreamer from '../IStreamer';

export interface IVoteParams {
  streamerId: string;
}

export interface IVoteReq {
  vote: 'vote' | 'unvote';
}

export interface IVoteRes {
  message: string;
  streamer: IStreamer;
  vote: 'vote' | 'unvote';
}
