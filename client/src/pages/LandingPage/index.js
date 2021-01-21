import React, { Component } from "react";
import { Redirect } from "react-router-dom";

import { createTopic } from "../../fetch/api";
import logo from "../../logo.png";
import "./LandingPage.css";

class LandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 500,
    };
  }

  render() {
    return (
      <div className="LandingPage">
        <header className="LandingPage-header">
          <img src={logo} className="kafka-img" alt="logo" />
          <p>
            <code>Enter the topic name to store in Kafka Broker.</code>
          </p>
          <input id="topic" name="topic" placeholder="Enter topic"></input>
          <br></br>
          <button
            className="LandingPage-link"
            id="submit"
            onClick={async () => {
              const status = await createTopic(document.querySelector("#topic").value);
              this.setState({ status });
            }}
          >
            Submit topic
          </button>
        </header>
        {this.state.status === 201 ? <Redirect to="/producer" /> : <Redirect to="/" />}
      </div>
    );
  }
}

export default LandingPage;
