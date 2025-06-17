"use client";

import { LuSearch } from "react-icons/lu";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Articles, Videos, Audio and More",
  onSearch,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="relative mb-6">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <LuSearch className="h-5 w-5 text-text-muted" />
      </div>
      <input
        type="text"
        className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 border-none rounded-2xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-700 transition-colors"
        placeholder={placeholder}
        onChange={handleInputChange}
        aria-label="Search content"
      />
    </div>
  );
};

export default SearchBar;
