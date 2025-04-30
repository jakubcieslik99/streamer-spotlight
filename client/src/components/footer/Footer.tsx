import { RiVideoChatFill } from 'react-icons/ri'

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col items-center justify-center text-sm md:flex-row">
        <p>Copyright © {new Date().getFullYear()}</p>
        <p className="hidden mx-3 font-extralight md:block">|</p>
        <p className="flex items-center mt-[7px] mb-[9px] text-xl font-bold md:text-base md:-my-[1px]">
          <RiVideoChatFill className="ml-1 mt-[1px] text-orange-600" />
          <span className="mt-[1px] md:mt-0 ml-1">Streamer Spotlight</span>
        </p>
        <p className="hidden mx-3 font-extralight md:block">|</p>
        <p>All rights reserved.</p>
      </div>
    </footer>
  )
}

export default Footer
