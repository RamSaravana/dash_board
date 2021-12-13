import React, { useState, useEffect } from "react";
import "./AreaChart.css";
import * as d3 from "d3";

// Dimensions
const margin = { top: 40, right: 30, bottom: 60, left: 50 };
const width = 960 - margin.left - margin.right;
const height = 340 - margin.top - margin.bottom;
const color = "#9BDEFD";

// AreaChart function
const AreaChart = () => {
  const [activeIndex, setActiveIndex] = useState(null); //state to find the mouse position during hovering
  const [data, setData] = useState([]); // state to store the data after fetching

  //find Y-axis values
  const yMinValue = d3.min(data, (d) => d.price);
  const yMaxValue = d3.max(data, (d) => d.price);

  //set range for X and Y axis for setting scale
  const getX = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => d.date))
    .range([0, width]);

  const getY = d3
    .scaleLinear()
    .domain([yMinValue - 1, yMaxValue + 2])
    .range([height, 0]);

  //set X-Axis at the bottom
  const getXAxis = (ref) => {
    const xAxis = d3.axisBottom(getX);
    d3.select(ref).call(xAxis.tickFormat(d3.timeFormat("%b")));
  };
  //set Y-Axis at the left
  const getYAxis = (ref) => {
    const yAxis = d3.axisLeft(getY).tickSize(-width).tickPadding(7);
    d3.select(ref).call(yAxis);
  };

  const linePath = d3
    .line()
    .x((d) => getX(d.date))
    .y((d) => getY(d.price))
    .curve(d3.curveMonotoneX)(data);

  const areaPath = d3
    .area()
    .x((d) => getX(d.date))
    .y0((d) => getY(d.price))
    .y1(() => getY(yMinValue - 1))
    .curve(d3.curveMonotoneX)(data);

  const handleMouseMove = (e) => {
    const bisect = d3.bisector((d) => d.date).left,
      x0 = getX.invert(d3.pointer(e, this)[0]),
      index = bisect(data, x0, 1);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  useEffect(() => {
    d3.csv("/data.csv").then((d) => {
      d = d.reverse();
      const parseDate = d3.timeParse("%m/%d/%Y");
      d.forEach((i) => {
        i.date = parseDate(i.date);
        i.price = Number(i.price);
      });
      setData(d);
    });
    return () => undefined;
  }, []);

  return (
    <div className="wrapper">
      <div className="chartTitle">
        AREACHART - USD to RUB Exchange Rates, 2020
      </div>
      <svg
        viewBox={`-55 -55 ${width + margin.left + margin.right} 
                            ${height + margin.top + margin.bottom}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <g className="axis" ref={getYAxis} />
        <g
          className="axis xAxis"
          ref={getXAxis}
          transform={`translate(0,${height})`}
        />
        <path fill={color} d={areaPath} opacity={0.3} />
        <path strokeWidth={2} fill="none" stroke={color} d={linePath} />/
        <text
          transform={"rotate(-90)"}
          x={0 - height / 2}
          y={0 - margin.left}
          dy="1em"
          textAnchor="middle"
        >
          {"$1 USD equals"}
        </text>
        {data.map((item, index) => {
          return (
            <g key={index}>
              <text
                fill="#666"
                x={getX(item.date)}
                y={getY(item.price) - 20}
                textAnchor="middle"
              >
                {index === activeIndex ? `₽ ${item.price}` : ""}
              </text>
              <circle
                cx={getX(item.date)}
                cy={getY(item.price)}
                r={index === activeIndex ? 2 : 1}
                fill={color}
                strokeWidth={index === activeIndex ? 2 : 0}
                stroke="#fff"
                style={{ transition: "ease-out .1s" }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};

export default AreaChart;
