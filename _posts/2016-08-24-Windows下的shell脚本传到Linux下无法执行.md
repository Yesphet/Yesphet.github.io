---
layout: post
title: Windows下的shell脚本传到Linux下无法执行
tag:
 - Linux
---

原因：windos下的.sh文件格式为dos格式。而linux只能执行格式为unix格式的脚本
解决办法：

- 用vi或vim打开文件
- 执行set ff指令查看文件的格式，应该为fileformat=dos
- 修改format为unix。执行set ff=unix或 set fileformat=unix
- wq保存退出