import process from 'process';
import { FileModel } from '../../files/models/file.model';

/**
 * Converts information about a file into a link to retrieve it.
 */
export const imageToLink = (file: FileModel) => {
  if (!file) return null;
  if (typeof file === 'string') return file;

  const cdn = process.env.IMAGE_CDN_URL;
  const { bucket, key } = file;

  return cdn
    ? `${cdn}/${key}`
    : `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};
