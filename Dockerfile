# Get Golang
FROM golang:1.6.2

# Maintainer of the File
MAINTAINER Kayle Gishen <k@bkdsw.com>

# Install Curl for NodeJS
RUN apt-get install curl;

# Install graphics magick
RUN apt-get update;
RUN apt-get install -y graphicsmagick;

# Get the nodejs source
RUN curl -sL https://deb.nodesource.com/setup_6.x | bash -;

# Install nodejs
RUN apt-get install --yes nodejs

# Set the timezone (#RUN echo "UTC" > /etc/timezone)
RUN echo "America/New_York" > /etc/timezone; dpkg-reconfigure -f noninteractive tzdata

# Download bower and silica
RUN npm install -g bower silica
