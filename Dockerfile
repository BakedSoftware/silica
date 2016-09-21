# Get Golang
FROM golang:alpine

# Maintainer of the File
MAINTAINER Kayle Gishen <k@bkdsw.com>

RUN echo "http://dl-5.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories
RUN apk update

# Install Curl for NodeJS
RUN apk add nodejs;

# Install graphics magick
RUN apk add graphicsmagick;

# Download bower and silica
RUN npm install -g bower silica
