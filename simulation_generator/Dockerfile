FROM ubuntu

RUN apt-get update -y
# install packages
RUN apt-get install -y \
    wget make cmake gcc g++ unzip

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

# install python3.x
RUN apt-get install -y python3
WORKDIR /

# add descartes script to container directory
ADD descartes /scripts
WORKDIR /scripts

CMD ["python"]

# meta 
LABEL version="0.1"
LABEL maintainer="James Bain"
LABEL email="jamescbain@gmail.com"