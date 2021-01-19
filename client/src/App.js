import logo from './logo.png';
import './App.css';
import { createTopic } from './fetch/api';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <img src={logo} className="kafka-img" alt="logo" />
        <p><code>
          Enter the topic name to store in Kafka Broker.
        </code></p>
        <input id="topic" name="topic" placeholder="Enter topic"></input><br></br>
        <button
          className="App-link"
          id="submit"
          onClick={ async () => {
            const status = await createTopic(document.querySelector('#topic').value);
          }}
        >
          Submit topic
        </button>
      </header>
    </div>
  );
}

export default App;
