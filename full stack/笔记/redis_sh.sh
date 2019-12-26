#!/usr/bin/env bash

#在集群节点上执行
root='/etc/redis';

if [ ! $1 ]
then
  echo 'command:' $0 '[cmd] [port]'
  exit
fi

cmd=$1;
port=$2;

conf_file=$root/$port/redis.conf;

if [ $cmd == 'init' ]
then
  if [ ! $2 ]
  then
    echo 'command:' $0 'init [port]'
    exit
  fi

  #
  rm -rf $root/$port;
  mkdir -p $root/$port;

  # create the conf
  echo port $port >> $conf_file;
  echo 'protected-mode no' >> $conf_file;
  echo 'cluster-enabled yes' >> $conf_file;
  echo 'cluster-config-file nodes.conf' >> $conf_file;
  echo 'cluster-node-timeout 5000' >> $conf_file;
  echo 'appendonly yes' >> $conf_file;

  echo 'init redis server @'$port 'success';

elif [ $cmd == 'start' ]
then
  if [ ! $2 ]
  then
    echo 'command:' $0 'start [port]'
    exit
  fi

  # set pwd 
  cd $root/$port/

  # start server
  redis-server $conf_file 2>error.log 1>output.log & echo server @$port started;

  # firewall
  firewall-cmd --add-port=$port/tcp --permanent 2>1 > /dev/null;
  firewall-cmd --add-port=$((port+10000))/tcp --permanent 2>1 > /dev/null;
  firewall-cmd --reload 2>1 > /dev/null;

elif [ $cmd == 'stopall' ]
then
  # kill all redis-server
  pkill -e redis-server

else
  echo no this command: $1

fi
