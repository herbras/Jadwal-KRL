import { writable } from 'svelte/store';

function createLocalStore(key, startValue) {
  const { subscribe, set, update } = writable(startValue);

  return {
    subscribe,
    set: (value) => {
      set(value);
      localStorage.setItem(key, JSON.stringify(value));
    },
    update,
    useLocalStorage: () => {
      const json = localStorage.getItem(key);
      if (json) {
        set(JSON.parse(json));
      }
    }
  };
}

export const favoritesStore = createLocalStore('favorites', []);
