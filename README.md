![gruntmate_logo](http://github.com/floydcash/gruntmate/raw/master/src/img/logo.png)
=========

##GruntMate是什么？
基于node-webkit编写开发的，采用html+css实现界面，js+nodejs实现逻辑，可视化管理Grunt的前端项目
###### [Automated English Translation](http://translate.google.com/translate?sl=auto&tl=en&js=n&prev=_t&hl=en&ie=UTF-8&u=https%3A%2F%2Fgithub.com%2Ffloydcash%2Fgruntmate) (May require Chrome)

![gruntmate_shot](http://github.com/floydcash/gruntmate/raw/master/screen_shot/v1.03.png)

##GruntMate有哪些功能？
* 方便的管理基于Grunt的项目
* 方便统一管理Grunt插件
* 提供可视化启动、停止Grunt项目
* 监听Gruntfile.js文件变化，自动重启Grunt任务
* uglifyjs的压缩/美化
* 图片转base64
* 雪碧图合并功能
 
##目前只支持window版，未来会支持mac版。

##下载 [window版](https://drive.google.com/folderview?id=0ByEo1SqhRK7yWkQ4M0l5TWdKbXM&usp=sharing)
 
##window版使用：
1.  需要在nodejs环境中运行（跑grunt需要）
2.  需要在软件同级目录下的node_modules目录，将grunt需要用到的插件放在这里
3.  程序左上角的+号是新建项目
4.  选中项目，点击启动

##编译说明
* 需要用node-webkit的编译
* 需要电脑安装nodejs环境


##更新说明：
###12-04:
1.  优化grunt的log显示逻辑
2.  去掉compass项目支持

###12-03：
1.  修复使用全局插件模式下，引用了局部插件（例如datauri），找不到的问题
2.  添加一个“修复”按钮，按钮作用为项目的Gruntfile.js增加修复代码，主要逻辑还是在软件中（无引用局部插件，可不使用）

###11-19：
1.  添加全局插件与局部插件，新建项目时候，选择全局插件则使用软件当前目录下的node_modules下的插件，局部则为项目中的node_modules。
