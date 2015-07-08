"use strict";

var React = require("react"),
  _ = require("underscore"),
  classNames = require("classnames");

var Pagination = require("../../../component/bootstrap/Pagination.jsx");

var CollectionType = require("../../../store/viewFrame/queryData")
require("backbone-react-component");

var PagingInfo = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  propTypes: {
    collection: React.PropTypes.instanceOf(CollectionType),
    showInfo: React.PropTypes.bool
  },
  getDefaultProps: function () {
    return {
      showInfo: true
    }
  },
  getInitialState: function () {
    var perPage = this.props.collection.getPerPage(),
      total = this.props.collection.getTotal();
    return {
      initPerPage: perPage,
      pageNumber: Math.ceil(total / perPage)
    };
  },
  componentWillReceiveProps: function (nextProps) {
    var perPage = nextProps.collection.getPerPage(),
      total = nextProps.collection.getTotal();
    this.setState({
      initPerPage: perPage,
      pageNumber: Math.ceil(total / perPage)
    });
  },
  changePage: _.debounce(function (page) {
    if (page >= 1 && page <= this.state.pageNumber) {
      this.getCollection().setPage({
        page: page
      });
    }
  }, 300),
  changePerPage: function (perPage) {
    this.getCollection().setPage({
      page: 1,
      perPage: perPage
    });
  },
  render: function () {
    var current = this.props.collection.getPage(),
      perPage = this.props.collection.getPerPage(),
      total = this.props.collection.getTotal(),
      pageNumber = this.state.pageNumber,
      first = ((current - 1) * perPage) + 1,
      last = Math.min(current * perPage, total);

    var dropNumbers = [
      this.state.initPerPage, 25, 50, 100
    ].sort(function (a, b) {
      return a > b;
    });

    return (
      <div className="paging-info">
        <Pagination current={current} onChange={this.changePage} total={pageNumber}/>
        <div className={classNames("paging-toggle", {hidden: total === 0})}>
          {total > 0 && this.props.showInfo ? (
          <span>显示第 {first} {first !== last ? (
            <span>到第 {last}</span>) : null} 条文档，</span>
          ) : null}
          <span>每页显示
          </span>
          <div className="btn-group dropup">
            <button className="btn btn-white btn-xs dropdown-toggle" data-toggle="dropdown" type="button">
              {perPage}
              <span className="caret"></span>
            </button>
            <ul className="dropdown-menu">
              { dropNumbers.map(function (number, index) { return (
              <li className={classNames({active: number === perPage})} key={index}>
                <a href="javascript:void 0" onClick={this.changePerPage.bind(null, number)}>{number}</a>
              </li>
              ); }.bind(this)) }
            </ul>
          </div>
          <span>
            条文档</span>
          {this.props.showInfo ? (
          <span>， 共
            <span className="badge badge-grey">{total}</span>
            条文档</span>
          ) : null}
        </div>
      </div>
    );
  }
});

module.exports = PagingInfo;
