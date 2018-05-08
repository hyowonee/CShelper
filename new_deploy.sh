#!/bin/sh

ssh -tt deployer@pororot.com << 'DEPLOY'

cd /home/deployer/pororot_web
current=$(git describe --tags $(git rev-list --tags --max-count=1))
rand=$RANDOM
git pull
docker build -t pororot-webpage:$current .
docker stop $(docker ps -a -q)
docker run -v /home/deployer/pororot_web/web/:/usr/share/nginx/html/ -v /home/deployer/certs/nginx/pororot.com/:/cert/pororot.com/ -v /home/deployer/pororot.com/:/log/pororot.com/ --name pororot-container_$current_$rand -d -p 80:80 -p 443:443 pororot-webpage:$current

logout
DEPLOY
