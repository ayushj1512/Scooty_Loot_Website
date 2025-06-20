import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    isOpen: false,
    restaurantId: null
  }),

  getters: {
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },
    
    total: (state) => {
      return state.items.reduce((total, item) => total + (item.price * item.quantity), 0)
    },

    isEmpty: (state) => state.items.length === 0
  },

  actions: {
    addItem(item, selectedOptions = []) {
      const existingItemIndex = this.items.findIndex(
        cartItem => 
          cartItem.id === item.id && 
          JSON.stringify(cartItem.selectedOptions) === JSON.stringify(selectedOptions)
      )

      if (existingItemIndex > -1) {
        this.items[existingItemIndex].quantity += 1
      } else {
        this.items.push({
          ...item,
          quantity: 1,
          selectedOptions,
          restaurantId: item.restaurantId
        })
      }

      // Set restaurant ID if this is the first item
      if (this.items.length === 1) {
        this.restaurantId = item.restaurantId
      }
    },

    removeItem(itemId, selectedOptions = []) {
      this.items = this.items.filter(
        item => !(item.id === itemId && JSON.stringify(item.selectedOptions) === JSON.stringify(selectedOptions))
      )
      
      if (this.items.length === 0) {
        this.restaurantId = null
      }
    },

    updateQuantity(itemId, quantity, selectedOptions = []) {
      if (quantity <= 0) {
        this.removeItem(itemId, selectedOptions)
        return
      }

      const item = this.items.find(
        cartItem => 
          cartItem.id === itemId && 
          JSON.stringify(cartItem.selectedOptions) === JSON.stringify(selectedOptions)
      )
      
      if (item) {
        item.quantity = quantity
      }
    },

    clearCart() {
      this.items = []
      this.restaurantId = null
    },

    openCart() {
      this.isOpen = true
    },

    closeCart() {
      this.isOpen = false
    },

    toggleCart() {
      this.isOpen = !this.isOpen
    },

    canAddFromRestaurant(restaurantId) {
      return this.isEmpty || this.restaurantId === restaurantId
    }
  },

  persist: true
})