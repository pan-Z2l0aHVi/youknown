#!/bin/bash

# 查找并删除当前目录及其子目录中的所有 node_modules 目录
find . -name "node_modules" -type d -prune -exec rm -rf '{}' +

echo "All node_modules directories have been deleted."