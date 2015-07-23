import React from "react";
import _ from "underscore";
import classnames from "classnames";

import Dropdown from "../../../component/bootstrap/Dropdown.jsx";
import Pagination from "../../../component/bootstrap/Pagination.jsx";

import CollectionType from "../../../store/viewFrame/queryData";

import "backbone-react-component";

const PagingInfo = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  propTypes: {
    collection: React.PropTypes.instanceOf(CollectionType),
    showInfo: React.PropTypes.bool
  },
  getDefaultProps() {
    return {
      showInfo: true
    }
  },
  getInitialState() {
    let perPage = this.props.collection.getPerPage();
    return {
      initPerPage: perPage
    };
  },
  componentWillReceiveProps(nextProps) {
    let perPage = nextProps.collection.getPerPage();
    this.setState({
      initPerPage: perPage
    });
  },
  changePage(page) {
    let pages = Math.ceil(this.getCollection().getTotal() / this.getCollection().getPerPage());
    if (page >= 1 && page <= pages) {
      this.getCollection().setPage({
        page: page
      });
    }
  },
  changePerPage(perPage) {
    this.getCollection().setPage({
      page: 1,
      perPage: perPage
    });
  },
  render() {
    let current = this.props.collection.getPage(),
      perPage = this.props.collection.getPerPage(),
      total = this.props.collection.getTotal(),
      pageNumber = Math.ceil(total / perPage),
      first = ((current - 1) * perPage) + 1,
      last = Math.min(current * perPage, total);

    let dropNumbers = [
      this.state.initPerPage, 25, 50, 100
    ].sort(function (a, b) {
      return a > b;
    });

    return (
      <div className="paging-info">
        <Pagination current={current} onChange={this.changePage} total={pageNumber}/>
        <div className={classnames("paging-toggle", {hidden: total === 0})}>
          {total > 0 && this.props.showInfo ? (
          <span>显示第 {first} {first !== last ? (
            <span>到第 {last}</span>) : null} 条文档，</span>
          ) : null}
          <span>每页显示
          </span>
          <Dropdown className="btn-group" dropup={true}>
            <button className="btn btn-white btn-xs" type="button">
              {perPage}
              <span className="caret"></span>
            </button>
            <ul>
              { dropNumbers.map((number, index) => { return (
              <li className={classnames({active: number === perPage})} key={index}>
                <a href="javascript:void 0" onClick={this.changePerPage.bind(this, number)}>{number}</a>
              </li>
              ); }) }
            </ul>
          </Dropdown>
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

export default PagingInfo;
