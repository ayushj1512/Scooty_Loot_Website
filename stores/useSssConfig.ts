// stores/useSssConfig.ts
import { defineStore } from "pinia";

export const useSssConfig = defineStore("sssConfig", {
  state: () => ({
    _loading: false,
    _loaded: false,
    _data: null as Record<string, any> | null,
  }),

  getters: {
    loading: (state) => state._loading,
    loaded: (state) => state._loaded,
    data: (state) => state._data,
  },

  actions: {
    setLoading(value: boolean) {
      this._loading = value;
    },
    setLoaded(value: boolean) {
      this._loaded = value;
    },
    setData(data: Record<string, any> | null) {
      this._data = data;
    },

    async fetchConfig() {
      if (this._loaded || this._loading) return;

      this.setLoading(true);
      try {
        const res = await fetch(
          "https://api.streetstylestore.com/collections/sss_config/documents/scootyloot-slider?a=1&x-typesense-api-key=F5gdSFxpg6bi8ZXfuybIsQy074HtBDkC"
        );

        const json = await res.json();
        this.setData(JSON.parse(json.data));
        this.setLoaded(true);
      } catch (error) {
        console.error("❌ Error fetching SSS config:", error);
        this.setData(null);
        this.setLoaded(false);
      } finally {
        this.setLoading(false);
      }
    },
  },

  persist: {
    storage: typeof window !== "undefined" ? localStorage : undefined,
  },
});
