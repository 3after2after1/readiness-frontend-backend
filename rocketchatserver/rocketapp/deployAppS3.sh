BUCKET_NAME=$(aws cloudformation describe-stacks --stack-name rocketchat-pipeline --query "Stacks[0].Outputs[?OutputKey=='S3BucketName'].OutputValue" --output text)

zip -r rocketchat-bundle.zip .
aws s3 cp rocketchat-bundle.zip s3://$BUCKET_NAME/rocketchat-bundle.zip