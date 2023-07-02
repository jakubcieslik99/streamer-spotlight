import { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { FaSearch, FaAngleDown } from 'react-icons/fa';

export interface SortingOption {
  id: number;
  name: string;
  value: string;
}

interface Props {
  searching: string;
  setSearching: (searching: string) => void;
  searchingHandler: (e: any) => void;
  sortingOption: SortingOption;
  sortingHandler: (option: SortingOption) => void;
}

export const sortingOptions: SortingOption[] = [
  { id: 1, name: 'Newest', value: 'newest' },
  { id: 2, name: 'Oldest', value: 'oldest' },
  { id: 3, name: 'Most liked', value: 'most_liked' },
  { id: 4, name: 'Least liked', value: 'least_liked' },
  { id: 5, name: 'A - Z', value: 'atoz' },
  { id: 6, name: 'Z - A', value: 'ztoa' },
];

const Tools = (props: Props) => {
  return (
    <div className="flex flex-col w-full gap-1 mb-4 md:gap-6 md:flex-row md:mb-0">
      <div className="flex w-full">
        <form onSubmit={props.searchingHandler} className="w-full lg:w-[350px] flex flex-col gap-1">
          <label htmlFor="sorting" className="text-xs text-gray-400">
            Searching
          </label>

          <div className="relative">
            <input
              type="text"
              name="searching"
              id="searchInput"
              placeholder="Search..."
              className="w-full py-1 pl-3 truncate bg-transparent border-2 pr-9 rounded-xl focus:outline-none"
              value={props.searching}
              onChange={e => props.setSearching(e.target.value)}
            />
            <button
              type="submit"
              className="absolute top-0 right-[1px] flex items-center justify-center flex-none transition w-9 h-9 active:scale-90"
            >
              <FaSearch />
            </button>
          </div>
        </form>
      </div>

      <div className="flex w-full">
        <div className="w-full lg:w-[280px] flex flex-col gap-1">
          <label htmlFor="sorting" className="text-xs text-gray-400">
            Sorting
          </label>

          <Listbox value={props.sortingOption} onChange={option => props.sortingHandler(option)}>
            <div className="relative h-9">
              <Listbox.Button className="absolute flex items-center justify-between w-full py-1 pl-3 border-2 rounded-xl">
                <div className="truncate">{props.sortingOption.name}</div>
                <div className="flex items-center justify-center flex-none transition w-9 active:scale-90">
                  <FaAngleDown className="text-xl ml-[1px] mt-[1px]" />
                </div>
              </Listbox.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute z-10 w-full overflow-hidden text-gray-900 bg-gray-200 cursor-pointer top-10 rounded-xl">
                  {sortingOptions.map(option => (
                    <Listbox.Option key={option.id} value={option} className="px-3 py-[6px] truncate hover:bg-black/20">
                      {option.name}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  );
};

export default Tools;
