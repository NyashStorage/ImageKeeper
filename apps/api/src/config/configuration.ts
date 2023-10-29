import * as process from 'process';

export default () => ({
  // COMMON SETTINGS
  api_port: process.env.API_PORT,
  // JWT CREDENTIALS
  jwt_secret: process.env.JWT_SECRET,
  // AWS CREDENTIALS
  aws_region: process.env.AWS_REGION,
  aws_bucket_name: process.env.AWS_BUCKET_NAME,
  aws_access_key: process.env.AWS_ACCESS_KEY,
  aws_secret_key: process.env.AWS_SECRET_KEY,
  // LINKS
  frontend_url: process.env.FRONTEND_URL,
});
