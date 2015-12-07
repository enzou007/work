import React from 'react';
import $ from 'jquery';
import Sidebar from './orgFrame/Sidebar.jsx';
import ViewTable from './viewFrame/ViewTable.jsx';
import 'Less/app/orgFrame.less';

const OrgFrame = React.createClass({
  getInitialState: function() {
    return {
      width: this.props.width - $(".org-tree").width() - 15
    };
  },
  componentDidMount: function() {
    this.setState({
      width: this.props.width - $(".org-tree").width() - 15
    })
  },
  componentWillReceiveProps: function(nextProps){
    this.setState({
      width: nextProps.width - $(".org-tree").width() - 15
    })
  },
  render () {
    return (
      <div>
        <div className="org-tree col-xs-3">
          <Sidebar maxHeight={this.props.height}/>
        </div>
        <div className="org-content col-xs-9">
          <ViewTable collection={this.props.collection} column={this.props.column} page={this.props.page} form={this.props.form}
            height={this.props.height} width={this.state.width}/>
        </div>
      </div>
    );
  }
});

export default OrgFrame;
