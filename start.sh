# !/bin/bash

fileName='pre-commit'
filePath=".git/hooks/$fileName"
cp pre-commit "$filePath"

chmod +x "$filePath"

docker start tcchelp_app_1 tcchelp_phpmyadmin_1 tcchelp_mysql_1 tcchelp_angular_1