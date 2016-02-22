var React = require('react');
var PropTypes = React.PropTypes;
var FlowForm = require("View/form/FlowForm.jsx"),
  Fieldset = require("Component/form/Fieldset.jsx"),
  FormControl = require("Component/form/FormControl.jsx");
require("rctui/datetime");
require("rctui/input");
var ZJ = React.createClass({

  render: function() {


    return (
      <FlowForm >
        <div className="form-content" tab="基本信息">
          <Fieldset title="基本信息" >
            <FormControl label="代办人" name="AgentPsn" type="text" readOnly={true}/>
            <FormControl label="时间" name="StDate" type="date"/>
          </Fieldset>
        </div>

      </FlowForm>
    );
  }

});

module.exports = ZJ;
