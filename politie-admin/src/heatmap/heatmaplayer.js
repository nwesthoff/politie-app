const heatmapLayer = {
  "heatmap-weight": {
    property: "priceIndicator",
    type: "exponential",
    stops: [[0, 0], [5, 2]]
  },
  "heatmap-intensity": {
    stops: [[0, 0], [5, 1.2]]
  },
  "heatmap-color": [
    "interpolate",
    ["linear"],
    ["heatmap-density"],
    0,
    "rgba(33,102,172,0)",
    0.25,
    "rgb(103,169,207)",
    0.5,
    "rgb(209,229,240)",
    0.8,
    "rgb(253,219,199)",
    1,
    "rgb(239,138,98)",
    2,
    "rgb(178,24,43)"
  ],
  "heatmap-radius": {
    stops: [[0, 1], [5, 50]]
  }
};

export default heatmapLayer;
