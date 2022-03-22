VPC_ID=$(aws cloudformation describe-stacks --stack-name rocketchat-infrastructure --query "Stacks[0].Outputs[?OutputKey=='VpcId'].OutputValue" --output text)
ECS_CLUSTER=$(aws cloudformation describe-stacks --stack-name rocketchat-infrastructure --query "Stacks[0].Outputs[?OutputKey=='ClusterName'].OutputValue" --output text)
LOADBALANCER_ARN=$(aws cloudformation describe-stacks --stack-name rocketchat-infrastructure --query "Stacks[0].Outputs[?OutputKey=='LoadbalancerId'].OutputValue" --output text)

aws cloudformation create-stack \
     --stack-name rocketchat-pipeline \
     --template-body file://cloudformation.yaml \
     --capabilities CAPABILITY_IAM \
     --parameters \
     ParameterKey=ExistingAwsVpc,ParameterValue=$VPC_ID \
     ParameterKey=ExistingEcsCluster,ParameterValue=$ECS_CLUSTER \
     ParameterKey=ExistingLoadbalancer,ParameterValue=$LOADBALANCER_ARN