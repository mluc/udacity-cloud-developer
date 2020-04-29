export const config = {
  'dev': {
    'username': 'udagrammlucdev', // process.env.POSTGRESS_USERNAME,
    'password': '1234Qwer',
    'database': 'udagrammlucdev',
    'host': 'udagrammlucdev.csftjr7i8wz4.us-east-1.rds.amazonaws.com',
    'dialect': 'postgres',
    'aws_reigion': 'us-east-1',
    'aws_profile': 'default',
    'aws_media_bucket': 'udagram-mluc-dev',
    'url': 'http://localhost:8100'
  },
  'prod': {
    'username': '',
    'password': '',
    'database': 'udagram_prod',
    'host': '',
    'dialect': 'postgres'
  },
  'jwt': {
    'secret': 'project3'
  }

};
