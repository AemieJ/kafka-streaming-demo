docker ps -a | grep kafka > kafka-temp.txt
if [[ $(wc -l <kafka-temp.txt) -gt 0 ]]; then
    docker ps -aqf "name=kafka" > kafka-temp.txt
    input=$(cat kafka-temp.txt)
    docker container restart $input
    rm kafka-temp.txt
else 
    docker run -p 9092:9092 --name kafka  -e KAFKA_ZOOKEEPER_CONNECT=aemiej-mac:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://aemiej-mac:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka
fi