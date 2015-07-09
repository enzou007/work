"use strict";

var React = require("react"),
  _ = require("underscore"),
  classNames = require("classnames");

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
  componentDidUpdate: function (prevProps, prevState) {
    var refs = this.refs,
      current = this.props.current;
      // 由于无法刷新defaultValue属性，需要使用js强制更新Orz
    [
      "left", "right"
    ].forEach(function (key) {
      var node = refs["jumper-" + key];
      if (node) {
        node.getDOMNode().value = current;
      }
    });
  },
  trigger: function (page, event) {
    this.props.onChange(page);
    if(event){
      event.preventDefault();
    }
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
        left = 1;
      }
    } else {
      right -= left > 1 ? 1 : 0;
    }

    var ClickItem = [];
    var i = left;
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
      if (size < total) {
        ClickItem[ClickItem.length - 1] = this._pageJumperBuilder("right", total);
      }
      ClickItem.push(this._pageItemBuilder(total));
    }

    return (
      <ul className="pagination">
        <li className={classNames({disabled: curPage <= 1})} key="prev" onClick={this.trigger.bind(null, curPage-1)}>
          <a href="javascript:prev">上一页</a>
        </li>
        {ClickItem}
        <li className={classNames({disabled: curPage >= total})} key="next" onClick={this.trigger.bind(null, curPage+1)}>
          <a href="javascript:next">下一页</a>
        </li>
      </ul>
    );
  },
  _pageJumperTrigger: _.debounce(function (value) {
    this.trigger.call(this, value);
  }, 300),
  _pageJumperBuilder: function (position, max) {
    var handle = function (event) {
      this._pageJumperTrigger(parseInt(event.target.value), event);
    }.bind(this);

    return (
      <li className="dropup" key={"jumper"+position}>
        <a className="dropdown-toggle" data-toggle="dropdown" href="javascript:more">...</a>
        <div className={"page-jumper dropdown-menu dropdown-menu-"+position}>
          <input max={max} min={1} onMouseUp={handle} onChange={handle} ref={"jumper-"+position} type="range"/>
        </div>
      </li>
    );
  },
  _pageItemBuilder: function (pageNumber) {
    return (
      <li className={classNames({active: this.props.current === pageNumber})} key={pageNumber} onClick={this.trigger.bind(null, pageNumber)}>
        <a href={"javascript:"+pageNumber}>
          {pageNumber}
        </a>
      </li>
    );
  }
});

module.exports = Pagination;
