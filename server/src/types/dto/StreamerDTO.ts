import IStreamer from '../IStreamer.js';

export interface IStreamerParams {
  streamerId: string;
}

export interface IStreamerReq {
  name: string;
  description: string;
  platform: 'twitch' | 'youtube' | 'tiktok' | 'kick' | 'rumble';
  image: string;
}

export interface IStreamerRes {
  message: string;
  streamer: IStreamer;
}
