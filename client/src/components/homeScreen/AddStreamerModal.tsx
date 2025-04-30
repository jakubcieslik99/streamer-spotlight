import { useRef, useState, useEffect, Fragment } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnyAction } from '@reduxjs/toolkit'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Dialog, Transition } from '@headlessui/react'
import { FaTimes } from 'react-icons/fa'
import { useAppSelector, useAppDispatch } from '../../features/store'
import { postStreamer, successReset, errorReset } from '../../features/streamerSlices/postStreamer'
import { getStreamers } from '../../features/streamerSlices/manageStreamers'
import { saveStreamerErrors } from '../../validations/streamerValidation'
import Loading from '../alerts/Loading'
import Success from '../alerts/Success'
import Error from '../alerts/Error'

interface FormValues {
  streamerName: string
  streamerDescription: string
  streamerImage: string
}

interface Props {
  open: boolean
  onClose: () => void
}

const AddStreamerModal = (props: Props) => {
  const isMounted = useRef(true)
  const getStreamersAbort = useRef<(reason?: string | undefined) => void | null>(null)

  const { loading, success, successMessage, error, errorMessage } = useAppSelector(state => state.postStreamer)
  const dispatch = useAppDispatch()

  const [searchParams] = useSearchParams()
  const [streamerPlatform, setStreamerPlatform] = useState('')
  const [streamerPlatformError, setStreamerPlatformError] = useState(false)
  const [streamerPlatformErrorMessage, setStreamerPlatformErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: { streamerName: '', streamerDescription: '', streamerImage: '' } })

  const selectStreamerPlatformHandler = (value: string) => {
    setStreamerPlatform(value)
    setStreamerPlatformError(false)
  }

  const closeHandler = () => {
    props.onClose()
    setTimeout(() => {
      reset()
      setStreamerPlatform('')
      setStreamerPlatformError(false)
      if (success) dispatch(successReset(undefined))
      if (error) dispatch(errorReset(undefined))
    }, 200)
  }

  const submitHandler: SubmitHandler<FormValues> = data => {
    if (streamerPlatform === '') {
      setStreamerPlatformError(true)
      setStreamerPlatformErrorMessage('Platform is required.')
    } else {
      dispatch(
        postStreamer({
          name: data.streamerName,
          description: data.streamerDescription,
          image: data.streamerImage,
          platform: streamerPlatform,
        }) as unknown as AnyAction,
      )
        .unwrap()
        .then(() => {
          if (isMounted.current) {
            const getStreamersPromise = dispatch(
              getStreamers({
                searching: searchParams.get('searching') || '',
                sorting: searchParams.get('sorting') || '',
                page: searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1,
              }) as unknown as AnyAction,
            )
            getStreamersAbort.current = getStreamersPromise.abort
          } else {
            dispatch(successReset(undefined))
            dispatch(errorReset(undefined))
          }
        })
        .catch((error: unknown) => error)
    }
  }

  useEffect(() => {
    isMounted.current = true
    return () => {
      isMounted.current = false
      if (getStreamersAbort.current) {
        getStreamersAbort.current()
        dispatch(successReset(undefined))
        dispatch(errorReset(undefined))
      }
    }
  }, [isMounted, getStreamersAbort, dispatch])

  return (
    <Transition as={Fragment} appear show={props.open}>
      <Dialog as="div" onClose={closeHandler} className="relative z-20">
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
                <form
                  onSubmit={handleSubmit(submitHandler)}
                  className="flex flex-col w-full col-start-1 row-start-1 px-5 py-4 overflow-hidden bg-gray-200 rounded-lg shadow-md"
                >
                  {/* modal header*/}
                  <div className="text-xl font-semibold text-gray-800">
                    <div className="flex items-center justify-between w-full gap-4">
                      <h2 className="flex items-center gap-2">
                        Add new streamer
                        <Loading open={loading} />
                      </h2>

                      <button
                        type="button"
                        onClick={closeHandler}
                        className="text-2xl transition active:scale-95 hover:text-gray-800/70"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </div>

                  {/* modal body*/}
                  <div className="flex flex-col w-full gap-[10px] mt-[14px] mb-5 overflow-y-auto text-gray-800">
                    <Error open={error && errorMessage !== '' ? true : false} message={errorMessage} />
                    <Success open={success && successMessage !== '' ? true : false} message={successMessage} />

                    <div>
                      <label htmlFor="streamerName" className="text-sm">
                        Streamer&apos;s name*:
                      </label>
                      <input
                        {...register('streamerName', saveStreamerErrors.streamerName)}
                        type="text"
                        id="streamerName"
                        placeholder="Name*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.streamerName && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          open={errors.streamerName?.type === 'required' ? true : false}
                          message={saveStreamerErrors.streamerName.required.message}
                        />
                        <Error
                          open={errors.streamerName?.type === 'maxLength' ? true : false}
                          message={saveStreamerErrors.streamerName.maxLength.message}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="streamerDescription" className="text-sm">
                        Streamer&apos;s description*:
                      </label>
                      <textarea
                        {...register('streamerDescription', saveStreamerErrors.streamerDescription)}
                        rows={3}
                        id="streamerDescription"
                        placeholder="Description*"
                        className="w-full resize-none outline-0 border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.streamerDescription && 'h-[29px] -mt-[1px]'}`}>
                        <Error
                          open={errors.streamerDescription?.type === 'required' ? true : false}
                          message={saveStreamerErrors.streamerDescription.required.message}
                        />
                        <Error
                          open={errors.streamerDescription?.type === 'maxLength' ? true : false}
                          message={saveStreamerErrors.streamerDescription.maxLength.message}
                        />
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="streamerPlatform" className="text-sm mb-[2px]">
                        Streamer&apos;s platform*:
                      </label>
                      <select
                        id="streamerPlatform"
                        value={streamerPlatform}
                        onChange={e => selectStreamerPlatformHandler(e.target.value)}
                        className={`border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full h-[44px] transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent ${
                          streamerPlatform === '' && ' text-gray-400'
                        }`}
                      >
                        <option value="" disabled hidden>
                          Platform*
                        </option>
                        <option value="twitch" className="text-gray-800">
                          Twitch
                        </option>
                        <option value="youtube" className="text-gray-800">
                          YouTube
                        </option>
                        <option value="tiktok" className="text-gray-800">
                          TikTok
                        </option>
                        <option value="kick" className="text-gray-800">
                          Kick
                        </option>
                        <option value="rumble" className="text-gray-800">
                          Rumble
                        </option>
                      </select>

                      <div className={`relative ${streamerPlatformError && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          open={streamerPlatformError && streamerPlatformErrorMessage !== '' ? true : false}
                          message={streamerPlatformErrorMessage}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="streamerImage" className="text-sm">
                        Streamer&apos;s image link*:
                      </label>
                      <input
                        {...register('streamerImage', saveStreamerErrors.streamerImage)}
                        type="text"
                        id="streamerImage"
                        placeholder="Image link*"
                        className="border-2 border-gray-400/70 rounded-xl bg-white/[0.05] py-2 px-3 w-full transition-colors transition-duration-250 focus:outline-none focus:ring focus:border-gray-800 focus:ring-transparent"
                      />

                      <div className={`relative ${errors.streamerImage && 'h-[29px] mt-[5px]'}`}>
                        <Error
                          open={errors.streamerImage?.type === 'required' ? true : false}
                          message={saveStreamerErrors.streamerImage.required.message}
                        />
                        <Error
                          open={errors.streamerImage?.type === 'pattern' ? true : false}
                          message={saveStreamerErrors.streamerImage.pattern.message}
                        />
                      </div>
                    </div>
                  </div>

                  {/* modal footer*/}
                  <div className="flex justify-center w-full gap-2 mb-1 text-white">
                    {!success && (
                      <button
                        disabled={loading}
                        type="submit"
                        className="px-[14px] py-2 bg-orange-600 rounded-xl transition active:scale-95 hover:bg-orange-600/80"
                      >
                        Add
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={closeHandler}
                      className="px-[14px] py-2 bg-gray-700 rounded-xl transition active:scale-95 hover:bg-gray-700/90"
                    >
                      {!success ? 'Cancel' : 'Close'}
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default AddStreamerModal
