import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'

interface Props {
  open: boolean
  onClose: () => void
}

const AboutModal = (props: Props) => {
  return (
    <Transition as={Fragment} appear show={props.open}>
      <Dialog as="div" onClose={() => props.onClose()} className="relative z-20">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full px-4 py-6 md:pt-16 md:pb-32">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="grid items-center w-full max-w-md">
                <div className="flex flex-col w-full col-start-1 row-start-1 px-5 py-4 overflow-hidden bg-gray-200 rounded-lg shadow-md">
                  {/* modal header*/}
                  <div className="text-xl font-semibold text-gray-800">
                    <div className="flex items-center justify-between w-full gap-4">
                      <h2 className="flex items-center gap-2">About this app</h2>

                      <button
                        type="button"
                        onClick={() => props.onClose()}
                        className="text-2xl transition active:scale-95 hover:text-gray-800/70"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>

                  {/* modal body*/}
                  <div className="flex flex-col w-full gap-[10px] mt-[14px] mb-5 overflow-y-auto text-gray-800">
                    <p>
                      <span className="font-bold">Streamer Spotlight</span> is an app created by{' '}
                      <a
                        href="https://github.com/jakubcieslik99"
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold underline"
                      >
                        Jakub Cieślik
                      </a>
                      , as a recruitment task. It&apos;s a simple web app connected to an API server where you can add your
                      favorite streamer or vote up for any existing ones or previously added by you.
                    </p>
                    <p>
                      If you have any questions regarding <span className="font-bold">Streamer Spotlight</span> app you can
                      reach the creator at{' '}
                      <a href="mailto:contact@jakubcieslik.com" className="underline">
                        contact@jakubcieslik.com
                      </a>{' '}
                      or{' '}
                      <a href="mailto:jakubcieslik99@gmail.com" className="underline">
                        jakubcieslik99@gmail.com
                      </a>
                      .
                    </p>
                  </div>

                  {/* modal footer*/}
                  <div className="flex justify-center w-full gap-2 mb-1 text-white">
                    <button
                      type="button"
                      onClick={() => props.onClose()}
                      className="px-[14px] py-2 bg-gray-700 rounded-xl transition active:scale-95 hover:bg-gray-700/90"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AboutModal
