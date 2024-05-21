import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

const Doughnut3D = ({ data }) => {
  const dataSource = {
    chart: {
      caption: "Stars Per Language",
      doughtnutRadius: "45%",
      showPercentValues: 0,
    },
    data,
  };

  return (
    <ReactFusioncharts
      type="doughnut3d"
      width="100%"
      height="400"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default Doughnut3D;
