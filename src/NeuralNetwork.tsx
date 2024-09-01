import React, { useState, useEffect, useCallback } from 'react';
import { Layer, Neuron } from './types';

interface NeuralNetworkProps {
  input: number[][];
  inputLayerSize: number;
  maxConnections: number;
  name: string;
}

const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
  input,
  inputLayerSize,
  maxConnections,
  name,
}) => {
  const [layers, setLayers] = useState<Layer[]>([]);

  const createLayers = useCallback((digits: number[][]) => {
    const initialLayer: Neuron[] = digits.flat().map((value, index) => ({
      id: `0-${index}`,
      active: value === 1,
    }));

    const generatedLayers: Layer[] = [initialLayer];

    while (generatedLayers[generatedLayers.length - 1].length > 1) {
      const lastLayer = generatedLayers[generatedLayers.length - 1];
      const currentLayer: Neuron[] = [];

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

    setLayers(generatedLayers);
  }, [maxConnections]);

  useEffect(() => {
    createLayers(input);
  }, [input, inputLayerSize, maxConnections]);

  console.log({ [name]: layers });

  const nodeRadius = 15;
  const layerHeight = 150;
  const initialYOffset = 50;
  const svgWidth = 2400;
  const svgHeight = layers.length * layerHeight + initialYOffset;

  // New constants for sine wave graphs
  const graphWidth = svgWidth;
  const graphHeight = 100;
  const graphSpacing = 20;

  // Function to generate points for sine wave
  const generateSineWave = (layer: Neuron[], width: number, height: number) => {
    return layer.map((node, index) => {
      const x = (width / (layer.length - 1)) * index;
      const y = height / 2 + (node.active ? -height / 4 : height / 4);
      return `${x},${y}`;
    }).join(' ');
  };

  return (
    <div>
      <h2 style={{ fontSize: 42, color: 'purple', textAlign: 'left' }}>
        Showing neural network of {name}
      </h2>
      <svg
        width={svgWidth}
        height={layers.length * layerHeight + initialYOffset+ svgHeight + graphSpacing}
        strokeWidth={1}
        style={{
          border: '1px solid gray',
          boxSizing: 'content-box',
          marginRight: 42,
          marginBottom: 42,
        }}
      >
        {layers.map((layer, layerIndex) => (
          <g
            key={layerIndex}
            transform={`translate(0, ${layerIndex * layerHeight + initialYOffset})`}
          >
            {layer.map((node, nodeIndex) => {
              const y = layerHeight / 2;
              const x =
                layerIndex === 0
                  ? (svgWidth / layer.length) * (nodeIndex + 0.5)
                  : (svgWidth / (layer.length + 1)) * (nodeIndex + 1);

              return (
                <g key={node.id}>
                  {layerIndex < layers.length - 1 &&
                    layers[layerIndex + 1].map((targetNode, targetIndex) => {
                      const connectionsPerNode = Math.ceil(maxConnections / 2);
                      const startIndex = Math.max(0, targetIndex * 2 - connectionsPerNode + 1);
                      const endIndex = Math.min(layer.length - 1, startIndex + maxConnections - 1);

                      if (nodeIndex >= startIndex && nodeIndex <= endIndex) {
                        const targetX =
                          (svgWidth / (layers[layerIndex + 1].length + 1)) * (targetIndex + 1);
                        const targetY = layerHeight + y;
                        return (
                          <line
                            key={`${node.id}-${targetNode.id}`}
                            x1={x}
                            y1={y}
                            x2={targetX}
                            y2={targetY - layerHeight / 10}
                            stroke="black"
                            strokeWidth="1"
                          />
                        );
                      }
                      return null;
                    })}
                  <circle
                    cx={x}
                    cy={y}
                    r={nodeRadius}
                    fill={node.active ? 'blue' : 'gray'}
                  />
                  <text
                    x={x}
                    y={y + 4}
                    textAnchor="middle"
                    fontSize="10"
                    fill="white"
                  >
                    {nodeIndex}
                  </text>


                </g>
              );
            })}
          </g>
        ))}

        <g transform={`translate(0, ${svgHeight + graphSpacing})`}>
          {layers.map((layer, index) => (
            <g key={`graph-${index}`} transform={`translate(0, ${index * (graphHeight + graphSpacing)})`}>
              <text x="10" y="20" fill="black" fontSize="16">Layer {index}</text>
              <polyline
                points={generateSineWave(layer, graphWidth, graphHeight)}
                fill="none"
                stroke="blue"
                strokeWidth="2"
              />
              <line x1="0" y1={graphHeight / 2} x2={graphWidth} y2={graphHeight / 2} stroke="gray" strokeWidth="1" />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default NeuralNetwork;