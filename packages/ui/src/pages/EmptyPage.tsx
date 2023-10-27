import type { ReactElement } from 'react';
import { Stack } from '../components/Stack';
import { Typography } from '../components/Typography';
import type { AuthorizationSectionProps } from '../components/AuthorizationSection';
import { AuthorizationSection } from '../components/AuthorizationSection';
import type { UploadSectionProps } from '../components/UploadSection';
import { UploadSection } from '../components/UploadSection';

export interface EmptyPageProps
  extends AuthorizationSectionProps,
    UploadSectionProps {}

export function EmptyPage({
  // AuthorizationSection
  user,
  setUser,
  fetchUser,
  token,
  setToken,
  authorizeRequest,
  logoutRequest,
  imageCount,

  // UploadSection
  addImages,
  removeImages,
  changeImageLoadingState,
  uploadImagesRequest,
  setImageCount,

  // Common
  requestErrorMiddleware,
  requestErrorsMiddleware,
}: EmptyPageProps): ReactElement {
  return (
    <aside className="modal" id="empty-modal">
      <Stack
        className="container"
        direction="column"
        gap="3.75em"
        sx={{
          margin: 'auto',
          alignItems: 'center',
        }}
      >
        <img
          alt="ImageKeeper logo"
          height="25"
          src="/logo.svg"
          style={{ borderRadius: 0 }}
          width="183"
        />

        <Stack
          direction="column"
          gap="2em"
          sx={{
            alignItems: 'center',
          }}
        >
          <Stack
            direction="column"
            gap="1em"
            sx={{
              alignItems: 'center',
            }}
          >
            <Typography className="primary-400" textAlign="center" variant="h1">
              No images uploaded yet
            </Typography>

            <Typography
              className="container primary-300"
              textAlign="center"
              variant="default"
            >
              Upload your first image by drag and dropping the file on the
              screen or click the button below
            </Typography>
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
      </Stack>
    </aside>
  );
}
