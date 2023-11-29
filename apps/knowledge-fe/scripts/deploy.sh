cd /Users/bopan/AWS
sudo scp -r -i pan.pem /Users/bopan/Code/frontend/youknown/apps/knowledge-fe/dist/index.html ubuntu@ec2-16-163-30-187.ap-east-1.compute.amazonaws.com:/home/ubuntu/configure/fe/knowledge-fe

border="====================================="
echo "$border"
echo "               部署完成"
echo "$border"