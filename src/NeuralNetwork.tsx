import React, { useState, useEffect } from 'react';

// Define the structure for neuron and layer types
interface Neuron {
  id: string;
  active: boolean;
}

interface Layer extends Array<Neuron> {}

interface NeuralNetworkProps {
  input: number[][]; // Input data (digit pattern as a 2D array)
  inputLayerSize: number; // Number of neurons in the input layer (e.g., 64 for an 8x8 input)
  maxConnections: number; // Maximum connections per neuron
  name: string;
}

const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
  input,
  inputLayerSize,
  maxConnections,
  name,
}) => {
  const [layers, setLayers] = useState<Layer[]>([]);

  // Function to create neural network layers
  const createLayers = (digits: number[][]) => {
    // Flatten the input 2D array into a 1D array representing the first layer
    const initialLayer: Neuron[] = digits.flat().map((value, index) => ({
      id: `0-${index}`,
      active: value === 1,
    }));

    const generatedLayers: Layer[] = [initialLayer]; // Initialize with the input layer

    while (generatedLayers[generatedLayers.length - 1].length > 1) {
      const lastLayer = generatedLayers[generatedLayers.length - 1];
      const currentLayer: Neuron[] = [];

      // Create the next layer
      for (let i = 0; i < Math.floor(lastLayer.length / 2); i++) {
        const startIndex = i * 2;
        const connectedNeurons = lastLayer.slice(
          startIndex,
          startIndex + maxConnections
        );
        const activeCount = connectedNeurons.filter(
          (neuron) => neuron.active
        ).length;
        const isActive = activeCount >= Math.ceil(maxConnections / 2);

        currentLayer.push({
          id: `${generatedLayers.length}-${i}`,
          active: isActive,
        });
      }

      generatedLayers.push(currentLayer);
    }

    setLayers(generatedLayers); // Update the state with generated layers
  };

  useEffect(() => {
    createLayers(input); // Generate layers when the input changes
  }, [input, inputLayerSize, maxConnections]);

  console.log({ [name]: layers });

  const nodeRadius = 15;
  const layerHeight = 150;
  const initialYOffset = 50;
  const svgWidth = 2400;

  return (
    <div>
      <h2
        style={{
          fontSize: 42,
          color: 'purple',
          textAlign: 'left',
        }}
      >
        Showing neural network of {name}
      </h2>
      <svg
        width={svgWidth}
        height={layers.length * layerHeight + initialYOffset}
        strokeWidth={1}
        style={{
          border: '1px solid gray',
          marginRight: 42,
          marginBottom: 42,
        }}
      >
        {layers.map((layer, layerIndex) => (
          <g
            key={layerIndex}
            transform={`translate(0, ${
              layerIndex * layerHeight + initialYOffset
            })`}
          >
            {layer.map((neuron, neuronIndex) => {
              const y = layerHeight / 2;
              const x =
                layerIndex === 0
                  ? (svgWidth / layer.length) * (neuronIndex + 0.5)
                  : (svgWidth / (layer.length + 1)) * (neuronIndex + 1);

              return (
                <g key={neuron.id}>
                  <circle
                    cx={x}
                    cy={y}
                    r={nodeRadius}
                    fill={neuron.active ? 'blue' : 'gray'}
                  />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    fontSize="10"
                    fill="white"
                  >
                    {neuronIndex}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default NeuralNetwork;
