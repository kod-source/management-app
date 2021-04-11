import MediaQuery from "react-responsive";
import { Pie, PieChart, Tooltip } from "recharts";

const SpendingGraph = ({ expenses }) => {
  // グラフで必要なデータのみ取得
  const graphData = expenses.reduce((prev, current) => {
    const element = prev.find((result) => result.label === current.label);

    if (element) {
      element.money += current.money;
    } else {
      prev.push({
        label: current.label,
        money: current.money,
      });
    }
    return prev;
  }, []);

  const sortData = graphData.sort(function (a, b) {
    if (a.money > b.money) {
      return -1;
    } else {
      return 1;
    }
  });

  return (
    <>
      <MediaQuery query="(max-width: 767px)">
        <PieChart width={380} height={200}>
          <Pie
            data={sortData}
            nameKey="label"
            dataKey="money"
            isAnimationActive={false}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill={"red"}
            label
          />
          <Tooltip />
        </PieChart>
      </MediaQuery>
      <MediaQuery query="(min-width: 768px)">
        <PieChart width={1440} height={400}>
          <Pie
            data={sortData}
            nameKey="label"
            dataKey="money"
            isAnimationActive={false}
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill={"red"}
            label
          />
          <Tooltip />
        </PieChart>
      </MediaQuery>
    </>
  );
};

export default SpendingGraph;
