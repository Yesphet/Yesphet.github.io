---
layout: post
title: 源码安装ImageMagick
tag:
 ImageMagick
---


由于工作需求，一直有需要使用ImageMagick和FFmpeg等多媒体处理软件做一些简单的需求。这两个项目的依赖较多，且针对不同的需求，可能需要开启不同的功能，安装较为麻烦。因此在此做下一些相关安装的记录，避免之后的重复学习。

### Centos

#### 1、直接安装

```
yum install ImageMagick
```

很粗暴，但是由于yum源更新较慢，版本一般较低。所以不建议这种方式。

#### 2、源码安装

> 参考 [官网文档](https://www.imagemagick.org/script/install-source.php)

```
wget https://www.imagemagick.org/download/ImageMagick.tar.gz
tar xvzf ImageMagick.tar.gz
cd ImageMagick-7.0.7-28/
./configure --enable-hdri
make
sudo make install
sudo ldconfig /usr/local/lib
convert -version
```

建议采用这种姿势，可以比较自用的配置安装项。

### Mac OS X

#### 1、 brew安装

```
brew install imagemagick
```
也是简单粗暴，但brew源更新的速度就很快，一般都可以安装到近期的ImageMagick的版本。因此建议采用这种方式，省心。

```
brew info imagemagick
```
也可以通过`info`查看安装选项，灰常方便。

