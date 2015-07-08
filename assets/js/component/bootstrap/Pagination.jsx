"use strict";

var React = require("react"),
  classNames = require("classnames");

var Rcslider = require('rc-slider');

var Pagination = React.createClass({
  propTypes: {
    current: React.PropTypes.number,
    total: React.PropTypes.number.isRequired,
    size: React.PropTypes.number,
    onChange: React.PropTypes.func.isRequired
  },
  getDefaultProps: function () {
    return {
      current: 1,
      size: 7
    };
  },
  render: function () {
    var size = this.props.size,
      curPage = this.props.current,
      total = this.props.total,
      left,
      right;

    left = curPage - Math.floor(size / 2) + 1;
    if (left < 1) {
      left = 1;
    }
    right = left + size - 2;
    if (right >= total) {
      right = total;
      left = right - size + 2;
      if (left < 1) {
        left = 1
      }
    } else {
      right -= left > 1 ? 1 : 0
    }

    var ClickItem = [];
    var i = left
    if (left > 1) {
      ClickItem.push(this._pageItemBuilder(1));
      if (left > 2) {
        ClickItem.push(this._pageJumperBuilder("left", total));
        i++
      }
    }
    for (; i < right + 1; i++) {
      ClickItem.push(this._pageItemBuilder(i));
    }
    if (right < total) {
      ClickItem[ClickItem.length - 1] = this._pageJumperBuilder("right", total);
      ClickItem.push(this._pageItemBuilder(total));
    }

    return (
      <ul className="pagination">
        <li className={classNames({disabled: curPage <= 1})} key="prev" onClick={this.props.onChange.bind(null, curPage-1)}>
          <a>上一页</a>
        </li>
        {ClickItem}
        <li className={classNames({disabled: curPage >= total})} key="next" onClick={this.props.onChange.bind(null, curPage+1)}>
          <a>下一页</a>
        </li>
      </ul>
    );
  },
  _pageJumperBuilder: function (position, max) {
    return (
      <li className="dropup" key={"jumper"+position}>
        <a className="dropdown-toggle" data-toggle="dropdown" href="#more">...</a>
        <div className={"page-jumper dropdown-menu dropdown-menu-"+position}>
          <input type="range" defaultValue={this.props.current} min={1} max={max} onChange={function (event) {
            this.props.onChange.call(this, parseInt(event.target.value));
          }.bind(this)}/>
        </div>
      </li>
    );
  },
  _pageItemBuilder: function (pageNumber) {
    return (
      <li className={classNames({active: this.props.current === pageNumber})} key={pageNumber} onClick={this.props.onChange.bind(null, pageNumber)}>
        <a>
          {pageNumber}
        </a>
      </li>
    );
  }
});

module.exports = Pagination;
