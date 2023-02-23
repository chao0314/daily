#!/usr/bin/env bash

#在主控节点执行
if [ ! $1 ]
then
  echo 'command:' $0 '[cmd]'
  exit
fi

cmd=$1;

if [ $cmd == 'initall' ]
then
  for item in `cat server_list.txt`
  do
    echo init $item;
    scp redis_sh.sh root@$item:/root/;

    ssh root@$item '/root/redis_sh.sh init 7000';
    ssh root@$item '/root/redis_sh.sh init 7001';
  done

elif [ $cmd == 'startall' ]
then
  for item in `cat server_list.txt`
  do
    echo start $item;

    ssh root@$item '/root/redis_sh.sh start 7000';
    ssh root@$item '/root/redis_sh.sh start 7001';
  done

elif [ $cmd == 'ps' ]
then
  for item in `cat server_list.txt`
  do
    echo $item;

    ssh root@$item 'ps -ef | grep [r]edis';
  done


elif [ $cmd == 'stopall' ]
then
  for item in `cat server_list.txt`
  do
    echo stopall $item;

    ssh root@$item '/root/redis_sh.sh stopall';
  done

elif [ $cmd == 'createall' ]
then
  servers=''

  for item in `cat server_list.txt`
  do
    servers+=$item:7000' ';
    servers+=$item:7001' ';
  done

  redis-cli --cluster create $servers --cluster-replicas 1

elif [ $cmd == 'restartall' ]
then
  $0 stopall
  $0 startall

else
  echo no this command: $1

fi
