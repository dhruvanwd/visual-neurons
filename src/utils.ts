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

// // Function to generate points for sine wave
// export const generateSineWave = (
//   layer: Layer,
//   width: number,
//   height: number
// ) => {
//   return layer
//     .map((node, index) => {
//       const x = (width / (layer.length - 1)) * index;
//       const y = height / 2 + (node ? -height / 4 : height / 4);
//       return `${x},${y}`;
//     })
//     .join(" ");
// };
