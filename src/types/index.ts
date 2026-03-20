/**
 * Core Domain Types
 */

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage?: number;
  rating: number;
  stock: number;
  tags?: string[];
  brand?: string;
  sku?: string;
  weight?: number;
  dimensions?: {
    width?: number;
    height?: number;
    depth?: number;
  };
  warrantyInformation?: string;
  shippingInformation?: string;
  availabilityStatus?: string;
  reviews?: Review[];
  returnPolicy?: string;
  minimumOrderQuantity?: number;
  meta?: {
    createdAt?: string;
    updatedAt?: string;
    barcode?: string;
    qrCode?: string;
  };
  images: string[];
  thumbnail: string;
  category: string;
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface Category {
  slug: string;
  name: string;
  url?: string;
}

/**
 * API Response Types
 */

export interface ProductApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductDetailsApiResponse extends Product {}

export interface CategoriesApiResponse extends Array<string> {}

/**
 * Query Hook Parameter Types
 */

export interface ProductQueryParams {
  filter?: 'search' | 'category';
  category?: string;
  q?: string;
  limit?: number;
  skip?: number;
}

export interface ProductDetailsParams {
  id?: string | number;
}

/**
 * Query Hook Return Types
 */

export interface UseProductsReturn {
  products: Product[] | undefined;
  total: number | undefined;
  error: Error | null;
  isLoading: boolean;
}

export interface UseProductDetailsReturn {
  productDetails: Product | undefined;
  error: Error | null;
  isLoading: boolean;
}

export interface UseProductsCategoryReturn {
  category: string[] | undefined;
  error: Error | null;
  isLoading: boolean;
}

/**
 * Store State Types
 */

export interface ProductStoreState {
  // State
  perPageProducts: number;
  searchQuery: string;
  selectedCategory: string | null;
  page: number;

  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  resetFilters: () => void;
  setPage: (page: number) => void;
}

/**
 * Component Prop Types
 */

export interface ProductListProps {}

export interface ProductDetailsProps {}

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  productData?: Product | null;
  onSave?: (product: Product) => void;
}

export interface HomeProps {}
