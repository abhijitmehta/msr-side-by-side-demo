import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, Hits, Configure } from 'react-instantsearch';
import { SearchBox } from './components/SearchBox';
import { ProductCard } from './components/ProductCard';
import { IndexSelector } from './components/IndexSelector';
import type { AlgoliaConfig } from './types';

const DEFAULT_CONFIG: AlgoliaConfig = {
  appId: import.meta.env.VITE_ALGOLIA_APP_ID,
  apiKey: import.meta.env.VITE_ALGOLIA_API_KEY,
  indexName: import.meta.env.VITE_ALGOLIA_INDEX_NAME
};

const AVAILABLE_INDICES = import.meta.env.VITE_AVAILABLE_INDICES.split(',');

function App() {
  const [selectedIndices, setSelectedIndices] = React.useState<string[]>([DEFAULT_CONFIG.indexName]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const searchClient = React.useMemo(
    () => algoliasearch(DEFAULT_CONFIG.appId, DEFAULT_CONFIG.apiKey),
    []
  );

  const gridCols = selectedIndices.length === 1 
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
    : selectedIndices.length === 2
    ? 'grid-cols-1 lg:grid-cols-2'
    : 'grid-cols-1 lg:grid-cols-3';

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-50 bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              AlgoCommerce
            </h1>
            <InstantSearch 
              searchClient={searchClient} 
              indexName={DEFAULT_CONFIG.indexName}
            >
              <SearchBox onQueryChange={setSearchQuery} />
            </InstantSearch>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className={`grid gap-6 ${gridCols}`}>
          {selectedIndices.map((indexName) => (
            <InstantSearch
              key={indexName}
              searchClient={searchClient}
              indexName={indexName}
            >
              <Configure query={searchQuery} />
              <div className="space-y-4">
                <div className="flex items-center space-x-2 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 px-4 py-3 shadow-sm">
                  <span className="text-sm font-medium text-blue-600">Index:</span>
                  <span className="rounded-md bg-white px-3 py-1 text-sm font-semibold text-gray-800 shadow-sm ring-1 ring-gray-200">
                    {indexName}
                  </span>
                </div>
                <Hits hitComponent={ProductCard} />
              </div>
            </InstantSearch>
          ))}
        </div>
      </main>

      <IndexSelector
        selectedIndices={selectedIndices}
        onSelectIndex={setSelectedIndices}
        availableIndices={AVAILABLE_INDICES}
      />
    </div>
  );
}

export default App;