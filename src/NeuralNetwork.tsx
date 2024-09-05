import React, { useMemo } from "react";
import { Layer } from "./types";
import { generateLayers } from "./utils";

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
  const graphSpacing = 20;

  const colors = useMemo(
    () => [
      "#FF00FF", // Magenta
      "#00FFFF", // Cyan
      "#FFFF00", // Yellow
      "#FF0000", // Red
      "#00FF00", // Lime
      "#0000FF", // Blue
      "#FFA500", // Orange
      "#8A2BE2", // Blue Violet
      "#00FF7F", // Spring Green
      "#1E90FF", // Dodger Blue
    ],
    []
  );

  const getNodeConnections = (layerIndex: number, nodeIndex: number) => {
    if (layerIndex === 0) return [];
    const prevLayer = layers[layerIndex - 1];
    const frame = prevLayer.slice(
      nodeIndex * 2,
      nodeIndex * 2 + maxConnections
    );
    return Array.from(
      frame,
      (_, i) => nodeIndex * Math.ceil(maxConnections / 2) + i
    );
  };

  const getNodeX = (layerIndex: number, nodeIndex: number) => {
    const layerSize = layers[layerIndex].length;
    return (
      graphSpacing +
      ((svgWidth - 2 * graphSpacing) * (nodeIndex + 1)) / (layerSize + 1)
    );
  };

  return (
    <div style={{ backgroundColor: "black", padding: "20px" }}>
      <h2 style={{ fontSize: 42, color: "purple", textAlign: "left" }}>
        Showing neural network of {name}
      </h2>
      <svg
        width={svgWidth}
        height={svgHeight + graphSpacing}
        strokeWidth={1}
        style={{
          border: "1px solid gray",
          boxSizing: "content-box",
          marginRight: 42,
          marginBottom: 42,
        }}
      >
        {layers.map((layer, layerIndex) => (
          <g
            key={layerIndex}
            fill="white"
            stroke="green"
            strokeWidth="1"
            width={svgWidth - 90}
            transform={`translate(0, ${
              layerIndex * layerHeight + initialYOffset
            })`}
          >
            {layer.map((layerItem, idx) => (
              <React.Fragment key={idx}>
                {/* Draw connections */}
                {layerIndex > 0 &&
                  getNodeConnections(layerIndex, idx).map((prevIdx) => (
                    <line
                      key={`${layerIndex}-${idx}-${prevIdx}`}
                      x1={getNodeX(layerIndex - 1, prevIdx)}
                      y1={-layerHeight}
                      x2={getNodeX(layerIndex, idx)}
                      y2={0}
                      stroke={colors[idx]}
                      strokeWidth={0.5}
                      opacity={0.6}
                    />
                  ))}
                {/* Draw nodes */}
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
