import "./Home.css";
import AreaChart from "./components/AreaChart";
import { useEffect, useState } from "react";
import * as d3 from "d3";
import Plate from "./components/Plate";
import ProgressBar from "./components/ProgressBar";

const Home = () => {
  const [AreaChartData, setAreaChartData] = useState([]);
  const [ProgressChartData, setProgressChartData] = useState([]);

  useEffect(() => {
    d3.csv("/data.csv").then((d) => {
      d = d.reverse();
      const parseDate = d3.timeParse("%m/%d/%Y");
      d.forEach((i) => {
        i.date = parseDate(i.date);
        i.price = Number(i.price);
      });
      setAreaChartData(d);
    });
  }, []);

  useEffect(() => {
    d3.csv("/progressData.csv").then((d) => {
      setProgressChartData(d);
    });
  }, []);

  return (
    <div className="dashboardWrapper">
      <div className="row">
        <Plate
          dimensions={{ width: "450px", height: "180px" }}
          plateTitle={"Graph-1"}
        />
        <Plate
          dimensions={{ width: "456px", height: "180px" }}
          plateTitle={"PROGRESSIVE BAR CHART"}
        >
          {ProgressChartData.map((i) => (
            <ProgressBar key={i.month} score={i} />
          ))}
          <p>
            Overall Sales Target - Previous 3 month sales targets achieved in %
          </p>
        </Plate>
        <Plate
          dimensions={{ width: "456px", height: "180px" }}
          plateTitle={"Graph-3"}
        />
      </div>
      <div className="row">
        <Plate
          dimensions={{ width: "450px", height: "345px" }}
          plateTitle={"Graph-4"}
        />
        <Plate
          dimensions={{ width: "930px", height: "345px" }}
          plateTitle={"AREACHART - USD to RUB Exchange Rates, 2020"}
        >
          <AreaChart
            data={AreaChartData}
            dimensions={{ width: "930", height: "345" }}
          />
        </Plate>
      </div>
      <div className="row">
        <Plate
          dimensions={{ width: "336px", height: "180px" }}
          plateTitle={"Graph-6"}
        />
        <Plate
          dimensions={{ width: "336px", height: "180px" }}
          plateTitle={"Graph-7"}
        />
        <Plate
          dimensions={{ width: "336px", height: "180px" }}
          plateTitle={"Graph-8"}
        />
        <Plate
          dimensions={{ width: "336px", height: "180px" }}
          plateTitle={"Graph-9"}
        />
      </div>
    </div>
  );
};

export default Home;
