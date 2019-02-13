---
title: "Put和Post的区别"
date: 2016-07-15T00:00:00+08:00
description: ""
categories: []
cover: ""
coverDescription: ""
draft: true
---

- 首先，两者都能实现更新资源的功能。

- 区别：

	- Post不是幂等（idempotent）的

		对于一个接口，每次提交相同的动作，其产生的结果是不一致的，则使用post。比如一个减少100余额的接口，调用一次减少100，调用两次减少200，则使用Post。
	- Put是幂等的
	
   		对于一个接口，每次提交相同的动作，其产生的结果一致，则使用put。比如一个修改文件名的接口，只要提交的文件名相同，调用多少次都产生相同的结果，则使用put。
Html4.0只支持post和get，所以使用post去完成put和delete的操作。因此针对PC端一般考虑post和get请求。
但在支持html5的客户端则需要考虑post,get,put和delete