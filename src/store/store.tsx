import { create } from 'zustand'
import type { ProductStoreState } from '../types'

const useProductStore = create<ProductStoreState>((set) => ({
    // state
    perPageProducts: Number(import.meta.env.VITE_PER_PAGE_PRODUCTS) || 10,
    searchQuery: '',
    selectedCategory: null,
    page: 1,

    // actions
    setSearchQuery: (query: string) => set({ searchQuery: query }),
    setSelectedCategory: (category: string | null) => set({ selectedCategory: category }),
    resetFilters: () => set({ searchQuery: '', selectedCategory: null }),
    setPage: (page: number) => set({ page }),
}))

export default useProductStore;