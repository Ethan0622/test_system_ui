# 后端开发

[[toc]]

## 概述

项目名称：**test_system**

开源地址 [GitHub](https://github.com/Ethan0622/test_system)

本项目是基于 [Django 3.2](https://docs.djangoproject.com/zh-hans/3.2/) 构建的，因此熟悉 Python 语言的基本语法，掌握 Django 对于理解和学习本项目异常重要。
除此之外，你还需要了解 [Django REST framework](https://www.django-rest-framework.org/) 的基础内容及使用方法，这是一个强大的 Django 扩展工具包，
能帮助你更快速地开发后台，生成 Restful 接口。

得益于 Django 的对象关系映射 (Object Relational Mapping，简称 ORM)，本项目并不限制数据库，开发者可采用自己熟悉的数据库进行开发。这里推荐使用关系型数据库[MySQL](https://www.mysql.com/cn/)

## 项目启动

首次将项目下载到本地时，请先进行数据库配置并迁移应用数据表：

```
python manage.py migrate
```

通过以下命令启动本地 Web 服务器（端口自定，以 8000 为例）：

```
python manage.py runserver 127.0.0.1:8000
```

第一次启动会因缺少各种第三方库而失败，请根据报错信息，依次安装项目依赖的各种库

```
pip install [第三方库]
```

推荐新建一个 python 的虚拟环境，将本项目所需的第三方库装在这个虚拟环境中。

目前本项目所需的第三方库主要是：

```shell
Package                 Version
----------------------- ---------
Django                  3.2.7
django-cors-headers     3.8.0
djangorestframework     3.12.4
djangorestframework-jwt 1.11.0
drf-yasg                1.20.0
catsim                  0.17.1
numpy                   1.21.2
xlrd                    1.2.0
pip                     21.2.4
```

## 项目部署

本项目只是一个网站后台，提供数据处理、存储等功能，前端页面可以自行制作或查看已有的[前端项目](./front-end.md)。

### 生产环境部署

生产环境将不使用 Django 自带的 Web 服务器（性能不足），现有很多高性能的 Web 服务器供选择，部署方案多种多样。

本项目采用 uWSGI 作为 Web 服务器，配合 Nginx 托管静态文件，具体的部署架构如下：

```
the web client <-> nginx <-> the socket <-> uwsgi <-> Django
```

## 重要依赖

本项目重度依赖以下第三方库，这意味着开始为本项目贡献代码之前，你至少需要**对所有这些第三方库有所了解**。

### 框架

项目使用了 [Django 3.2](https://docs.djangoproject.com/zh-hans/3.2/) 框架，配合 [Django REST framework](https://www.django-rest-framework.org/) 插件进行开发。

### 身份认证

使用了 [djangorestframework-jwt](https://jpadilla.github.io/django-rest-framework-jwt/) 实现 JSON 网络令牌认证，利用 Token 实现身份认证。

### 数据处理

项目涉及自适应测试，需要进行大量数据计算，涉及复杂的逻辑算法，[catsim](https://douglasrizzo.com.br/catsim/introduction.html)提供齐全的自适应测试算法，利用该第三方库提供的各种函数实现了自适应抽题、估算能力值。

利用[xlrd](https://xlrd.readthedocs.io/en/latest/index.html)对用户上传的Excel文件进行读取并处理数据。

### 跨域处理

前后端分离涉及跨域，项目采用[django-cors-headers](https://pypi.org/project/django-cors-headers/2.0.1/)解决跨域问题。

## 理解项目结构

项目结构及其作用如下所示：

```shell
├─ test_system/         # 项目配置文件夹
│   ├─ __pycache__/     # 编译字节码文件，可忽略
│   ├─ migrations/      # 数据库迁移更改文件
│   ├─ asgi.py
│   ├─ dev_setting.py   # 开发环境部分配置
│   ├─ prd_setting.py   # 生产环境部分配置
│   ├─ settings.py      # 配置文件
│   ├─ urls.py          # 路由定义文件
│   ├─ wsgi.py
│   └─
├─ testing              # 一个Django App应用文件夹，处理考试的相关操作
│   ├─ __pycache__/
│   ├─ migrations/
│   ├─ admin.py           # 定义在后台admin中管理的内容
│   ├─ apps.py
│   ├─ models.py          # 定义模型
│   ├─ serializers.py     # 定义序列器
│   ├─ tests.py  
│   ├─ urls.py            # 定义子路由
│   ├─ utils.py           # 辅助函数
│   ├─ views.py           # 定义http请求业务处理函数
│   └─ __init__.py
├─ static/              # 项目的一些静态文件
│   ├─ admin/             # 后台页面
│   ├─ drf-yasg/          # swagger接口页面
│   └─ rest_framework/    # drf页面
├─ users/               # 处理用户的相关操作
│   ├─ __pycache__/
│   ├─ migrations/
│   └─ ...
├─ itembank/            # 处理试题库的相关操作
│   ├─ __pycache__/
│   ├─ migrations/
│   └─ ...
├─ classes/             # 处理班级的相关操作
│   ├─ __pycache__/
│   ├─ migrations/
│   └─ ...
├─ manage.py
└─ uwsgi.ini            # uWSGI配置文件
```

## Restful接口
若你还不熟悉什么是Restful接口，请[点击这里](https://baike.baidu.com/item/RESTful/4406165)

目前本项目已有30多个接口，具体请看[接口文档](http://121.40.84.189:3001/swagger/)

接口文档可在线进行测试，认证时请在Token前加上`Bearer+空格`，如：

```
Bearer [Token]
```