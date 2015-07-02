"use strict";

var React = require("react"),
  _ = require("underscore");

require("backbone-react-component");

var App = React.createClass({
  mixins: [Backbone.React.Component.mixin],
  render: function () {

    return (
      <div className="no-skin">

      </div>
    );
  }
});
module.exports = App;
