import { createSignal, type Component } from 'solid-js';
import type { ParentOverviews } from '../lib/types/pairs/ParentOverviews';
import { SearchIcon } from 'lucide-solid';

// type Props = {
//   parents: ParentOverviews.Output;
// };

const ParentsList: Component = (props) => {
  // let [query, setQuery] = createSignal('');

  return (
    <div class="flex flex-col">
      <div class="my-4">
        <div class="bg-gray-200/70 rounded-xl flex items-center hover:bg-gray-200 transition-colors duration-150">
          <span class="shrink-0 p-3">
            <SearchIcon class="shrink-0 text-gray-400" size={22} />
          </span>
          <input
            class="flex-grow self-stretch outline-none placeholder:text-gray-400/80 text-lg"
            placeholder="Search by email..."
          />
        </div>
      </div>
      {/* <span>{query()} foo</span> */}
      {/* {props.parents */}
      {/*   .filter((p) => p.email.toLowerCase().includes(query().toLowerCase())) */}
      {/*   .map((parent) => ( */}
      {/*     <div>{parent.email}</div> */}
      {/*   ))} */}
    </div>
  );
};

export default ParentsList;
