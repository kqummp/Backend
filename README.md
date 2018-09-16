# 预约系统

## 需求

### 教师端

* 设置预约时间段可用性
* 反馈学生预约结果(通过、驳回+原因)

### 学生端

* 对可用的时间段进行预约
* 填写预约信息(原因、信息、备注)
* 得到预约结果反馈(通过、驳回+原因)

## 模块

### 学生用户管理模块

* 登陆
* 初始密码修改

### 教师用户管理模块

* 登陆、注册
* 密码修改

### 学生预约请求模块

* 提交预约请求
* 预约结果通知

### 教师预约管理模块

* 提交可用预约时间段
* 处理学生预约结果

## 技术细节

* 后端框架：Express(Node.js)
* 前端框架：Vue(暂定)
* 数据库：MongoDB
* 缓存器：Redis
* 部署：Docker
* 静态分发：Nginx
* 负载均衡：Nginx
