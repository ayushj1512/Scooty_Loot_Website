// stores/useCategoryProducts.ts
import { defineStore } from "pinia";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  raw: any;
}

export const useCategoryProducts = defineStore("categoryProducts", {
  state: () => ({
    _loading: false,
    _products: [] as Product[],
    _loadedCategoryId: null as string | null,
  }),

  getters: {
    loading: (state) => state._loading,
    products: (state) => state._products,
    loadedCategoryId: (state) => state._loadedCategoryId,
  },

  actions: {
    setLoading(value: boolean) {
      this._loading = value;
    },
    setProducts(products: Product[]) {
      this._products = products;
    },
    setLoadedCategoryId(categoryId: string | null) {
      this._loadedCategoryId = categoryId;
    },

    async fetchCategoryProducts(categoryId = "892") {
      if (this._loadedCategoryId === categoryId && this._products.length > 0)
        return;

      this.setLoading(true);

      try {
        const res = await fetch(
          `https://api.streetstylestore.com/collections/products/documents/search?q=*&filter_by=categories:=${categoryId}&sort_by=date_updated_unix:desc&per_page=100&page=1&x-typesense-api-key=Bm23NaocNyDb2qWiT9Mpn4qXdSmq7bqdoLzY6espTB3MC6Rx`
        );
        const json = await res.json();

        const transformedProducts = json.hits.map((h: any) => {
          const doc = h.document || h;
          const raw = doc.product_data ? JSON.parse(doc.product_data) : null;
          const img =
            raw?.images?.[0]?.bigImg?.replace(/\\/g, "/") ||
            doc.img ||
            "/placeholder.png";

          return {
            id: doc.id,
            name: doc.name,
            description:
              doc.description_short ||
              "This is a delicious bestselling product!",
            price: doc.selling_price || doc.real_selling_price || 0,
            image: img,
            raw,
          };
        });

        this.setProducts(transformedProducts);
        this.setLoadedCategoryId(categoryId);
      } catch (error) {
        console.error("❌ Error fetching category products:", error);
        this.setProducts([]);
        this.setLoadedCategoryId(null);
      } finally {
        this.setLoading(false);
      }
    },
  },

  persist: true,
});
