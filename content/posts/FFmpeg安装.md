---
title: "FFmpeg安装"
date: 2018-04-11T00:00:00+08:00
description: ""
categories: []
cover: ""
coverDescription: ""
draft: true
---


### 编译参数

```
export FF_BUILD=$HOME/ffmpeg3.4.1_build
export FF_INCLUDE=$FF_BUILD/include
export FF_LIB=$FF_BUILD/lib
export FF_BIN=$FF_BUILD/bin
export PATH=$FF_BIN:$PATH

```


### fdk_aac

```
cd /tmp/ffmpeg_source
git clone --depth 1 git://git.code.sf.net/p/opencore-amr/fdk-aac

cd fdk-aac
autoreconf -fiv
./configure --prefix="$FF_BUILD" --disable-shared
make && make install && make distclean
```

### libmp3lame

```
cd /tmp/ffmpeg_source
wget http://iweb.dl.sourceforge.net/project/lame/lame/3.99/lame-3.99.5.tar.gz
tar zxf lame-3.99.5.tar.gz

cd lame-3.99.5
./configure --prefix="$FF_BUILD" --bindir="$FF_BIN" --enable-shared --enable-nasm
make && make install && make distclean
```

### yasm

```
cd /tmp/ffmpeg_source
git clone --depth 1 git://github.com/yasm/yasm.git

cd yasm
autoreconf -fiv
./configure --prefix="$FF_BUILD" --bindir="$FF_BIN"
make && make install && make distclean
```

### nasm

```
cd /tmp/ffmpeg_source
wget http://www.nasm.us/pub/nasm/releasebuilds/2.13.01/nasm-2.13.01.tar.xz
tar xvfJ nasm-2.13.01.tar.xz

cd nasm-2.13.01
./configure --prefix="$FF_BUILD" --bindir="$FF_BIN"
make && make install && make distclean
```


### x264

```
cd /tmp/ffmpeg_source
git clone --depth 1 git://git.videolan.org/x264

cd x264
./configure --prefix="$FF_BUILD" --bindir="$FF_BIN" --enable-static
make && make install && make distclean
```

### x265

```
cd /tmp/ffmpeg_source
hg clone https://bitbucket.org/multicoreware/x265

cd x265/build/linux
cmake -G "Unix Makefiles" -DCMAKE_INSTALL_PREFIX="$FF_BUILD" -DENABLE_SHARED:bool=off ../../source
make && make install 
```

### opus

```
cd /tmp/ffmpeg_source
git clone git://git.opus-codec.org/opus.git
cd opus
autoreconf -fiv
./configure --prefix="$FF_BUILD" --disable-shared
make && make install && make distclean
```

### libogg

```
cd /tmp/ffmpeg_source
wget http://downloads.xiph.org/releases/ogg/libogg-1.3.2.tar.gz
tar xvzf libogg-1.3.2
./configure --prefix="$FF_BUILD" --disable-shared
make && make install && make distclean
```

### libvorbis

```
cd /tmp/ffmpeg_source
wget http://downloads.xiph.org/releases/vorbis/libvorbis-1.3.4.tar.gz
tar xzvf libvorbis-1.3.4.tar.gz

cd libvorbis-1.3.4
LDFLAGS="-L$FF_LIB" CPPFLAGS="-I$FF_INCLUDE" ./configure --prefix="$FF_BUILD" --with-ogg="$FF_BUILD" --disable-shared
make && make install && make distclean
```

### libvpx

```
cd /tmp/ffmpeg_source
git clone --depth 1 https://chromium.googlesource.com/webm/libvpx

cd libvpx
./configure --prefix="$FF_BUILD" --enable-examples --as=yasm
make && make install && make clean
```

### fribidi

```
cd /tmp/ffmpeg_source
wget https://github.com/fribidi/fribidi/releases/download/v1.0.4/fribidi-1.0.4.tar.bz2
tar xvjf fribidi-1.0.4.tar.bz2
cd fribidi-1.0.4
./configure --prefix=$FF_BUILD
make && make install
```

### libass

```
cd /tmp/ffmpeg_source
wget https://github.com/libass/libass/releases/download/0.14.0/libass-0.14.0.tar.xz
xz -d libass-0.14.0.tar.xz
tar -xvf libass-0.14.0.tar
cd libass-0.14.0
PKG_CONFIG_PATH=$FF_LIB/pkgconfig ./configure --prefix=$FF_BUILD --disable-static
make && make install

```


### ffmpeg

```
cd /tmp/ffmpeg_source/ffmpeg
PKG_CONFIG_PATH=$FF_LIB/pkgconfig ./configure --prefix=$FF_BUILD --extra-cflags=-I$FF_INCLUDE --extra-ldflags=-L$FF_LIB --bindir=$FF_BIN --extra-libs=-lpthread --pkg-config-flags="--static" --enable-gpl --enable-nonfree --enable-libfdk-aac --enable-libfreetype --enable-libmp3lame --enable-libopus --enable-libvorbis --enable-libvpx --enable-libx264 --enable-libx265 --enable-pthreads --enable-libass

make && make install
```

### Questions

> 出现 `error while loading shared libraries: libfdk-aac.so.1: cannot open shared object file: No such file or directory`

解决办法 `export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:$FF_LIB`