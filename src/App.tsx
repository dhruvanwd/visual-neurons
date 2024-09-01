import './App.css';
import { data } from './constants';
import NeuralNetwork from './NeuralNetwork';

function App() {
  const keys = Object.keys(data);
  return (
    <div>
      <h1>Neural Network Visualization</h1>
      {keys.map((key) => (
        <NeuralNetwork
          key={key}
          name={key}
          input={data[key]}
          inputLayerSize={64}
          maxConnections={5}
        />
      ))}
    </div>
  );
}

export default App;
