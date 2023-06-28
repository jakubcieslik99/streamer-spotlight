import IStreamer from '../IStreamer';

export interface IVoteParams {
  streamerId: string;
}

export interface IVoteReq {
  vote: 'vote' | 'unvote';
}

export interface IVoteRes {
  vote: 'vote' | 'unvote';
  streamer: IStreamer;
}
