"use strict";

var React = require("react"),
    moment = require("moment");

require("moment/locale/zh-cn");

var Calendar = React.createClass({
    getDefaultProps: function () {
        return {
            now: moment(new Date())
        };
    },
    render: function () {

        var now = this.props.now,
            begin = now.clone().date(1),
            end = now.clone().date(this.props.now.daysInMonth());
        // 当前月1号不为星期天时，偏移开始日期到最近的星期天
        if (begin.weekday() !== 6) {
            begin.subtract(begin.weekday() + 1, "days");
        }
        // 当前月最后一天不为星期六时，偏移结束日期到最近的星期六
        if (end.weekday() !== 5) {
            end.add(5 - end.weekday(), "days");
        }

        var count = 0;
        var Cells = [];
        var Rows = [];
        while (!begin.isAfter(end)) {
            if (begin.month() !== now.month()) {
                Cells.push(<td className="grey" key={begin.date()}>{begin.date()}</td>);
            } else if (begin.isSame(now)) {
                Cells.push(<td key={begin.date()}><b className="now">{begin.date()}</b></td>);
            } else {
                Cells.push(<td key={begin.date()}>{begin.date()}</td>);
            }
            if (++count === 7) {
                Rows.push(<tr key={Rows.length}>{Cells}</tr>);
                Cells = [];
                count = 0;
            }
            begin.add(1, "days");
        }

        return (
            <div className="widget-box">
                <h2><a href="#">工作日历</a></h2>

                <div className="calendar">
                    <div className="cal-header">
                        <h3 className="center">{now.year()}年{now.format("M")}月</h3>
                    </div>
                    <div className="cal-body">
                        <table>
                            <thead>
                            <tr>
                                <th>日</th>
                                <th>一</th>
                                <th>二</th>
                                <th>三</th>
                                <th>四</th>
                                <th>五</th>
                                <th>六</th>
                            </tr>
                            </thead>
                            <tbody>
                            {Rows}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Calendar;