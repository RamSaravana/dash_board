import "./Home.css";
import AreaChart from "./components/AreaChart";

const Home = () => {
  return (
    <div className="dashboardWrapper">
      <div className="rowOne">
        <div className="rowOneChart">Graph-1</div>
        <div className="rowOneChart">Graph-2</div>
        <div className="rowOneChart">Graph-3</div>
      </div>
      <div className="rowOne">
        <div className="stackedArea">Stacked Area Graph</div>
        <AreaChart />
      </div>
      <div className="rowOne">
        <div className="rowThreeChart">Graph-6</div>
        <div className="rowThreeChart">Graph-7</div>
        <div className="rowThreeChart">Graph-8</div>
        <div className="rowThreeChart">Graph-9</div>
      </div>
    </div>
  );
};

export default Home;
