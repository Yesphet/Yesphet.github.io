### 项目说明

* 项目使用`atlas-meta-iterator`来遍历存储服务所有资源的FileMeta，并统计每个bucket下的所有资源的总大小，之后上报到back-admin，再由back-admin转发到atlas-admin并写入atlas_meta.bucketrecord数据表中。
* `atlas-meta-iterator`是用go写的一个遍历工具，执行时需传递的参数有：

	```
	atlas-meta-iterator -config=$1 -script=./scripts/$2 -endscript=${endScript}
	```
	其中config为配置文件，script为对遍历的每条数据的执行脚本，endscript为统计完成之后的执行脚本。详细描述请参照下文。
	
* 统计完成之后可以再存储服务管理后台看到bucket-size统计的展示

### 项目构建地址

[http://jenkins.meitu-int.com/job/pl_storage/job/atlas-meta-iterator/](http://jenkins.meitu-int.com/job/pl_storage/job/atlas-meta-iterator/)

### 更新程序包
- 假设构建后上传到yum源的包名为 `atlas-admin-1.6.5-423.release.x86_64`
- `yumdownloader atlas-admin-1.6.5-423.release.x86_64`
- 安装命令： `rpm -i --force atlas-admin-1.6.5-423.release.x86_64.rpm --prefix=/www/tomcat7-admin-8082`

### 启动脚本

`/www/atlas-bucketsize-counter/bin/start.sh`

```bash
cd `dirname $0`
sh cleanup.sh
#因为有多个bucket,所以对于每个bucket都要执行一次遍历脚本
sh start1.sh setting-0.cfg count-size.js upload-size.js
sh start1.sh setting-1.cfg count-size.js upload-size.js
sh start1.sh setting-2.cfg count-size.js upload-size.js
sh start1.sh setting-3.cfg count-size.js upload-size.js
sh start1.sh setting-4.cfg count-size.js upload-size.js
```

### 配置文件

路径 `/www/atlas-bucketsize-counter/conf`

```
#统计所有bucket大小的测试配置文件

#因为期望能遍历非存储服务的表,所以单独一个LOOP数据库配置
[Loop]
#要扫描的元数据数据库，由于早期一些bucket是单独的atlas_meta_{bucketId}_{dbIndex}的数据库，所以对于这些单独的bucket都需要一些单独的配置文件
Connection= root:123456@tcp(localhost:3306)/atlas_meta_0_{dbIndex}
Sql= select id,data from file_meta_{tableIndex}
#StartId,EndId为要检查的id段
#全量检查的时候，StartId=9223372036854775807 EndId=0
#当只要检查某个时间段数据的时候，可通过设置StartId,EndId来限制，这两个配置项由atlas项目组提供
StartId=9223372036854775807       #本进程要处理的起始记录Id 可根据日期得出id
EndId=0            #本进程要处理的结束记录Id,可根据日期得出id
StartDBIndex=0 #需要修改，根据总部署机器数量设置;当前检查工具实例要检查的起始分库编号
EndDBIndex=31 #需要修改，根据总部署机器数量设置;当前检查工具实例要检查的截至分库编号
TableCount=128
CountPerFetch = 10000         #每次读取的记录数
IdFieldName=id              #Id字段名
#IdMapper,IdKeyMapper,FileKeyIndexMapper,FileMetaMapper,FileLocationMapper
RecordMapper=FileMetaMapper

[ConcurrencyExecutor]
Concurrency=50              #需要修改,具体可由atlas项目组提供；当前部署实例检查文件运行的任务数，配置的值以网卡带宽和单个文件平均大小为
参考，现在默认值为50
QueueSize=1000              #数据缓存队列的大小
ReadInterval=5000           #定时读取数据添加到队列的间隔时间，单位是ms

[JobFile]
IsRecordCursor=false             #是否需要记录游标及执行任务的id(记录游标可以在任务执行中断后继续执行,不记录则每次都是重新开始)
Dir=/tmp/jobs                  #文件的存储位置
JobFilePrefix=job_       #存校验任务执行完成的任务id
RecordsFilePrefix=invalid_records_   #存文件校验失败的记录
```

### script

`/www/atlas-bucketsize-counter/scripts/count-size.js`

```js
//根据BucketId计算每个bucket的总大小
//即根据每条数据，对该文件所在的bucket增加该文件的大小
function process(taskIndex, record){
    host.AtomicAdd(record.Meta.BucketId.toString(), record.Meta.ContentLength);
}
```

### endScript

`/www/atlas-bucketsize-counter/scripts/upload-size.js`

```js
//在统计完成之后，将统计结果上报
function process(taskIndex, record) {
    var date = new Date();
    var dateFormat = date.getFullYear();
    if (date.getMonth() < 10)
        dateFormat = dateFormat + "0"
    dateFormat += date.getMonth();
    if (date.getDate() < 10)
        dateFormat = dateFormat + "0"
    dateFormat += date.getDate();
    var bucketRecords = new Array();
    for (var key in record) {
        var bucketRecord = {};
        bucketRecord["bucketId"] = key;
        bucketRecord["size"] = record[key];
        bucketRecord["date"] = dateFormat;
        bucketRecords.push(bucketRecord);
    }
//将结果用json格式化，格式为{"bucketId1":"size1","bucketId2":"size2"...}
    var jsonStr = host.Apis["http"].WrapToKeyValue("bucketRecord", bucketRecords);
//将格式化后的内容用POST方法上报，http://localhost:19090/admin/bucketrecord/update为上报的的接口，可修改。
    var s = host.Apis["http"].Post("http://localhost:19090/admin/bucketrecord/update", "application/x-www-form-urlencoded", jsonStr)
    console.log("upload结果："+s);
}
```
