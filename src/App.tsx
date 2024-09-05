import "./App.css";
import { data } from "./constants";
import NeuralNetwork from "./NeuralNetwork";

function App() {
  return (
    <div>
      <h1>Neural Network Visualization</h1>
      {Object.keys(data).map((key) => (
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
