import { create } from 'zustand'

export const useProductStore = create((set) => ({
  products: [],
  // increasePopulation: () => set((state) => ({ bears: state.bears + 1 })),
  // removeAllBears: () => set({ bears: 0 }),
  setProducts: (newProducts) => set({ products: newProducts.reverse() }),
}))