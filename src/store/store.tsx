import { create } from 'zustand'

const useProductStore = create((set) => ({
    // state
    perPageProducts: Number(import.meta.env.VITE_PER_PAGE_PRODUCTS) || 10,
    searchQuery: '',
    selectedCategory: null,
    page: 1,

    // actions
    setSearchQuery: (query) => set({ searchQuery: query }),
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    resetFilters: () => set({ searchQuery: '', selectedCategory: null }),
    setPage: (page) => set({ page }),
}))

export default useProductStore;