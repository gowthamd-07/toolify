# Toolify - A Django Tools Website

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![Django](https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white)
![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white)

## Introduction
**"Toolify"** website provides a collection of useful online tools that can help improve productivity and simplify various tasks. From text and image editing to password generation and unit conversion, this website offers a range of simple yet powerful tools that can be accessed from any device with an internet connection.

## Table of Content
  * [Introduction](#introduction)
  * [Installation](#installation)
  * [Technologies Used](#technologies-used)
  * [Features](#features)
  * [Conclusion](#conclusion)

## Installation
1. Navigate to the directory:
```
cd toolsweb
```
2. Run the server:
```
docker-compose up -d
```
3. Open your web browser and go to http://localhost.
  
  
## Technologies used
1. HTML
2. CSS
3. JavaScript
4. Python

### Primary Modules used
1. Django==4.1.4
2. gunicorn==20.1.0
3. whitenoise==6.3.0
4. Pillow==9.4.0
5. pytube==12.1.2
6. qrcode==7.4.2
7. requests==2.28.2

## Features
1. Dark mode toggle for comfortable viewing
2. All tools are completely free to use, with no hidden fees or charges.
3. Easy to use interface with clear instructions for each tool.
4. Fast loading times for quick access to the tools.
5. User-friendly design with easy navigation and search functionality.

## Deployment

### K8s EKS Setup

## ALB Ingress Controller Setup
# Create IAM Policy
curl -o iam_policy_latest.json https://raw.githubusercontent.com/kubernetes-sigs/aws-load-balancer-controller/main/docs/install/iam_policy.json

# Create Service Account
eksctl create iamserviceaccount \
  --cluster=my_cluster \
  --namespace=kube-system \
  --name=aws-load-balancer-controller \
  --attach-policy-arn=arn:aws:iam::<account>:policy/AWSLoadBalancerControllerIAMPolicy \
  --override-existing-serviceaccounts \
  --approve

# Install ALB Ingress Controller
helm repo add eks https://aws.github.io/eks-charts
helm repo update
helm install aws-load-balancer-controller eks/aws-load-balancer-controller \
  -n kube-system \
  --set clusterName=<cluster-name> \
  --set serviceAccount.create=false \
  --set serviceAccount.name=aws-load-balancer-controller \
  --set region=<region-code> \
  --set vpcId=<vpc-xxxxxxxx> \
  --set image.repository=<account>.dkr.ecr.<region-code>.amazonaws.com/amazon/aws-load-balancer-controller


## Cluster Autoscaler Setup
# IAM Policy
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "autoscaling:DescribeAutoScalingGroups",
                "autoscaling:DescribeAutoScalingInstances",
                "autoscaling:DescribeLaunchConfigurations",
                "autoscaling:DescribeTags",
                "autoscaling:SetDesiredCapacity",
                "autoscaling:TerminateInstanceInAutoScalingGroup",
                "ec2:DescribeLaunchTemplateVersions"
            ],
            "Resource": "*"
        }
    ]
}

# Install Cluster Autoscaler
kubectl apply -f https://raw.githubusercontent.com/kubernetes/autoscaler/master/cluster-autoscaler/cloudprovider/aws/examples/cluster-autoscaler-autodiscover.yaml

# Update the command in Cluter Autoscaler
- ./cluster-autoscaler
- --v=4
- --stderrthreshold=info
- --cloud-provider=aws
- --aws-use-static-instance-list=true
- --skip-nodes-with-local-storage=false
- --expander=least-waste
- --balance-similar-node-groups
- --skip-nodes-with-system-pods=true
- --node-group-auto-discovery=asg:tag=k8s.io/cluster-autoscaler/enabled,k8s.io/cluster-autoscaler/<cluster-name>

## Istio Setup
# Install Istio
curl -L https://istio.io/downloadIstio | sh -
cd istio-<istio-version>
export PATH=$PWD/bin:$PATH
istioctl install --set profile=default -y

# Enable Istio for particullar namespace
kubectl create namespace <namespace-name>
kubectl label namespace <namespace-name> istio-injection=enabled

# ARGO CD Setup
kubectl create namespace argocd
kubectl apply -n argocd -f https://raw.githubusercontent.com/argoproj/argo-cd/stable/manifests/install.yaml
kubectl -n argocd get secret argocd-initial-admin-secret -o jsonpath="{.data.password}" | base64 --decode && echo
kubectl create namespace argo-rollouts
kubectl apply -n argo-rollouts -f https://github.com/argoproj/argo-rollouts/releases/latest/download/install.yaml
kubectl argo rollouts dashboard

## Jenkins Setup
https://medium.com/@harik8/jenkins-master-slave-on-k8s-c3543ed823d


## EBS CSI Driver
# IAM Policy
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "ec2:CreateVolume",
        "ec2:AttachVolume",
        "ec2:DetachVolume",
        "ec2:DeleteVolume",
        "ec2:CreateSnapshot",
        "ec2:DeleteSnapshot",
        "ec2:DescribeVolumes",
        "ec2:DescribeSnapshots",
        "ec2:DescribeInstances",
        "ec2:DescribeAvailabilityZones",
        "ec2:DescribeVolumeStatus",
        "ec2:DescribeVolumeAttribute",
        "ec2:DescribeSnapshotAttribute",
        "ec2:DescribeInstanceAttribute",
        "ec2:DescribeInstanceCreditSpecifications",
        "ec2:DescribeVolumeTypes",
        "ec2:DescribeVpcAttribute",
        "ec2:DescribeVpcEndpoints",
        "ec2:DescribeVpcs",
        "ec2:ModifyVolume",
        "ec2:ModifyVolumeAttribute",
        "ec2:ModifyInstanceAttribute"
      ],
      "Resource": "*"
    }
  ]
}

# Install EBS
helm repo add aws-ebs-csi-driver https://kubernetes-sigs.github.io/aws-ebs-csi-driver/
helm repo update
helm install aws-ebs-csi-driver aws-ebs-csi-driver/aws-ebs-csi-driver \
    --namespace kube-system \
    --set enableVolumeScheduling=true \
    --set enableVolumeResizing=true \
    --set enableVolumeSnapshot=true

# Storage Class yaml
apiVersion: storage.k8s.io/v1
kind: StorageClass
metadata:
  name: ebs-gp2
provisioner: ebs.csi.aws.com
parameters:
  type: gp2
reclaimPolicy: Delete
volumeBindingMode: WaitForFirstConsumer

# Persistent Volume Claim yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: demo-ebs-volume-claim
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: ebs-gp3
  resources:
    requests:
      storage: 10Gi

## Conclusion
This project is a web-based productivity tool website developed using Python, HTML, CSS, and JavaScript. It includes features such as a CSS Minifier, PNG to WebP convertor, a password generator and so on all designed to help users be more productive.
