import React from 'react';
import { useSearchBox } from 'react-instantsearch';
import { Search } from 'lucide-react';

interface SearchBoxProps {
  onQueryChange: (query: string) => void;
}

export function SearchBox({ onQueryChange }: SearchBoxProps) {
  const { query, refine } = useSearchBox();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    refine(e.target.value);
    onQueryChange(e.target.value);
  };

  return (
    <div className="relative w-full max-w-xl">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        <input
          type="search"
          value={query}
          onChange={handleChange}
          placeholder="Search products..."
          className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}