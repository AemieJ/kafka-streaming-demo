docker ps -a | grep kafka > kafka-temp.txt
if [[ $(wc -l <kafka-temp.txt) -gt 0 ]]; then
    docker start kafka
else 
    docker run -p 9092:9092 --name kafka  -e KAFKA_ZOOKEEPER_CONNECT=aemiej-mac:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://aemiej-mac:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka
fi