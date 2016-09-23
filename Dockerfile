# Get Golang
FROM golang:alpine

# Maintainer of the File
MAINTAINER Kayle Gishen <k@bkdsw.com>

RUN apk update

# Install Curl for NodeJS
RUN apk add nodejs;

# Install graphics magick
RUN apk add imagemagick;

# Download bower and silica
RUN npm install -g bower silica
