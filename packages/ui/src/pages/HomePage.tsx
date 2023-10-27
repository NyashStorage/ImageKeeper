import type { ReactElement } from 'react';
import type { HeaderProps } from '../components/header/HeaderSection';
import { Header } from '../components/header/HeaderSection';
import { Divider } from '../components/Divider';
import { ImageGroups } from '../components/images/ImageGroups';
import type { ImageGroupProps } from '../components/images/ImageGroup';

export interface HomePageProps
  extends HeaderProps,
    Omit<ImageGroupProps, 'title'> {}

export function HomePage({
  // ImageCounter
  imageCount,
  setImageCount,
  fetchImageCount,

  // AuthorizationSection
  user,
  setUser,
  fetchUser,
  token,
  setToken,
  authorizeRequest,
  logoutRequest,

  // UploadSection
  addImages,
  removeImages,
  changeImageLoadingState,
  uploadImagesRequest,

  // ImageGroupsProps
  images,
  setEditorImageInfo,
  fetchMoreImages,
  deleteImageRequest,

  // Common
  requestErrorMiddleware,
  requestErrorsMiddleware,
}: HomePageProps): ReactElement {
  return (
    <>
      <Header
        addImages={addImages}
        authorizeRequest={authorizeRequest}
        changeImageLoadingState={changeImageLoadingState}
        fetchImageCount={fetchImageCount}
        fetchUser={fetchUser}
        imageCount={imageCount}
        logoutRequest={logoutRequest}
        removeImages={removeImages}
        requestErrorMiddleware={requestErrorMiddleware}
        requestErrorsMiddleware={requestErrorsMiddleware}
        setImageCount={setImageCount}
        setToken={setToken}
        setUser={setUser}
        token={token}
        uploadImagesRequest={uploadImagesRequest}
        user={user}
      />

      <Divider />

      <ImageGroups
        deleteImageRequest={deleteImageRequest}
        fetchMoreImages={fetchMoreImages}
        imageCount={imageCount}
        images={images}
        removeImages={removeImages}
        requestErrorMiddleware={requestErrorMiddleware}
        requestErrorsMiddleware={requestErrorsMiddleware}
        setEditorImageInfo={setEditorImageInfo}
        setImageCount={setImageCount}
        user={user}
      />
    </>
  );
}
