import * as React from "react";

import DonutChart from "../../components/Ui/DonutChart/DonutChart";

class Spending extends React.Component {
  render() {
    const { data } = this.props;

    return <DonutChart data={data} dataLabel="category" dataKey="categoryId" />;
  }
}
export default Spending;
