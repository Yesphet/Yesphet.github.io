---
title: "Shell下批量导入导出数据库"
date: 2016-08-24T00:00:00+08:00
description: ""
categories: []
cover: ""
coverDescription: ""
draft: true
---


> 带`mysql>`前缀的命令为mysql命令


1. 导出所有库

	`mysqldump -uusername -ppassword --all-databases > all.sql`

2. 导入所有库

	`mysql>source all.sql;`

3. 导出某些库

	`mysqldump -uusername -ppassword --databases db1 db2 > db1db2.sql`

4. 导入某些库

	`mysql>source db1db2.sql;`

5. 导入某个库

	```
	mysql -uusername -ppassword db1 < db1.sql;
	```
	或
	
	```
	mysql>source db1.sql;
	```
6. 导出某些数据表

	```
	mysqldump -uusername -ppassword db1 table1 table2 > tb1tb2.sql
	```

7. 导入某些数据表

	```
	mysql -uusername -ppassword db1 < tb1tb2.sql
	```
	或
	
	```
	mysql>
	use db1;
	source tb1tb2.sql;
	```
	
8. 只导表结构

	```
	mysqldump --opt -d -uusername -ppassword db1 table1 table2 > tb1tb2.sql
	```