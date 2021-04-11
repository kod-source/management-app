import MediaQuery from "react-responsive";
import { Pie, PieChart, Tooltip } from "recharts";

const IncomeGraph = ({ incomes }) => {
  // グラフで必要なデータのみ取得
  const graphData = incomes.reduce((prev, current) => {
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
            fill={"rgb(58, 222, 58)"}
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
            fill={"rgb(58, 222, 58)"}
            label
          />
          <Tooltip />
        </PieChart>
      </MediaQuery>
    </>
  );
};

export default IncomeGraph;
