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
    console.log(`Config: ${JSON.stringify(config)}`);

    try {
        const res = await axios(config);
        console.log(`Result: ${JSON.stringify(res)}`);
        return res.status;
        
    } catch (e) {
        console.log(e);
        return 500;
    }
};

module.exports = {
    createTopic
};