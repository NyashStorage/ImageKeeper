'use client';
import 'ui/src/assets/styles/styles.scss';

import type { ReactElement } from 'react';
import { EditorModal, EmptyPage, HomePage, NotificationsSection } from 'ui';
import { useImageStore } from '../src/store/image.store';
import {
  deleteImage,
  getImageCount,
  getMoreImages,
  updateImage,
  uploadImages,
} from '../src/services/image.service';
import { useAuthStore } from '../src/store/auth.store';
import { authorize, getUser, logout } from '../src/services/user.service';
import { useNotificationStore } from '../src/store/notification.store';
import { useEditorStore } from '../src/store/editor.store';
import {
  requestErrorMiddleware,
  requestErrorsMiddleware,
} from '../src/utils/helpers/request.helpers';

/*
  It could have been done better here, without so many parameters,
  better separated into server and client components,
  but test task turned out to be very extensive as it is, so I'll omit that.
 */

export default function Page(): ReactElement {
  const { user, token } = useAuthStore();
  const { count, images } = useImageStore();
  const { notifications } = useNotificationStore();
  const { imageId, imageUrl, imageTitle } = useEditorStore();

  return (
    <>
      <HomePage
        addImages={useImageStore.getState().addImages}
        authorizeRequest={authorize}
        changeImageLoadingState={useImageStore.getState().changeLoadingState}
        deleteImageRequest={deleteImage}
        fetchImageCount={getImageCount}
        fetchMoreImages={getMoreImages}
        fetchUser={getUser}
        imageCount={count}
        images={images}
        logoutRequest={logout}
        removeImages={useImageStore.getState().removeImages}
        requestErrorMiddleware={requestErrorMiddleware}
        requestErrorsMiddleware={requestErrorsMiddleware}
        setEditorImageInfo={useEditorStore.getState().setImageInfo}
        setImageCount={useImageStore.getState().setCount}
        setToken={useAuthStore.getState().setToken}
        setUser={useAuthStore.getState().setUser}
        token={token}
        uploadImagesRequest={uploadImages}
        user={user}
      />

      {count === 0 && (
        <EmptyPage
          addImages={useImageStore.getState().addImages}
          authorizeRequest={authorize}
          changeImageLoadingState={useImageStore.getState().changeLoadingState}
          fetchUser={getUser}
          imageCount={count}
          logoutRequest={logout}
          removeImages={useImageStore.getState().removeImages}
          requestErrorMiddleware={requestErrorMiddleware}
          requestErrorsMiddleware={requestErrorsMiddleware}
          setImageCount={useImageStore.getState().setCount}
          setToken={useAuthStore.getState().setToken}
          setUser={useAuthStore.getState().setUser}
          token={token}
          uploadImagesRequest={uploadImages}
          user={user}
        />
      )}

      <NotificationsSection
        notifications={notifications}
        removeNotification={useNotificationStore.getState().removeNotification}
      />

      <EditorModal
        changeImageTitle={useImageStore.getState().setTitle}
        imageId={imageId}
        imageTitle={imageTitle}
        imageUrl={imageUrl}
        requestErrorMiddleware={requestErrorMiddleware}
        requestErrorsMiddleware={requestErrorsMiddleware}
        setEditorImageInfo={useEditorStore.getState().setImageInfo}
        updateImageRequest={updateImage}
      />
    </>
  );
}
