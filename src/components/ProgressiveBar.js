import React from "react";
import * as d3 from "d3";

const ProgressiveBar = ({ data, dimensions }) => {
  // Dimensions
  console.log(data);
  var svg = d3
    .select(".progress")
    .append("svg")
    .attr("height", 20)
    .attr("width", 400);

  var states = data,
    segmentWidth = 100,
    currentState = data[1];

  var colorScale = d3
    .scaleOrdinal()
    .domain(states)
    .range(["yellow", "orange", "green"]);

  svg
    .append("rect")
    .attr("class", "bg-rect")
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("fill", "gray")
    .attr("height", 15)
    .attr("width", function () {
      return segmentWidth * states.length;
    })
    .attr("x", 0);

  var progress = svg
    .append("rect")
    .attr("class", "progress-rect")
    .attr("fill", function () {
      return colorScale(currentState);
    })
    .attr("height", 15)
    .attr("width", 0)
    .attr("rx", 10)
    .attr("ry", 10)
    .attr("x", 0);

  progress
    .transition()
    .duration(1000)
    .attr("width", function () {
      var index = states.indexOf(currentState);
      return (index + 1) * segmentWidth;
    });

  return <div className="progress"></div>;
};

export default ProgressiveBar;
