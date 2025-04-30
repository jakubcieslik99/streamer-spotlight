import { useState } from 'react'
import { Link } from 'react-router-dom'
import { RiVideoChatFill, RiHome2Line, RiQuestionMark } from 'react-icons/ri'
import AboutModal from './AboutModal'

const Header = () => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  return (
    <header className="flex justify-between">
      <Link to="/" className="flex items-center gap-2 px-3 sm:px-4 pt-3 pb-3 sm:pb-[14px]">
        <RiVideoChatFill className="text-[23px] sm:text-4xl text-orange-600 mt-[2px]" />
        <div className="text-[18px] font-bold sm:text-3xl">Streamer Spotlight</div>
      </Link>

      <div className="flex items-center justify-center gap-2 pr-3 md:gap-3 sm:px-4">
        <Link
          to="/"
          className="flex items-center gap-1 p-[7px] transition bg-transparent border md:px-3 md:py-1 rounded-xl active:scale-90"
        >
          <RiHome2Line />
          <div className="hidden text-sm sm:text-base md:block">Home</div>
        </Link>

        <button
          onClick={() => setIsOpenModal(true)}
          className="flex items-center gap-1 p-[7px] transition bg-transparent border md:px-3 md:py-1 rounded-xl active:scale-90"
        >
          <RiQuestionMark />
          <div className="hidden text-sm sm:text-base md:block">About</div>
        </button>
      </div>

      <AboutModal open={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </header>
  )
}

export default Header
