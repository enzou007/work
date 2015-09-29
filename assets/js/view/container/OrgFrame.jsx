import React from 'react'

import '../../../less/app/orgFrame.less'
const OrgFrame = React.createClass({
  render () {
    return (
      <div className="org-container row">
        <div className="org-tree col-xs-3">OrgTree</div>
        <div className="org-content col-xs-9">
          <div className="org-header col-xs-12">
            OrgHeader
          </div>
          OrgContent
        </div>
      </div>
    );
  }
});

export default OrgFrame;
