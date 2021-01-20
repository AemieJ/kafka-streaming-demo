import React, { Component } from "react";
import './ProducerPage.css';
import { listTopic, postProducerContent } from '../../fetch/api';

class ProducerPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list: [],
            topic: '',
            textAreaValue: ''
        }
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        await this.getTopicList();
    }

    handleChange(event) {
        this.setState({ textAreaValue: event.target.value });
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
        btn.setAttribute('class', 'ProducerPage-btn');
        btn.innerText = topic;
        btn.onclick = () => {
            this.setState({ topic });
        }

        let div = document.querySelector('div.ProducerPage-within');
        if (document.querySelector(`#${topic}`) === null) {
            div.appendChild(btn);
        }
    }

    render() {
        return (
            <div className="ProducerPage">
                <header className="ProducerPage-header">
                    <h2>Topics within Kafka Broker</h2>
                    <div className="ProducerPage-within">
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
                    <div className="ProducerPage-content">
                        <textarea 
                        className="message-box"
                        value={this.state.textAreaValue}
                        onChange={this.handleChange}
                        rows={10}
                        cols={50}
                        />
                        <button 
                        type="submit" 
                        id="producer-submit"
                        onClick= { async () => {
                            const status = await postProducerContent(this.state.topic, this.state.textAreaValue);
                            //alert(status);
                        }}
                        >Send content
                        </button>
                    </div>
                    : <div></div>    
                }
                </header>
            </div>
        );
    }
}

export default ProducerPage;