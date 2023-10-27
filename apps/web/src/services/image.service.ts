import type { AxiosResponse } from 'axios';
import axios from 'axios';
import type {
  ErrorResponse,
  ImageResponse,
  ImagesResponse,
  StoredImage,
} from 'ui';
import {
  accessTokenMiddleware,
  requestErrorMiddleware,
  withAuthorization,
} from '../utils/helpers/request.helpers';
import { useImageStore } from '../store/image.store';

const backendUrl = `${process.env.NEXT_PUBLIC_APP_BACKEND_URL}/files`;
const defaultLimit = 10;

export const uploadImages = async (
  files: Record<StoredImage['id'], File>,
  updateHandler: (
    id: StoredImage['id'],
    loadedBytes: StoredImage['loadedBytes'],
  ) => void,
): Promise<(ImageResponse | ErrorResponse)[]> => {
  const futures: Promise<AxiosResponse<ImageResponse | ErrorResponse>>[] = [];

  for (const [id, file] of Object.entries(files)) {
    const data = new FormData();
    data.append('image', file);

    // noinspection JSUnusedGlobalSymbols
    futures.push(
      withAuthorization().post(`${backendUrl}/single`, data, {
        onUploadProgress: (event) => updateHandler(id, event.loaded),
      }),
    );
  }

  return (await Promise.all(futures)).map((file) => file.data);
};

export const getImages = async (
  page = 1,
  limit: number = defaultLimit,
): Promise<ImagesResponse | ErrorResponse> => {
  const { data } = await axios.get<ImagesResponse | ErrorResponse>(
    `${backendUrl}?page=${page}&limit=${limit}`,
  );

  return data;
};

/**
 * Retrieves next page of photos if images were retrieved last time.
 */
export const getMoreImages = async (): Promise<void> => {
  const storedCount = useImageStore.getState().images.length;
  if (storedCount && useImageStore.getState().previousFetchedCount === 0)
    return;

  const response = await requestErrorMiddleware(
    getImages(Math.ceil(storedCount / defaultLimit) + 1),
  );
  if (!response) return;

  const images = response.files;

  useImageStore.getState().addImages(
    images.map((image) => ({
      id: image.key,
      title: image.title,
      url: image.url,
      ownerId: image.ownerId,
      createdAt: image.createdAt,
    })),
  );
  useImageStore.getState().setPreviousFetchedCount(images.length);
};

/**
 * Gets number of images uploaded to service.
 */
export const getImageCount = async (): Promise<number> => {
  const data = (await getImages(1, 1)) as ImagesResponse;
  return data.totalItems || 0;
};

export const updateImage = async (
  id: StoredImage['id'],
  title: StoredImage['title'],
): Promise<ImageResponse | ErrorResponse> => {
  const { data } = accessTokenMiddleware(
    await withAuthorization().put<ImageResponse | ErrorResponse>(
      `${backendUrl}/${id}`,
      { title },
    ),
  );

  return data;
};

export const deleteImage = async (
  id: StoredImage['id'],
): Promise<ImageResponse | ErrorResponse> => {
  const { data } = accessTokenMiddleware(
    await withAuthorization().delete<ImageResponse | ErrorResponse>(
      `${backendUrl}/${id}`,
    ),
  );

  return data;
};
