import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { StoredImage } from 'ui';

interface ImageState {
  images: StoredImage[];
  addImages: (images: StoredImage[], unshift?: boolean) => void;
  removeImages: (ids: StoredImage['id'][]) => void;
  changeLoadingState: (
    id: StoredImage['id'],
    loadedBytes: StoredImage['loadedBytes'],
  ) => void;
  setTitle: (id: StoredImage['id'], title: StoredImage['title']) => void;

  count: number;
  setCount: (count: number) => void;

  previousFetchedCount: number;
  setPreviousFetchedCount: (count: number) => void;
}

export const useImageStore = create<ImageState>()(
  devtools(
    immer((set) => ({
      images: [],
      count: 0,
      previousFetchedCount: 0,

      addImages: (images: StoredImage[], unshift?: boolean) =>
        set((state) => {
          // Keep only unique images.
          const filteredImages = images.filter(
            (image) =>
              !state.images.find((storedImage) => storedImage.id === image.id),
          );

          if (unshift) state.images.unshift(...filteredImages);
          else state.images.push(...filteredImages);
        }),

      removeImages: (ids: StoredImage['id'][]) =>
        set((state) => ({
          images: state.images.filter((image) => !ids.includes(image.id)),
        })),

      changeLoadingState: (
        id: StoredImage['id'],
        loadedBytes: StoredImage['loadedBytes'],
      ) =>
        set((state) => {
          for (const loadingImage of state.images) {
            if (loadingImage.id !== id) continue;
            loadingImage.loadedBytes = loadedBytes;
          }
        }),

      setTitle: (id: StoredImage['id'], title: StoredImage['title']) =>
        set((state) => {
          for (const storedImage of state.images) {
            if (storedImage.id !== id) continue;
            storedImage.title = title;
          }
        }),

      setCount: (count: number) => set(() => ({ count })),

      setPreviousFetchedCount: (count: number) =>
        set(() => ({ previousFetchedCount: count })),
    })),
  ),
);
