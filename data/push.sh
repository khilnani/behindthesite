#!/bin/sh -x

git pull
./download.py
git commit -am "updated json"
git push

