import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { AnyAction } from '@reduxjs/toolkit'
import Moment from 'moment'
import { PiArrowFatLineUpBold, PiArrowFatLineUpFill } from 'react-icons/pi'
import { useAppSelector, useAppDispatch } from '../../features/store'
import { putStreamerVote } from '../../features/streamerSlices/manageStreamers'
import { platforms } from '../../screens/StreamerScreen'
import twitch from '../../assets/twitch.png'
import youtube from '../../assets/youtube.png'
import tiktok from '../../assets/tiktok.png'
import kick from '../../assets/kick.png'
import rumble from '../../assets/rumble.png'

interface Props {
  streamer: {
    _id: string
    name: string
    description: string
    platform: string
    image: string
    votes: number
    createdAt: number
    updatedAt: number
  }
}

const Streamer = (props: Props) => {
  const putStreamerVoteAbort = useRef<(reason?: string | undefined) => void>()

  const { votedStreamers } = useAppSelector(state => state.manageStreamers)
  const dispatch = useAppDispatch()

  const votingHandler = () => {
    const putStreamerVotePromise = dispatch(
      putStreamerVote({
        streamerId: props.streamer._id,
        vote: votedStreamers.includes(props.streamer._id) ? 'unvote' : 'vote',
      }) as unknown as AnyAction,
    )
    putStreamerVoteAbort.current = putStreamerVotePromise.abort
  }

  useEffect(() => {
    return () => putStreamerVoteAbort.current && putStreamerVoteAbort.current()
  }, [putStreamerVoteAbort])

  return (
    <div className="flex flex-col justify-between w-full gap-4 px-5 py-4 md:gap-0 md:flex-row bg-gray-700/70 rounded-xl">
      <div className="flex items-center w-full gap-4 md:gap-5">
        <div className="aspect-square w-[100px] h-[100px] overflow-hidden rounded-xl flex-none">
          <img src={props.streamer.image} alt={props.streamer._id} />
        </div>

        <div className="flex flex-col w-full truncate md:max-w-[385px] lg:max-w-none">
          <div className="flex flex-col lg:flex-row lg:gap-10">
            <div className="flex flex-col">
              <label className="text-sm text-gray-400 -mb-[2px]">Name:</label>
              <div className="text-lg font-medium truncate">{props.streamer.name}</div>
            </div>
            <div className="flex flex-col">
              <label className="text-sm text-gray-400 -mb-[2px]">Platform:</label>

              <div className="flex items-center gap-[6px]">
                {props.streamer.platform === 'twitch' && <img className="w-[20px] h-[20px]" src={twitch} alt="Twitch" />}
                {props.streamer.platform === 'youtube' && <img className="w-[20px] h-[20px]" src={youtube} alt="YouTube" />}
                {props.streamer.platform === 'tiktok' && <img className="w-[20px] h-[20px]" src={tiktok} alt="TikTok" />}
                {props.streamer.platform === 'kick' && <img className="w-[20px] h-[20px]" src={kick} alt="Kick" />}
                {props.streamer.platform === 'rumble' && <img className="w-[20px] h-[20px]" src={rumble} alt="Rumble" />}

                <div className="text-lg font-medium">{platforms[props.streamer.platform as keyof typeof platforms]}</div>
              </div>
            </div>
          </div>

          <div className="hidden mt-1 text-sm text-gray-400/70 md:block">
            {Moment(props.streamer.createdAt).format('YYYY/MM/DD, HH:mm')}
          </div>
        </div>
      </div>

      <div className="-mt-1 -mb-1 text-sm text-gray-400/70 md:hidden">
        {Moment(props.streamer.createdAt).format('YYYY/MM/DD, HH:mm')}
      </div>

      <div className="flex flex-row items-center justify-between gap-4 md:justify-center">
        <Link
          to={`/streamer/${props.streamer._id}`}
          className="px-3 py-1 text-center transition border-2 rounded-xl active:scale-90 lg:w-[120px]"
        >
          Show details
        </Link>

        <div className="flex items-center justify-end gap-2 text-2xl">
          <div className="w-[52px] text-end">{props.streamer.votes}</div>
          <button className="mt-[1px] text-3xl transition active:scale-90" onClick={votingHandler}>
            {votedStreamers.includes(props.streamer._id) ? (
              <PiArrowFatLineUpFill className="text-orange-600" />
            ) : (
              <PiArrowFatLineUpBold className="text-orange-400" />
            )}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Streamer
