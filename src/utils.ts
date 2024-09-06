import { Layer } from "./types";

export const getActivationThreshold = (connections: number) =>
  Math.ceil(connections / 2);

export function generateLayers(data: Layer, connections: number): Layer {
  const layers: Layer = [data.flat()];
  const activationThreshold = getActivationThreshold(connections);

  while (layers[layers.length - 1].length > connections) {
    const lastLayer = layers[layers.length - 1];
    const layerSize = Math.floor(lastLayer.length / activationThreshold);
    const layer: number[] = new Array(layerSize).fill(0);

    console.log(layerSize);

    for (let idx = 0; idx < layer.length; idx++) {
      const currentFrame: number[] = lastLayer.slice(
        idx * activationThreshold,
        Math.min(idx * activationThreshold + connections, lastLayer.length)
      );
      const isActive =
        currentFrame.filter((x) => x === 1).length >= activationThreshold;
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
