docker ps -a | grep zookeeper > zookeeper-temp.txt
if [[ $(wc -l <zookeeper-temp.txt) -gt 0 ]]; then 
    docker start zookeeper
else 
    docker run --name zookeeper -p 2181:2181 zookeeper
fi

