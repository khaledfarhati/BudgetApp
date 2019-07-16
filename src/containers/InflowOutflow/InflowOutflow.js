import * as React from "react";
import StackedChart from "../../components/Ui/StackedChart/StackedChart";
class InflowOutflow extends React.Component {
  render() {
    const { data, totals } = this.props;
    return (
      <StackedChart
        data={data}
        totals={totals}
        dataLabel="category"
        dataKey="categoryId"
      />
    );
  }
}

export default InflowOutflow;
