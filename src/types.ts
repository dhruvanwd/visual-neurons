
// Define the structure for neuron and layer types
export interface Neuron {
  id: string;
  active: boolean;
}

export interface Layer extends Array<Neuron> {}
