export default interface IStreamer {
  _id: string;
  name: string;
  description: string;
  platform: 'twitch' | 'youtube' | 'tiktok' | 'kick' | 'rumble';
  image: string;
  votes: number;
  createdAt: number;
  updatedAt: number;
}
