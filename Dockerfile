# Get Golang
FROM golang:alpine

# Maintainer of the File
MAINTAINER Kayle Gishen <k@bkdsw.com>

RUN apk update;
# Install NodeJS and Git
RUN apk add openjdk8-jre nodejs git;

# Download bower and silica
RUN npm install -g bower silica
