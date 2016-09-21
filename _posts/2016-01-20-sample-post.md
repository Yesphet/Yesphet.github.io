---
layout: post
title: 上线说明
---


tlas-admin和back-admin的部署参照“后台上线说明” https://gitlab.meitu.com/pl_storage/atlas/wikis/%E5%90%8E%E5%8F%B0%E4%B8%8A%E7%BA%BF%E8%AF%B4%E6%98%8E

## 一、更新atlas-admin
### 1. 更新程序包
- yumdownloader atlas-admin-1.6.4-280.beta.x86_64
- 如果yum源下载不了，请手动下载（ http://jenkins.meitu-int.com/job/pl_storage/job/atlas/ws/pkg/atlas-admin-1.6.4-280.beta.x86_64.rpm ）
- 安装命令： rpm -i --force atlas-admin-1.6.4-280.beta.x86_64.rpm --prefix=/www/tomcat7-admin-8082

## 二、更新back-admin
### 2. 更新程序包
- yumdownloader back-admin-1.6.4-280.beta.x86_64
- 如果yum源下载不了，请手动下载（ http://jenkins.meitu-int.com/job/pl_storage/job/atlas/ws/pkg/back-admin-1.6.4-280.beta.x86_64.rpm ）
- 安装命令： rpm -i --force back-admin-1.6.4-280.beta.x86_64.rpm --prefix=/www/atlas-back-admin

## 三、 创建数据库

1. 在实际环境的atlas_meta数据库中建立bucketrecord数据表，创建语句如下

    ```
CREATE TABLE `bucket_size` (
  `id` bigint(22) NOT NULL,
  `bucket_id` bigint(22) NOT NULL,
  `date` bigint(8) NOT NULL,
  `size` bigint(31) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_bucketid_date` (`bucket_id`,`date`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8
```

## 四、部署atlas-bucket-counter

### 1. 安装程序包
- yumdownloader atlas-bucketsize-counter-1.0.1-36.beta.x86_64
- 如果yum源下载不了，请手动下载(http://jenkins.meitu-int.com/job/pl_storage/job/atlas-meta-iterator/ws/atlas-devops/atlas-meta-iterator/dist/atlas-bucketsize-counter-1.0.1-36.beta.x86_64.rpm)
- 安装命令：rpm -i --force atlas-bucketsize-counter-1.0.1-36.beta.x86_64.rpm --prefix=/www/atlas-bucketsize-counter


### 2. 调整配置文件
- 进入 /www/atlas-bucket-counter/conf 文件夹，根据需求修改配置文件setting-countsize.cfg。（之后会提供修改配置的脚本，直接执行即可）
- 其中主要修改
    ```
[LOOP]
Connection= root:123456@tcp(192.168.41.219:3306)/atlas_meta_0_{dbIndex}
```
修改其中的数据库连接串和用户名密码为实际环境数据库连接串和用户名密码

### 3. 执行脚本 
- 进入 /www/atlas-bucket-counter/bin 文件夹，执行start.sh脚本开始进行统计（每次统计前请先执行/www/atlas-bucket-counter/bin目录下的cleanup.sh清除logs和临时文件）

### 4. 查看日志
- 日志文件在 /www/atlas-bucket-counter/logs 目录下，其中
    - root_info.log 为扫表的记录，当任务执行完成后，日志的最后会打印出整个任务的执行状态
    - root_warn.log.xxxx 为警告日志
    - stderr.log 和 stdout.log为标准输出及标准错误日志

### 5. 查看任务进程号
- /www/atlas-bucket-counter/proc.pid 中记录了任务进程号


