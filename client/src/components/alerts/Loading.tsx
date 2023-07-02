import { ImSpinner2 } from 'react-icons/im';

interface Props {
  open: boolean;
  styling?: string;
}

const Loading = (props: Props) => {
  return (
    <div
      className={`
        transition-opacity ease-in-out duration-200 
        ${props.open ? 'opacity-100' : 'opacity-0'} 
        ${props.styling && props.styling}
      `}
    >
      <ImSpinner2 className="animate-spin" />
    </div>
  );
};

export default Loading;
