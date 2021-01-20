import React, { Component } from "react";

import './ConsumerPage.css';
import { listTopic, getConsumerContent, getContent } from '../../fetch/api';

class ConsumerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            topic: '',
            textAreaValue1: '',
            textAreaValue2: '',
            btnStatus1: false,
            btnStatus2: false,
            choice: 1
        }
    }

    async componentDidMount() {
        this.setState({ choice: Math.round(1 + Math.random()) });
        setInterval(async () => {
            const result = await getContent();
            const content0 = result['partition0'];
            const content1 = result['partition1'];
            if (result['topic'] !== this.state.topic) {
                this.setState({
                    btnStatus1: false,
                    btnStatus2: false
                });
            }
            this.setTextContent(content0, content1);
        }, 5000);
        await this.getTopicList();
    }

    setTextContent = (content0, content1) => {
        if (this.state.btnStatus1 === true) {
            let text1, text2;
            if (this.state.btnStatus2 === true) {
                // consumer1 & consumer2 subscribed to the topic
                const consumerChoice = this.state.choice; 
                // consumerChoice result will hold content0 & other will hold content1
                text1 = (consumerChoice === 1) ? `[Partition 0 content: ${content0}]` : `[Partition 1 content: ${content1}]`;
                text2 = (consumerChoice === 1) ? `[Partition 1 content: ${content1}]` : `[Partition 0 content: ${content0}]`;
            } else {
                // consumer1 only subscribed to the topic
                text1 = `[Partition 0 content: ${content0}]\n
                [Partition 1 content: ${content1}]`;
                text2 = '';
            }
            this.setState({ 
                textAreaValue1: text1,
                textAreaValue2: text2
            });
        } else {
            let text1, text2;
            if (this.state.btnStatus2 === true) {
                // consumer2 only subscribed to the topic
                text1 = '';
                text2 = `[Partition 0 content: ${content0}]\n
                [Partition 1 content: ${content1}]`;
            } else {
                // none subscribed to the topic
                text1 = '';
                text2 = '';
            }
            this.setState({ 
                textAreaValue1: text1,
                textAreaValue2: text2
            });
        }
    }

    getTopicList = async () => {
        const list = await listTopic();
        console.log(list);
        this.setState({ list });
    };

    addButton = (topic) => {
        let btn = document.createElement('button');
        btn.setAttribute('name', topic);
        btn.setAttribute('id', topic);
        btn.setAttribute('class', 'ConsumerPage-btn');
        btn.innerText = topic;
        btn.onclick = () => {
            this.setState({ topic });
        }

        let div = document.querySelector('div.ConsumerPage-within');
        if (document.querySelector(`#${topic}`) === null) {
            div.appendChild(btn);
        }
    }

    render() {
        return (
            <div className="ConsumerPage">
                <header className="ConsumerPage-header">
                    <h2>Topics within Kafka Broker</h2>
                    <div className="ConsumerPage-within">
                        {
                            this.state.list !== [] ?
                                this.state.list.forEach((el) => {
                                    this.addButton(el);
                                })
                                : <p><code>No topics created in the kafka broker.</code></p>
                        }
                    </div>
                    {this.state.topic !== '' ?
                        <h3>Topic chosen within the broker: {this.state.topic}</h3> :
                        <code></code>
                    }
                    {this.state.topic !== '' ?
                        <div className="ConsumerPage-content">
                            <div className="ConsumerPage-consumer1">
                                <div className="consumer1">
                                    {
                                        this.state.textAreaValue1 !== undefined ?
                                            <code>{this.state.textAreaValue1}</code> :
                                            ''
                                    }
                                </div>
                                <button
                                    type="submit"
                                    id="consumer1"
                                    name="consumer1"
                                    onClick={async () => {
                                        const status = await getConsumerContent(this.state.topic);
                                        if (status === 200) {
                                            this.setState({ btnStatus1: true });
                                        }
                                    }}
                                >
                                    Subscribe
                                </button>
                                <code>Consumer 1 - subscriber</code>
                            </div>
                            <div className="ConsumerPage-consumer2">
                                <div className="consumer2">
                                {
                                        this.state.textAreaValue2 !== undefined ?
                                            <code>{this.state.textAreaValue2}</code> :
                                            ''
                                    }
                                </div>
                                <button
                                    type="submit"
                                    id="consumer2"
                                    name="consumer2"
                                    onClick={async () => {
                                        const status = await getConsumerContent(this.state.topic);
                                        if (status === 200) {
                                            this.setState({ btnStatus2: true });
                                        }
                                    }}
                                >
                                    Subscribe
                                </button>
                                <code>Consumer 2 - subscriber</code>
                            </div>

                        </div>
                        : <div></div>
                    }
                </header>
            </div>
        );
    }
}

export default ConsumerPage;