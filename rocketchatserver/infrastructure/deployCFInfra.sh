aws cloudformation create-stack \
    --stack-name rocketchat-infrastructure \
    --template-body file://cloudformation.yaml \
    --capabilities CAPABILITY_IAM