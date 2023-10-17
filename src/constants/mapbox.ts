import mapboxgl from "mapbox-gl";

export const addAnimation = (map: mapboxgl.Map) => {
  // add a line layer without line-dasharray defined to fill the gaps in the dashed line
  map.addLayer({
    type: "line",
    source: "line",
    id: "line-background",
    paint: {
      "line-color": "yellow",
      "line-width": 6,
      "line-opacity": 0.4,
    },
  });

  // add a line layer with line-dasharray set to the first value in dashArraySequence
  map.addLayer({
    type: "line",
    source: "line",
    id: "line-dashed",
    paint: {
      "line-color": "yellow",
      "line-width": 6,
      "line-dasharray": [0, 4, 3],
    },
  });

  // technique based on https://jsfiddle.net/2mws8y3q/
  // an array of valid line-dasharray values, specifying the lengths of the alternating dashes and gaps that form the dash pattern
  const dashArraySequence = [
    [0, 4, 3],
    [0.5, 4, 2.5],
    [1, 4, 2],
    [1.5, 4, 1.5],
    [2, 4, 1],
    [2.5, 4, 0.5],
    [3, 4, 0],
    [0, 0.5, 3, 3.5],
    [0, 1, 3, 3],
    [0, 1.5, 3, 2.5],
    [0, 2, 3, 2],
    [0, 2.5, 3, 1.5],
    [0, 3, 3, 1],
    [0, 3.5, 3, 0.5],
  ];

  let step = 0;

  function animateDashArray(timestamp: number) {
    // Update line-dasharray using the next value in dashArraySequence. The
    // divisor in the expression `timestamp / 50` controls the animation speed.
    const newStep = parseInt(`${(timestamp / 50) % dashArraySequence.length}`);

    if (newStep !== step) {
      map.setPaintProperty(
        "line-dashed",
        "line-dasharray",
        dashArraySequence[step]
      );
      step = newStep;
    }

    // Request the next frame of the animation.
    requestAnimationFrame(animateDashArray);
  }

  // start the animation
  animateDashArray(0);
};
