"use strict";

var React = require("react"),
  Tabs = require("../../../component/bootstrap/Tabs.jsx"),
  ViewTable = require("../component/ViewTable.jsx");

function rowFormatter(row, index) {
  return (
    <tr className={index < 2 ? "high-light" : ""} key={index}>
      <td><b className="radius-block">{index + 1}</b></td>
      <td>{row[0]}</td>
      <td>{row[1]}</td>
      <td>{row[2]}</td>
    </tr>
  );
}

var Rankings = React.createClass({
  render: function () {
    return (
      <div className="widget-box widget-tab-box ranking-box">
        <Tabs triggerLink={true}>
          <ViewTable tab="已办排名" url="/1/cx/ybcx" count={5}
                     head={["排名","姓名","职务","数量"]} formatter={rowFormatter}/>
          <ViewTable tab="未办排名" url="/1/cx/wbcx" count={5}
                     head={["排名","姓名","职务","数量"]} formatter={rowFormatter}/>
          <ViewTable tab="评分排名" url="/1/cx/pfcx" count={5}
                     head={["排名","姓名","职务","数量"]} formatter={rowFormatter}/>
        </Tabs>
      </div>
    );
  }
});

module.exports = Rankings;
