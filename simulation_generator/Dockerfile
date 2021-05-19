FROM ubuntu

RUN apt-get update -y

# install packages
RUN apt-get install -y \
    wget \
    python3 \
    make \
    cmake \
    gcc \
    g++ \
    unzip \
    sudo \
    systemd \
    dos2unix \
    munge \
    slurm-wlm

# retrieve and install slim
RUN wget http://benhaller.com/slim/SLiM.zip
RUN unzip SLiM.zip \
    && mkdir /build 
WORKDIR /build
RUN cmake /SLiM \
    && make slim

# create symlink to slim
RUN ln -s /build/slim /usr/bin/slim
WORKDIR /

# add slum.conf and descartes script to container directory
ADD slurm.conf /etc/slurm-llnl
ADD descartes /scripts
WORKDIR /scripts

# convert batch_jobs.sh dos format to unix
RUN dos2unix batch_jobs.sh

# @TODO: Baseimage-docker so ./start.sh is run on start
CMD ["/bin/sh"]

# meta
LABEL version="0.1"
LABEL maintainer="James Bain"
LABEL email="jamescbain@gmail.com"