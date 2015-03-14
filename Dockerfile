# Dockerfile for redispapa
FROM ubuntu:latest

MAINTAINER sinchb128@gmail.com

# Update apt
RUN cp /etc/apt/sources.list /etc/apt/sources.list.backup
COPY sources.list /etc/apt/sources.list
RUN apt-get update

# Install python lib
RUN apt-get install -y --upgrade python-setuptools python-dev build-essential \
                && apt-get install -y --upgrade wget \
                && apt-get install -y unzip \
                && wget https://raw.github.com/pypa/pip/master/contrib/get-pip.py \
                && python get-pip.py \
                && rm -rf get-pip.py

# Download source file
RUN mkdir /root/redispapa
WORKDIR /root/redispapa

COPY ./ /root/redispapa/

# Install requirements
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["python2.7", "/root/redispapa/run.py"]
