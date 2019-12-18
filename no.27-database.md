# sql不识别大小写
# /usr/local/mysql/bin/mysql
# /usr/local/mysql/bin/mysql -u root -p 这就是个客户端去连接mysql,用命令行的客户端；我们可以用nodejs去做一下客户端，尝试连接这个数据库；
# show databases;
# create database toutiao;
# show databases;
# use toutiao;
# show tables;
# create table User (
#     id int(24) PRIMARY KEY auto_increment unique,
#     username varchar(50) unique,
#     password varchar(50),
#     avatar varchar(50)
# );
# show tables;
# select * from User;
# insert into User (id, username, password, avatar) values (0, 'jessie', 'jessie1024', '');
# select * from User;
# mysql这个数据库本身也是启了一个服务；