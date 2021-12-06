参考教程 ：https://www.cnblogs.com/watchslowly/p/11309052.html

> 注意 需要全新的虚拟机环境 否则极有可能由于某些冲突造成安装失败

**sentry**
> 预备 ： https://static.zhufengpeixun.com/sentry2020-09-20_20211112104628.mp4
> https://gitee.com/speedly_admin/zhufeng_sentry_20211112

**1、 设置仓库**
> 安装所需的软件包。yum-utils 提供了 yum-config-manager ，并且 device mapper 存储驱动程序需要 device-mapper-persistent-data 和 lvm2

> yum install -y yum-utils   device-mapper-persistent-data   lvm2

**2、设置仓库地址**

> 使用官方源地址（比较慢）

> yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo
>

> 可以选择国内的一些源地址： 阿里云

> yum-config-manager --add-repo http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo


>
**3、安装最新版本的 Docker Engine-Community 和 container**

> yum install docker-ce docker-ce-cli containerd.io -y
>
> 如果提示您接受 GPG 密钥，请选是。 Docker 安装完默认未启动。并且已经创建好 docker 用户组，但该用户组下没有用户。

> ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

**4、启动**

> systemctl start docker
>
> systemctl enable docker

**5、查看**
> docker version

> docker info

**6、卸载**

删除安装包：

> yum remove docker-ce

> 删除镜像、容器、配置文件等内容：

> rm -rf /var/lib/docker
>
>

> 改为网易镜像
>
> vim /etc/docker/daemon.json

> 内容为
> {
> "registry-mirrors": ["http://hub-mirror.c.163.com"]
> }
>
>重启服务 systemctl restart docker.service


**compose 安装 管理容器**

Linux 最新发行的版本地址：https://github.com/docker/compose/releases。

运行以下命令以下载 Docker Compose 的当前稳定版本：

> sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose


要安装其他版本的 Compose，请替换 1.29.1。

将可执行权限应用于二进制文件：

> chmod +x /usr/local/bin/docker-compose

创建软链：

> ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

测试是否安装成功：

> docker-compose --version

docker-compose version 1.24.1, build 4667896b

> docker-compose up 开启
>
>docker-compose down 关闭



***sentry 安装***

> 注意邮箱配置时候的密码是授权码
>
> yum文件的格式十分重要，空格严格对齐
>


docker ps # list containers

docker inspect 276f29df07b1 --format='{{json .State.Health}}'

docker-compose logs -f --tail=10 服务名

docker logs 服务名/container id



