export interface AlgoliaConfig {
  appId: string;
  apiKey: string;
  indexName: string;
}

export interface Product {
  objectID: string;
  name: string;
  description: string;
  price: number;
  image: string;
  rating?: number;
  category?: string;
  _rankingInfo?: {
    firstMatchedWord?: string;
    words?: string[];
    nbTypos?: number;
    nbExactWords?: number;
    proximityDistance?: number;
  };
  global_nb_conversions_hl?: number;
  word_len?: number;
  ratingsCount?: number;
  info?: {
    'Is Discontinued By Manufacturer'?: boolean;
    'Product Dimensions'?: string;
    'Customer Reviews'?: string;
  };
  bayesianPopularity?: number;
  sales?: number;
  attrs?: {
    Brand?: string;
  };
  char_len?: number;
  query_count?: number;
  global_nb_clicks_hl?: number;
}