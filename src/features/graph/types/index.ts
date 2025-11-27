export interface DataPoint {
  x: number;
  y: number;
  label?: string;
}

export interface GraphData {
  points: DataPoint[];
  xLabel?: string;
  yLabel?: string;
  title?: string;
}

export interface GraphDimensions {
  width: number;
  height: number;
  padding: {
    top: number;
    right: number;
    bottom: number;
    left: number;
  };
}
