import { Layer } from "./types";

export function generateLayers(data: Layer, connections: number): Layer {
  const layers: Layer = [data.flat()];

  while (layers[layers.length - 1].length > connections) {
    const lastLayer = layers[layers.length - 1];
    const layerSize = Math.floor(lastLayer.length / 3);
    const layer: number[] = new Array(layerSize).fill(0);

    console.log(layerSize);

    for (let idx = 0; idx < layer.length; idx++) {
      const currentFrame: number[] = lastLayer.slice(
        idx * Math.ceil(connections / 2),
        Math.min(
          idx * Math.ceil(connections / 2) + connections,
          lastLayer.length
        )
      );
      const isActive =
        currentFrame.filter((x) => x === 1).length >=
        Math.ceil(connections / 2);
      layer[idx] = isActive ? 1 : 0;
    }

    layers.push(layer);
  }
  return layers;
}

export const genConnections = (layers: number[][], maxConnections: number) => {
  const allConnections: number[][][] = [];
  for (let layerIndex = 1; layerIndex < layers.length; layerIndex++) {
    const currentLayer = layers[layerIndex];
    const prevLayer = layers[layerIndex - 1];
    const layerConnections: number[][] = [];

    for (let nodeIndex = 0; nodeIndex < currentLayer.length; nodeIndex++) {
      const startIndex = nodeIndex * Math.ceil(maxConnections / 2);
      const endIndex = Math.min(startIndex + maxConnections, prevLayer.length);

      const nodeConnections = Array.from(
        { length: endIndex - startIndex },
        (_, i) => startIndex + i
      );
      layerConnections.push(nodeConnections);
    }

    allConnections.push(layerConnections);
  }
  return allConnections;
};

export const colors = [
  "#FF00FF",
  "#00FFFF",
  "#FFFF00",
  "#FF0000",
  "#00FF00",
  "#0000FF",
  "#FFA500",
  "#8A2BE2",
  "#00FF7F",
  "#1E90FF",
];
