import type { ReactElement } from 'react';
import { Stack } from '../Stack';
import type { ImageCounterProps } from '../images/ImageCounter';
import { ImageCounter } from '../images/ImageCounter';
import type { AuthorizationSectionProps } from '../AuthorizationSection';
import { AuthorizationSection } from '../AuthorizationSection';
import type { UploadSectionProps } from '../UploadSection';
import { UploadSection } from '../UploadSection';

export interface HeaderProps
  extends ImageCounterProps,
    AuthorizationSectionProps,
    UploadSectionProps {}

export function Header({
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

  // Common
  requestErrorMiddleware,
  requestErrorsMiddleware,
}: HeaderProps): ReactElement {
  return (
    <Stack
      BaseElement="header"
      className="container"
      sx={{ justifyContent: 'space-between' }}
    >
      <Stack
        sx={{
          flexDirection: 'column',
          gap: '0.875em',
        }}
      >
        <img
          alt="ImageKeeper logo"
          height="25"
          src="/logo.svg"
          style={{ borderRadius: 0 }}
          width="183"
        />

        <ImageCounter
          fetchImageCount={fetchImageCount}
          imageCount={imageCount}
          setImageCount={setImageCount}
        />
      </Stack>

      <Stack gap="0.875em">
        <AuthorizationSection
          authorizeRequest={authorizeRequest}
          fetchUser={fetchUser}
          logoutRequest={logoutRequest}
          requestErrorMiddleware={requestErrorMiddleware}
          requestErrorsMiddleware={requestErrorsMiddleware}
          setToken={setToken}
          setUser={setUser}
          token={token}
          user={user}
        />

        <UploadSection
          addImages={addImages}
          changeImageLoadingState={changeImageLoadingState}
          imageCount={imageCount}
          removeImages={removeImages}
          requestErrorMiddleware={requestErrorMiddleware}
          requestErrorsMiddleware={requestErrorsMiddleware}
          setImageCount={setImageCount}
          uploadImagesRequest={uploadImagesRequest}
          user={user}
        />
      </Stack>
    </Stack>
  );
}
