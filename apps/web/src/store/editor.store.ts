import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { InteractableImageProps } from 'ui';

export interface EditorState {
  imageId: InteractableImageProps['id'];
  imageTitle: InteractableImageProps['title'];
  imageUrl: InteractableImageProps['url'];

  setImageInfo: (
    id: EditorState['imageId'],
    title: EditorState['imageTitle'],
    url: EditorState['imageUrl'],
  ) => void;
}

export const useEditorStore = create<EditorState>()(
  devtools(
    immer((set) => ({
      imageId: '',
      imageUrl: '',
      imageTitle: undefined,

      setImageInfo: (
        id: EditorState['imageId'],
        title: EditorState['imageTitle'],
        url: EditorState['imageUrl'],
      ) => set(() => ({ imageId: id, imageTitle: title, imageUrl: url })),
    })),
  ),
);
