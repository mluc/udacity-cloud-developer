export const config = {
  'dev': {
    'username': process.env.POSTGRESS_USERNAME,
    'password': process.env.POSTGRESS_PASSWORD,
    'database': process.env.POSTGRESS_DB,
    'host': process.env.POSTGRESS_HOST,
    'dialect': 'postgres',
    'aws_reigion': process.env.AWS_REGION,
    'aws_profile': process.env.AWS_PROFILE,
    'aws_media_bucket': process.env.AWS_BUCKET,
    'url': 'http://a5701791095804ba0a139b8b6c83cdc6-643514599.us-east-1.elb.amazonaws.com:8100'
  },
  'prod': {
    'username': process.env.POSTGRESS_USERNAME,
    'password': process.env.POSTGRESS_PASSWORD,
    'database': process.env.POSTGRESS_DB,
    'host': process.env.POSTGRESS_HOST,
    'dialect': 'postgres',
    'aws_reigion': process.env.AWS_REGION,
    'aws_profile': process.env.AWS_PROFILE,
    'aws_media_bucket': process.env.AWS_BUCKET,
    'url': 'http://a5701791095804ba0a139b8b6c83cdc6-643514599.us-east-1.elb.amazonaws.com:8100'
  },
  'jwt': {
    'secret': process.env.JWT_SECRET
  }

};
