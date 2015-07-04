"use strict";

var React = require("react");

var Page_404 = React.createClass({
  render: function() {
    return (
      <div className="page-content-area">
        <div className="row">
          <div className="col-xs-12">
            <div className="error-container">
              <h1 className="grey lighter smaller">
                <span className="blue bigger-125">
                  <i className="ace-icon fa fa-sitemap"/>&nbsp;404
                </span>
                &nbsp;Page Not Found
              </h1>
              <hr/>
              <h3 className="lighter smaller">
                We looked everywhere but we couldn't find it!</h3>
              <div>
                <form className="form-search">
                  <span className="input-icon align-middle">
                    <i className="ace-icon fa fa-search"/>
                    <input className="search-query" placeholder="Give it a search..." type="text"/></span>
                  <button className="btn btn-sm" type="button">
                    Go!
                  </button>
                </form>
                <div className="space"></div>
                <h4 className="smaller">Try one of the following:
                </h4>
                <ul className="list-unstyled spaced inline bigger-110 margin-15">
                  <li>
                    <i className="ace-icon fa fa-hand-o-right blue"/>
                    Re-check the url for typos
                  </li>
                  <li>
                    <i className="ace-icon fa fa-hand-o-right blue"/>
                    Read the faq
                  </li>
                  <li><i className="ace-icon fa fa-hand-o-right blue"/>
                    Tell us about it
                  </li>
                </ul>
              </div><hr/>
              <div className="space"></div>
              <div className="center">
                <a className="btn btn-grey" href="javascript:history.back()">
                  <i className="ace-icon fa fa-arrow-left"/>
                  Go Back</a>
                <a className="btn btn-primary" href="#">
                  <i className="ace-icon fa fa-tachometer"/>
                  Dashboard</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Page_404;
