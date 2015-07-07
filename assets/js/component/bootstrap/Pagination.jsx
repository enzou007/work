"use strict";

var React = require("react");

var classNames = require("classnames");

var Pagination = React.createClass({
  propTypes: {
    current: React.PropTypes.number,
    total: React.PropTypes.number,
    size: React.PropTypes.number,
    onClick: React.PropTypes.func.isRequired
  },
  getDefaultProps: function() {
    return {
      size: 7
    };
  },
  render: function () {
    var SIZE = this.props.size;
    if (this.props.total > 1) {
      var startPage = 1,
        half = parseInt(SIZE / 2),
        curPage = this.props.current,
        total = this.props.total;

      var ClickItem = [];

      if (curPage < half && (curPage + SIZE) > total && total > SIZE) {
        startPage = total - SIZE + 1;
      } else if (curPage + half >= total && total > SIZE) {
        startPage = total - half - parseInt(half / 2);
      } else if (curPage >= half && total > SIZE) {
        startPage = curPage - parseInt(half / 2);
      }

      for (var n = 0; n < SIZE && n < total; n++) {
        var pageNumber = n + startPage;
        if (n === SIZE - 2 && total > SIZE && (total - curPage) > (2 + parseInt(half / 2))) {
          ClickItem.push(<li key={n}>
              <a href="javascript:void 0">...</a>
            </li>);
        } else if (n === SIZE - 1 && total > SIZE && curPage !== total) {
          ClickItem.push(<li className={classNames({active: this.props.current === this.props.total})} key={n}>
              <a href="javascript:void 0" onClick={this.props.onClick.bind(null, total)}>
                {total}
              </a>
            </li>);
        } else {
          ClickItem.push(<li className={classNames({active: this.props.current === pageNumber})} key={n}>
              <a href="javascript:void 0" onClick={this.props.onClick.bind(null, pageNumber)}>
                {pageNumber}
              </a>
            </li>);
        }
      }

      return (
        <ul className="pagination">
          <li className={classNames({disabled: this.props.current === 1})}>
            <a href="javascript:void 0" onClick={this.props.onClick.bind(null, curPage-1)}>上一页</a>
          </li>
          {ClickItem}
          <li className={classNames({disabled: this.props.current === this.props.total})}>
            <a href="javascript:void 0" onClick={this.props.onClick.bind(null, curPage+1)}>下一页</a>
          </li>
        </ul>
      );
    } else {
      return null;
    }
  }
});

module.exports = Pagination;
