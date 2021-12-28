import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "./ProgressBar.css";

const CheckColor = (value) => {
  if (value < 75) return "red";
  if (value > 90) return "green";
  return "darkViolet";
};

const ProgressBar = ({ score }) => {
  // Dimensions
  const ref = useRef();

  useEffect(() => {
    const segmentWidth = 100,
      currentState = score.score;

    d3.select(ref.current).select("svg").remove();

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("height", 27)
      .attr("width", 300);

    const colorScale = d3.scaleOrdinal().range([CheckColor(currentState)]);

    svg
      .append("rect")
      .attr("class", "bg-rect")
      .attr("rx", 10)
      .attr("ry", 10)
      .attr("fill", "gray")
      .attr("height", 15)
      .attr("width", segmentWidth * 3)
      .attr("x", 0);

    const progress = svg
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
      .attr("width", currentState * 3);
  }, [score]);

  return (
    <div className="progressWrapper">
      <span className="progress" ref={ref}></span>
      <span className="progressScore">
        {score.score} <span className="progressMonth"> in {score.month}</span>
      </span>
    </div>
  );
};

export default ProgressBar;
