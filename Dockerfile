FROM centos:centos7.6.1810

ARG VERSION="v0.0.1"

LABEL Description="redispapa sqlite3 version by calmkart" Vendor="calmkart@calmkart.com" Version="${VERSION}"

RUN mkdir /root/.pip

COPY pip.conf /root/.pip/pip.conf
COPY CentOS-Base.repo /etc/yum.repos.d/
COPY ./ /root/redispapa

WORKDIR /root/redispapa

RUN yum makecache \
    && yum install epel-release -y \
    && yum install -y python2-pip.noarch \
    && yum install -y python-devel gcc \
    && pip install -r /root/redispapa/requirements.txt

EXPOSE 5000

CMD sh -c "python run.py"
