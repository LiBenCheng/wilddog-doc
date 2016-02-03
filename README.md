# wilddog-doc

野狗文档项目

## Require
- Node.js >= 1.2


安装依赖
```
npm install
bower install
```

## Build

运行
```
gulp build
```
生成文件在 `dist` 目录

## deploy

部署目录： /data/www/z.wilddog.com/

启停脚本
```
#stop
NODE_ENV=production forever stop /data/www/z.wilddog.com/bin/www

#start
NODE_ENV=production forever start /data/www/z.wilddog.com/bin/www

#restart
NODE_ENV=production forever restart /data/www/z.wilddog.com/bin/www
```


## 文档书写规范


### 标题

一个页面最多出现四级标题，在markdown中分别对应的为#,##,###,####。h4标题下如果还有表示h5层级的，就用 **文本** 来表示。

应该按照内容的组织形式严格来使用h标签。一般的页面都是从##开始来书markdown,##与##之间要有来区隔开来;

其中：

* API页面标题是从H1开始写起

* quickstart页面的H2之间用\\ <br>来取代\\ <hr>

### 代码块


 
