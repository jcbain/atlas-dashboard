FROM ubuntu

ENV DEBIAN_FRONTEND noninteractive

RUN apt-get update -y --fix-missing
RUN apt-get upgrade -y 

# install packages
RUN apt-get install -y \
    wget \
    python3 \
    libpq-dev \
    python3-pip \
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

RUN pip3 install sqlalchemy
RUN pip install psycopg2
RUN pip3 install pandas

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
ADD descartes /usr/src
WORKDIR /usr/src

# convert batch_jobs.sh dos format to unix
RUN dos2unix batch_jobs.sh

CMD ["/bin/sh", "./start.sh"]
# CMD ["/bin/sh"]

# meta
LABEL version="0.1"
LABEL maintainer="James Bain"
LABEL email="jamescbain@gmail.com"