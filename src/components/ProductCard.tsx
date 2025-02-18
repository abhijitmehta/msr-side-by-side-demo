import React from 'react';
import { Star, ShoppingCart, Heart, Info } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  hit: Product;
}

export function ProductCard({ hit }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);

  // Ensure price is a number or default to 0
  const price = typeof hit.price === 'number' ? hit.price : 0;

  const formatValue = (value: any): string => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (Array.isArray(value)) return value.join(', ');
    return String(value);
  };

  const additionalDetails = [
    { label: 'Brand', value: hit.attrs?.Brand },
    { label: 'Product Dimensions', value: hit.info?.['Product Dimensions'] },
    { label: 'Discontinued', value: hit.info?.['Is Discontinued By Manufacturer'] },
    { label: 'Customer Reviews', value: hit.info?.['Customer Reviews'] },
    { label: 'Sales', value: hit.sales },
    { label: 'Popularity Score', value: hit.bayesianPopularity?.toFixed(2) },
    { label: 'Total Ratings', value: hit.ratingsCount },
    { label: 'Search Relevance', value: `${hit._rankingInfo?.nbExactWords || 0} exact matches` },
    { label: 'Global Conversions', value: hit.global_nb_conversions_hl },
    { label: 'Global Clicks', value: hit.global_nb_clicks_hl },
    { label: 'Query Count', value: hit.query_count },
  ];

  return (
    <div className="group relative rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Quick Actions */}
      <div className="absolute right-2 top-2 z-10 flex gap-2">
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="rounded-full bg-white p-1.5 shadow-md transition-colors hover:bg-gray-50"
        >
          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
        <button 
          onClick={() => setShowDetails(!showDetails)}
          className="rounded-full bg-white p-1.5 shadow-md transition-colors hover:bg-gray-50"
        >
          <Info className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      <div className="space-y-2">
        {/* Category */}
        {hit.category && (
          <p className="text-xs font-medium text-blue-600">{hit.category}</p>
        )}

        {/* Title */}
        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
          {hit.name || 'Product Name'}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2">
          {hit.description || 'No description available'}
        </p>

        {/* Rating */}
        {hit.rating && (
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < hit.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
            <span className="ml-1 text-xs text-gray-600">({hit.ratingsCount || 0})</span>
          </div>
        )}

        {/* Additional Details */}
        {showDetails && (
          <div className="rounded-md bg-gray-50 p-3">
            <h4 className="mb-2 text-xs font-semibold text-gray-900">Product Details</h4>
            <div className="grid gap-1 text-xs">
              {additionalDetails.map(({ label, value }) => (
                value && (
                  <div key={label} className="flex justify-between border-b border-gray-200 pb-1">
                    <span className="font-medium text-gray-600">{label}:</span>
                    <span className="text-gray-900">{formatValue(value)}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        )}

        {/* Price and Add to Cart */}
        <div className="flex items-center justify-between pt-2">
          <p className="text-sm font-bold text-gray-900">${price.toFixed(2)}</p>
          <button className="flex items-center gap-1 rounded-full bg-blue-600 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-700">
            <ShoppingCart className="h-3 w-3" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}