import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';

interface Props {
  limit?: number;
  count: number;
  page: number;
  pageHandler: (page: number) => void;
}

const Paginator = (props: Props) => {
  const listPagesHandler = () => {
    const limit = props.limit || 20;
    const pages = Math.ceil(props.count / limit);

    const elements = [];
    if (pages > 5) {
      props.page > 3 &&
        elements.push(
          <button
            key={-2}
            type="button"
            onClick={() => props.pageHandler(1)}
            className="flex items-center justify-center w-6 h-full transition active:scale-90"
          >
            <FaAngleDoubleLeft />
          </button>,
        );
      props.page > 1 &&
        elements.push(
          <button
            key={-1}
            type="button"
            onClick={() => props.pageHandler(props.page - 1)}
            className="flex items-center justify-center w-6 h-full transition active:scale-90"
          >
            <FaAngleLeft />
          </button>,
        );
      if (props.page < 3) {
        for (let i = 1; i <= 5; i++) {
          elements.push(
            <button
              disabled={i === props.page ? true : false}
              key={i}
              type="button"
              onClick={() => props.pageHandler(i)}
              className={i === props.page ? 'w-6 underline' : 'w-6 transition active:scale-90'}
            >
              {i}
            </button>,
          );
        }
      } else if (props.page >= 3 && props.page <= pages - 2) {
        for (let i = props.page - 2; i <= props.page + 2; i++) {
          elements.push(
            <button
              disabled={i === props.page ? true : false}
              key={i}
              type="button"
              onClick={() => props.pageHandler(i)}
              className={i === props.page ? 'w-6 underline' : 'w-6 transition active:scale-90'}
            >
              {i}
            </button>,
          );
        }
      } else {
        for (let i = pages - 4; i <= pages; i++) {
          elements.push(
            <button
              disabled={i === props.page ? true : false}
              key={i}
              type="button"
              onClick={() => props.pageHandler(i)}
              className={i === props.page ? 'w-6 underline' : 'w-6 transition active:scale-90'}
            >
              {i}
            </button>,
          );
        }
      }
      props.page < pages &&
        elements.push(
          <button
            key={-3}
            type="button"
            onClick={() => props.pageHandler(props.page + 1)}
            className="flex items-center justify-center w-6 h-full transition active:scale-90"
          >
            <FaAngleRight />
          </button>,
        );
      props.page < pages - 2 &&
        elements.push(
          <button
            key={-4}
            type="button"
            onClick={() => props.pageHandler(pages)}
            className="flex items-center justify-center w-6 h-full transition active:scale-90"
          >
            <FaAngleDoubleRight />
          </button>,
        );
    } else {
      for (let i = 1; i <= pages; i++) {
        elements.push(
          <button
            disabled={i === props.page ? true : false}
            key={i}
            type="button"
            onClick={() => props.pageHandler(i)}
            className={i === props.page ? 'w-6 underline' : 'w-6 transition active:scale-90'}
          >
            {i}
          </button>,
        );
      }
    }

    return elements;
  };

  return <div className="flex items-center justify-center px-2 text-lg border-2 rounded-xl">{listPagesHandler()}</div>;
};

export default Paginator;
