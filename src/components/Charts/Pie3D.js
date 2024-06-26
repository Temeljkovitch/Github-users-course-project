import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";

// Resolves charts dependancy
charts(FusionCharts);

const Pie3D = ({ data }) => {
  const dataSource = {
    chart: {
      caption: "Languages",
      decimals: 0,
      pieRadius: "45%",
    },
    data,
  };
  return (
    <ReactFusioncharts
      type="pie3d"
      width="400"
      height="400"
      dataFormat="JSON"
      dataSource={dataSource}
    />
  );
};

export default Pie3D;
