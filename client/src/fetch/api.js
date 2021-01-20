const axios = require("axios");
const baseUrl = 'http://localhost:5000';

const createTopic = async (topicName) => {
    const config = {
        method: 'post',
        url: `${baseUrl}/app/v1/create-topic/`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            name: topicName
        })
    };
    console.log(`Config for creating topic: ${JSON.stringify(config)}`);

    try {
        const res = await axios(config);
        console.log(`Result for creating topic: ${JSON.stringify(res)}`);
        return res.status;
        
    } catch (e) {
        console.log(e);
        return 500;
    }
};

const listTopic = async () => {
    const config = {
        method: 'get',
        url: `${baseUrl}/app/v1/get-topics/`,
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log(`Config for listing topic: ${JSON.stringify(config)}`);
    try {
        const res = await axios(config);
        console.log(`Result for listing topic: ${JSON.stringify(res)}`);
        return res.data.listTopic;
        
    } catch (e) {
        console.log(e);
        return [];
    }
};

const postProducerContent = async(topic, content) => {
    const config = {
        method: 'post',
        url: `${baseUrl}/app/v1/post-producer-content/`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            topic: topic,
            content: content
        })
    };
    console.log(`Config for sending content from producer: ${JSON.stringify(config)}`);

    try {
        const res = await axios(config);
        console.log(`Result for sending content from producer: ${JSON.stringify(res)}`);
        return (res.data.topic === topic) ? 200 : 404;
        
    } catch (e) {
        console.log(e);
        return 500;
    }
};

const getConsumerContent = async(topic) => {
    const config = {
        method: 'post',
        url: `${baseUrl}/app/v1/get-consumer/`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            topic: topic
        })
    };
    console.log(`Config for getting subscriber information from broker: ${JSON.stringify(config)}`);
    try {
        const res = await axios(config);
        console.log(`Result for getting subscriber information from broker: ${JSON.stringify(res)}`);
        return res.status;
        
    } catch (e) {
        console.log(e);
        return 500;
    }
};

const getContent = async() => {
    const config = {
        method: 'get',
        url: `${baseUrl}/app/v1/get-content/`,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    console.log(`Config for getting content: ${JSON.stringify(config)}`);
    try {
        const res = await axios(config);
        // console.log(`Result for getting content: ${JSON.stringify(res)}`);
        return res.data;
        
    } catch (e) {
        console.log(e);
        return {};
    }
};

module.exports = {
    createTopic,
    listTopic,
    postProducerContent,
    getConsumerContent,
    getContent
};