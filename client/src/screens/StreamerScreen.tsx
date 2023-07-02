import { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Moment from 'moment';
import { PiArrowFatLineUpBold, PiArrowFatLineUpFill } from 'react-icons/pi';
import { useAppSelector, useAppDispatch } from '../features/store';
import { updateStreamerVotes, getStreamer } from '../features/streamerSlices/getStreamer';
import { putStreamerVote } from '../features/streamerSlices/manageStreamers';
import Loading from '../components/alerts/Loading';
import Error from '../components/alerts/Error';
import twitch from '../assets/twitch.png';
import youtube from '../assets/youtube.png';
import tiktok from '../assets/tiktok.png';
import kick from '../assets/kick.png';
import rumble from '../assets/rumble.png';

export const platforms = {
  twitch: 'Twitch',
  youtube: 'YouTube',
  tiktok: 'TikTok',
  kick: 'Kick',
  rumble: 'Rumble',
};

const StreamerScreen = () => {
  const putStreamerVoteAbort = useRef<(reason?: string | undefined) => void>();

  const { loading, streamer, error, errorMessage } = useAppSelector(state => state.getStreamer);
  const { votedStreamers } = useAppSelector(state => state.manageStreamers);
  const dispatch = useAppDispatch();

  const params = useParams() as { streamerId: string };

  const votingHandler = () => {
    if (!streamer) return;

    const putStreamerVotePromise = dispatch(
      putStreamerVote({
        streamerId: streamer._id,
        vote: votedStreamers.includes(streamer._id) ? 'unvote' : 'vote',
      })
    );
    putStreamerVoteAbort.current = putStreamerVotePromise.abort;

    putStreamerVotePromise
      .unwrap()
      .then(payload => dispatch(updateStreamerVotes({ id: params.streamerId, vote: payload.vote })))
      .catch(error => error);
  };

  useEffect(() => {
    return () => putStreamerVoteAbort.current && putStreamerVoteAbort.current();
  }, [putStreamerVoteAbort]);

  useEffect(() => {
    const getStreamerPromise = dispatch(getStreamer({ id: params.streamerId }));
    return () => getStreamerPromise.abort();
  }, [params.streamerId, dispatch]);

  return (
    <main className="md:px-6">
      <div className="flex items-center w-full text-3xl font-semibold">
        <h1>Streamer</h1>
        <h2 className={`${loading ? 'mx-2' : 'mx-0'}`}>{loading ? 'loading...' : ':'}</h2>
        <Loading open={loading} styling="mt-[3px]" />
      </div>

      <Error open={error && errorMessage !== '' ? true : false} message={errorMessage} styling="w-full mt-2 mb-[10px]" />

      {!loading && streamer && (
        <div className="flex flex-col w-full gap-4">
          <h3 className="font-light text-gray-400 mt-[1px]">#{streamer._id}</h3>

          <div className="flex flex-col gap-3 md:gap-6 md:items-end md:flex-row">
            <div className="overflow-hidden rounded-xl max-w-[300px] aspect-square flex-none">
              <img src={streamer.image} alt={streamer._id} width={300} />
            </div>

            <div className="flex flex-col gap-3 truncate">
              <div className="flex flex-col">
                <label className="text-gray-400 -mb-[4px]">Name</label>
                <div className="text-2xl font-medium truncate">{streamer.name}</div>
              </div>

              <div className="flex flex-col">
                <label className="text-gray-400 -mb-[4px]">Platform</label>

                <div className="flex items-center gap-[6px]">
                  {streamer.platform === 'twitch' && <img className="w-[25px] h-[25px]" src={twitch} alt="Twitch" />}
                  {streamer.platform === 'youtube' && <img className="w-[25px] h-[25px]" src={youtube} alt="YouTube" />}
                  {streamer.platform === 'tiktok' && <img className="w-[25px] h-[25px]" src={tiktok} alt="TikTok" />}
                  {streamer.platform === 'kick' && <img className="w-[25px] h-[25px]" src={kick} alt="Kick" />}
                  {streamer.platform === 'rumble' && <img className="w-[25px] h-[25px]" src={rumble} alt="Rumble" />}

                  <div className="text-2xl font-medium">{platforms[streamer.platform as keyof typeof platforms]}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-3 md:gap-6 md:flex-row">
            <div className="md:hidden text-gray-400/70">{Moment(streamer.createdAt).format('YYYY/MM/DD, HH:mm')}</div>

            <div className="flex flex-col w-[300px] flex-none gap-[10px]">
              <div className="hidden text-gray-400/70 md:block">
                {Moment(streamer.createdAt).format('YYYY/MM/DD, HH:mm')}
              </div>

              <div className="flex flex-col">
                <label className="text-gray-400 mb-[2px]">Votes</label>
                <div className="flex items-center gap-2 text-3xl">
                  <div>{streamer.votes}</div>
                  <button className="mt-[1px] text-4xl transition active:scale-90" onClick={votingHandler}>
                    {votedStreamers.includes(streamer._id) ? (
                      <PiArrowFatLineUpFill className="text-orange-600" />
                    ) : (
                      <PiArrowFatLineUpBold className="text-orange-400" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col">
              <label className="text-gray-400 -mb-[2px]">Description</label>
              <div className="text-lg font-medium">{streamer.description}</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default StreamerScreen;
