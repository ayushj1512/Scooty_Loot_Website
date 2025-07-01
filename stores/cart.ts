import { defineStore } from "pinia";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  selectedOptions?: any[];
  restaurantId: string | null;
  [key: string]: any; // To allow other dynamic fields
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  restaurantId: string | null;
}

export const useCartStore = defineStore("cart", {
  state: (): CartState => ({
    items: [],
    isOpen: false,
    restaurantId: null,
  }),

  getters: {
    itemCount: (state): number =>
      state.items.reduce((total, item) => total + item.quantity, 0),

    total: (state): number =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),

    isEmpty: (state): boolean => state.items.length === 0,

    getItems: (state): CartItem[] => state.items,
    getRestaurantId: (state): string | null => state.restaurantId,
    getIsOpen: (state): boolean => state.isOpen,
  },

  actions: {
    setItems(newItems: CartItem[]) {
      this.items = newItems;
    },

    setRestaurantId(id: string | null) {
      this.restaurantId = id;
    },

    setIsOpen(value: boolean) {
      this.isOpen = value;
    },

    addItem(item: CartItem, selectedOptions: any[] = []) {
      const existingItemIndex = this.items.findIndex(
        (cartItem) =>
          cartItem.id === item.id &&
          JSON.stringify(cartItem.selectedOptions) ===
            JSON.stringify(selectedOptions)
      );

      if (existingItemIndex > -1) {
        this.items[existingItemIndex].quantity += 1;
      } else {
        this.items.push({
          ...item,
          quantity: 1,
          selectedOptions,
          restaurantId: item.restaurantId,
        });
      }

      if (this.items.length === 1) {
        this.setRestaurantId(item.restaurantId);
      }
    },

    removeItem(itemId: string, selectedOptions: any[] = []) {
      this.setItems(
        this.items.filter(
          (item) =>
            !(
              item.id === itemId &&
              JSON.stringify(item.selectedOptions) ===
                JSON.stringify(selectedOptions)
            )
        )
      );

      if (this.items.length === 0) {
        this.setRestaurantId(null);
      }
    },

    updateQuantity(
      itemId: string,
      quantity: number,
      selectedOptions: any[] = []
    ) {
      if (quantity <= 0) {
        this.removeItem(itemId, selectedOptions);
        return;
      }

      const item = this.items.find(
        (cartItem) =>
          cartItem.id === itemId &&
          JSON.stringify(cartItem.selectedOptions) ===
            JSON.stringify(selectedOptions)
      );

      if (item) {
        item.quantity = quantity;
      }
    },

    clearCart() {
      this.setItems([]);
      this.setRestaurantId(null);
    },

    resetCartState() {
      this.clearCart();
      this.setIsOpen(false);
    },

    openCart() {
      this.setIsOpen(true);
    },

    closeCart() {
      this.setIsOpen(false);
    },

    toggleCart() {
      this.setIsOpen(!this.isOpen);
    },

    canAddFromRestaurant(restaurantId: string): boolean {
      return this.isEmpty || this.restaurantId === restaurantId;
    },
  },

  persist: true,
});
