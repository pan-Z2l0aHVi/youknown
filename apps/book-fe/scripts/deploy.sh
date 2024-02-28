cd /Users/bopan/AWS
# sudo scp -r -i pan.pem /Users/bopan/Code/frontend/youknown/apps/book-fe/dist/assets ubuntu@ec2-16-163-30-187.ap-east-1.compute.amazonaws.com:/home/ubuntu/configure/fe/book-fe/
# Exclude assets
sudo find /Users/bopan/Code/frontend/youknown/apps/book-fe/dist -maxdepth 1 -type f -exec sh -c 'scp -i pan.pem "$@" ubuntu@ec2-16-163-30-187.ap-east-1.compute.amazonaws.com:/home/ubuntu/configure/fe/book-fe/' sh {} +

border="====================================="
echo "$border"
echo "               部署完成"
echo "$border"