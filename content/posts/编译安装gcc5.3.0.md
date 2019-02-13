---
title: "编译安装gcc5.3"
date: 2018-5-22T00:00:00+08:00
description: ""
categories: []
cover: ""
coverDescription: ""
draft: true
---

### 安装命令

```bash
## 准备安装到的目录
export GCC5.3.0_BASE=/usr/local/gcc5.3.0


## install gmp4.3.2
wget ftp://gcc.gnu.org/pub/gcc/infrastructure/gmp-4.3.2.tar.bz2
tar jxvf gmp-4.3.2.tar.bz2
cd gmp-4.3.2
./configure --prefix=$GCC5.3.0_BASE
make && make install


## install mptr
wget ftp://gcc.gnu.org/pub/gcc/infrastructure/mpfr-2.4.2.tar.bz2
tar jxvf mpfr-2.4.2.tar.bz2
cd mpfr-2.4.2
./configure --prefix=$GCC5.3.0_BASE --with-gmp=$GCC5.3.0_BASE
make && make install


## install 
wget ftp://gcc.gnu.org/pub/gcc/infrastructure/mpc-0.8.1.tar.gz
tar xvzf mpc-0.8.1.tar.gz
cd mpc-0.8.1
./configure  --prefix=$GCC5.3.0_BASE --with-gmp=$GCC5.3.0_BASE --with-mpfr=$GCC5.3.0_BASE
make && make install


## install gcc5.3.0
wget http://ftp.gnu.org/gnu/gcc/gcc-5.3.0/gcc-5.3.0.tar.gz
tar xvzf gcc-5.3.0.tar.gz
cd gcc-5.3.0
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$GCC5.3.0_BASE/lib
./configure --prefix=$GCC5.3.0_BASE --with-gmp=$GCC5.3.0_BASE --with-mpfr=$GCC5.3.0_BASE --with-mpc=$GCC5.3.0_BASE -enable-threads=posix -disable-checking -disable-multilib -enable-languages=c,c++
make && make install

```

### 一键安装脚本

```bash
#!/usr/bin/env bash

cd /tmp
wget http://atlas-test.zone1.meitudata.com/gcc5.3.0.tar.gz
tar xvzf gcc5.3.0.tar.gz

cd gcc5.3.0
sh install.sh

rm -rf /tmp/gcc5.3.0*
```