# Udagram

## Github:
- https://github.com/mluc/udacity-cloud-developer
## Branches:
- udagram-master is the master branch
- udagram-dev is a dev branch to implement filteredimage endpoint
- udagram-dev-handle-file-not-found is a dev branch to handle invalid image url
## URLs:
- http://udagram-mluc-prod.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://udagram-mluc-dev.s3.amazonaws.com/hqUy9kw.jpg
- http://udagram-mluc-prod.us-east-1.elasticbeanstalk.com/filteredimage?image_url=https://timedotcom.files.wordpress.com/2019/03/kitten-report.jpg
## Deployment steps:
- eb init
```angular2
.elasticbeanstalk/config.yml
deploy:
  artifact: ./www/Archive.zip
```
- npm run build: to create Archive zip
- eb create
- eb deploy (to deploy changes)
