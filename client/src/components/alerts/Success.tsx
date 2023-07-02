import { Transition } from '@headlessui/react';

interface Props {
  open: boolean;
  message: string;
  styling?: string;
}

const Success = (props: Props) => {
  return (
    <Transition
      className={`px-3 pt-1 pb-[3px] text-sm font-semibold text-green-700 bg-green-200 border-2 border-green-600 rounded-xl break-words leading-[1.12rem] ${
        props.styling && props.styling
      }`}
      show={props.open}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      {props.message}
    </Transition>
  );
};

export default Success;
