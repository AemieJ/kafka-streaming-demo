# Apache Kafka Basic Level Setup & Understanding 

In this project, the major setup to understand the flow of kafka is in `components` folder. However, it is much easier to understand the flow through a simple UI which showcase how the consumers stay subscribed to the particular topics in broker depending on this partition. 

However, the visualization in this code is only limited to 2 partitions for each topic within the broker but there certainly can be greater than 2 partition in real world applications. 

## Prerequisities 
1. Node
2. NPM
2. Docker

## How to make this code work on CLI? 

For this, it is kind of hectic and you'll need to make changes manually to the files. If you're up for it, pretty cool otherwise you can observe its working with the web application as well.

## How to make this code work with Web?

This is too simple, you might just cry out of happiness! 

1. In the one terminal, you will run server so just do: 
```
$ chmod +x server.sh
$ ./server.sh
```

2. Open a second terminal where we will run our client: 
```
$ cd client
$ chmod +x client.sh
$ ./client.sh
```

After this, go to your favorite browser and open `http://localhost:3000/` this will open the topics page as followed. In this you can add the topic, you require it will be created within the kafka broker with 2 partitions based on the rules specified. 

Once, the topic is created the producer page opens at `http://localhost:3000/producer/` with a list of topics as shown, you can click on any topic and send your content to that topic. 

Now, we want to have a consumer that subscribes to one or more topic within the consumer group and shows the content everytime the producer sends the content to broker. On another tab, open `http://localhost:3000/consumer` and click on the topic you want to subscribe to. Here, I have provided 2 consumers, if only 1 is subscribed then that consumer will be subscribed to both partitions of that topic however if both of them are subscribed then each consumer will be subscribed to the single partition of the topic thus exhibiting parallel processing.