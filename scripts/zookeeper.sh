docker ps -a | grep zookeeper > zookeeper-temp.txt
if [[ $(wc -l <zookeeper-temp.txt) -gt 0 ]]; then 
    docker ps -aqf "name=zookeeper" > zookeeper-temp.txt
    input=$(cat zookeeper-temp.txt)
    docker container restart $input
    rm zookeeper-temp.txt
else 
    docker run --name zookeeper -p 2181:2181 zookeeper
fi

