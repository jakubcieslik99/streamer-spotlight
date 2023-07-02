import { useState, useEffect } from 'react';
import { useSearchParams, URLSearchParamsInit } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../features/store';
import { getStreamers, GetStreamers } from '../features/streamerSlices/manageStreamers';
import Tools from '../components/homeScreen/Tools';
import AddStreamerModal from '../components/homeScreen/AddStreamerModal';
import Streamer from '../components/homeScreen/Streamer';
import Paginator from '../components/homeScreen/Paginator';
import { sortingOptions, SortingOption } from '../components/homeScreen/Tools';
import Loading from '../components/alerts/Loading';
import Error from '../components/alerts/Error';

let URL: GetStreamers = {};

const HomeScreen = () => {
  const { loading, count, streamers, error, errorMessage } = useAppSelector(state => state.manageStreamers);
  const dispatch = useAppDispatch();

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();
  const [searching, setSearching] = useState(searchParams.get('searching') || '');
  const [sorting, setSorting] = useState(searchParams.get('sorting') || sortingOptions[0].value);
  const [sortingOption, setSortingOption] = useState(sortingOptions[0]);
  const [page, setPage] = useState(searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1);

  const filterURL = (searchingFilter: string, sortingFilter: string, pageFilter: number) => {
    if (searchingFilter !== '') URL.searching = searchingFilter;
    else if (URL.searching) delete URL.searching;

    if (sortingFilter !== 'newest') URL.sorting = sortingFilter;
    else if (URL.sorting) delete URL.sorting;

    if (pageFilter !== 1) URL.page = pageFilter;
    else if (URL.page) delete URL.page;

    setSearchParams({ ...URL } as URLSearchParamsInit);
  };

  const searchingHandler = (e: any) => {
    e.preventDefault();
    setPage(1);
    filterURL(searching, sorting, 1);
  };
  const sortingHandler = (option: SortingOption) => {
    setSorting(option.value);
    setSortingOption(option);
    filterURL(searching, option.value, page);
  };
  const pageHandler = (page: number) => {
    setPage(page);
    filterURL(searching, sorting, page);
  };

  useEffect(() => {
    const getStreamersPromise = dispatch(
      getStreamers({
        searching: searchParams.get('searching') || '',
        sorting: searchParams.get('sorting') || '',
        page: searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1,
      })
    );
    return () => {
      getStreamersPromise.abort();
    };
  }, [searchParams, dispatch]);

  return (
    <main>
      <div className="flex flex-col items-center justify-between w-full gap-3 px-4 pt-3 pb-4 mb-6 bg-gray-800 md:gap-5 md:items-end lg:flex-row rounded-xl">
        <Tools
          searching={searching}
          setSearching={setSearching}
          searchingHandler={searchingHandler}
          sortingOption={sortingOption}
          sortingHandler={sortingHandler}
        />

        <div className="flex items-center justify-between w-full">
          <Loading open={loading} styling="text-3xl" />

          <button
            type="button"
            onClick={() => setIsOpenModal(true)}
            className="px-3 py-1 transition border-2 rounded-xl active:scale-90 w-[170px] border-orange-400 text-orange-400"
          >
            Add a new streamer
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center w-full gap-4 mb-8">
        <Error open={error && errorMessage !== '' ? true : false} message={errorMessage} styling="w-full" />

        {streamers.length ? (
          <>
            {streamers.map(streamer => (
              <Streamer key={streamer._id} streamer={streamer} />
            ))}

            <div className="flex">
              <Paginator count={count} page={page} pageHandler={pageHandler} />
            </div>
          </>
        ) : (
          <div className="flex justify-center w-full px-3 m-3 text-xl text-center font-semobold">
            There are no streamers added yet.
          </div>
        )}
      </div>

      <AddStreamerModal open={isOpenModal} onClose={() => setIsOpenModal(false)} />
    </main>
  );
};

export default HomeScreen;
