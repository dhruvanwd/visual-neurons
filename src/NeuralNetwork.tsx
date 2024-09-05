import React, { useMemo } from "react";
import { Layer } from "./types";
import { colors, genConnections, generateLayers } from "./utils";

interface NeuralNetworkProps {
  input: Layer;
  inputLayerSize: number;
  maxConnections: number;
  name: string;
}

const NeuralNetwork: React.FC<NeuralNetworkProps> = ({
  input,
  maxConnections,
  name,
}) => {
  const layers = useMemo(
    () => generateLayers(input, maxConnections),
    [input, maxConnections]
  );

  const nodeRadius = 10;
  const layerHeight = 150;
  const initialYOffset = 50;
  const svgWidth = 1600;
  const svgHeight = layers.length * layerHeight + initialYOffset;

  const connections = useMemo(
    () => genConnections(layers, maxConnections),
    [layers, maxConnections]
  );

  console.log("connections", connections);

  const getNodeX = (layerIndex: number, nodeIndex: number) => {
    const layerSize = layers[layerIndex].length;
    return (svgWidth * (nodeIndex + 1)) / (layerSize + 1);
  };

  return (
    <div style={{ backgroundColor: "black", padding: "20px" }}>
      <h2 style={{ fontSize: 42, color: "purple", textAlign: "left" }}>
        Showing neural network of {name}
      </h2>
      <svg
        width={svgWidth}
        height={svgHeight}
        strokeWidth={1}
        style={{
          border: "1px solid gray",
          boxSizing: "content-box",
          marginRight: 42,
          marginBottom: 42,
        }}
      >
        {connections.map((layerConnections, layerIndex) => (
          <g
            key={layerIndex}
            transform={`translate(0, ${
              layerIndex * layerHeight + initialYOffset
            })`}
          >
            {layerConnections.map((nodeConnections, nodeIndex) => (
              <g key={nodeIndex}>
                {nodeConnections.map((prevNodeIndex, idx) => (
                  <line
                    key={idx}
                    x1={getNodeX(layerIndex, prevNodeIndex)}
                    y1={0}
                    x2={getNodeX(layerIndex + 1, nodeIndex)}
                    y2={layerHeight}
                    stroke={colors[idx % colors.length]}
                    strokeWidth={1}
                  />
                ))}
              </g>
            ))}
          </g>
        ))}
        {layers.map((layer, layerIndex) => (
          <g
            key={layerIndex}
            fill="white"
            stroke="green"
            strokeWidth="1"
            width={svgWidth}
            transform={`translate(0, ${
              layerIndex * layerHeight + initialYOffset
            })`}
          >
            {layer.map((layerItem, idx) => (
              <React.Fragment key={idx}>
                <circle
                  r={nodeRadius}
                  cx={getNodeX(layerIndex, idx)}
                  cy={0}
                  fill={layerItem ? "blue" : "white"}
                />
                <text
                  x={getNodeX(layerIndex, idx)}
                  y={1}
                  fontSize={6}
                  letterSpacing={1}
                  fill={layerItem ? "yellow" : "black"}
                  textAnchor="middle"
                  dominantBaseline="middle"
                >
                  {idx + 1}
                </text>
              </React.Fragment>
            ))}
          </g>
        ))}
      </svg>
    </div>
  );
};

export default NeuralNetwork;
