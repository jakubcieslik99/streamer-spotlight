import IStreamer from '../IStreamer';

export interface IStreamersQuery {
  searching?: string;
  sorting?: 'newest' | 'oldest' | 'most_liked' | 'least_liked' | 'atoz' | 'ztoa';
  page?: number;
  limit?: number;
}

export interface IStreamersRes {
  count: number;
  streamers: IStreamer[];
}
