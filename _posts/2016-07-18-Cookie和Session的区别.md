---
layout: post
title: Cookie和Session的区别
tags:
  - Http
---

- cookie保存在客户端本地，session保存在服务器
- cookie的不安全性，可以通过修改本地的cookie进行cookie欺骗
- 当服务器的访问量很大的时候，session会占用较多的服务器性能
- 单个cookie保存的数据大小上限是4K

SessionID，用于服务器标识Session，服务器通过客户端发来的SessionID检索客户端对应的Session。SessionID一般放在Cookie中进行传递和保存。当Cookie被禁止时，还可以通过URL重写（将SessionID直接附加在URL地址后面），或者表单隐藏字段（服务器自动修改表单，添加一个隐藏字段，在表单提交时就能够把SessionID传递回服务器）来传递SessionID。