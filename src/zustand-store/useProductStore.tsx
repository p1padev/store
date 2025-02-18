import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Product } from '../routes/store/useProductsQuery';

export interface ProductWithAmount extends Product {
  amount: number;
}

interface ProductStoreActions {
  addToCart: (product: Product) => () => void;
  increaseAmount: (productId: number) => () => void;
  decreaseAmount: (productId: number) => () => void;
  deleteItem: (productId: number) => () => void;
  reset: () => void;
}

export interface ProductStoreState {
  cart: ProductWithAmount[];
}

const initialState: ProductStoreState = {
  cart: [],
};

const useProductStore = create<ProductStoreActions & ProductStoreState>()(
  persist(
    (set) => ({
      ...initialState,
      addToCart: (product) => () =>
        set((state) => {
          const productWithAmount = { ...product, amount: 1 };
          const existsOnCart =
            state.cart.some((p) => p.id === product.id) || false;
          if (!existsOnCart) {
            return { cart: [...state.cart, productWithAmount] };
          }
          return { cart: state.cart };
        }),
      increaseAmount: (productId) => () =>
        set((state) => ({
          cart: updateProductAmount(state.cart, productId, 1),
        })),
      decreaseAmount: (productId) => () =>
        set((state) => ({
          cart: updateProductAmount(state.cart, productId, -1),
        })),
      deleteItem: (productId) => () =>
        set((state) => ({
          cart: state.cart.filter((p) => p.id !== productId),
        })),
      reset: () => {
        set(initialState);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);

const updateProductAmount = (
  cart: ProductWithAmount[],
  productId: number,
  change: number
) => {
  return cart.reduce((acc, item) => {
    if (item.id === productId) {
      const newAmount = item.amount + change;
      if (newAmount > 0) {
        acc.push({ ...item, amount: newAmount });
      }
    } else {
      acc.push(item);
    }
    return acc;
  }, [] as ProductWithAmount[]);
};

export default useProductStore;
