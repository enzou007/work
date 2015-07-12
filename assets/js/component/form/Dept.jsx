"use strict";

var React = require("react"),
    Dropdown = require("../bootstrap/Dropdown.jsx");
var Tree = require("rctui/Tree");

var treeData = [
    {"id": "account","text": "账户管理","icon": "user","children": [
        {
          "id": "user_list","text": "用户管理","children": [
              {"id": "user_edit","text": "编辑"}
            ]
        },
        {
          "id": "role_list",
          "text": "角色管理",
          "children": [
            {
              "id": "role_edit",
              "text": "编辑"
            },
            {
              "id": "role_delete",
              "text": "删除"
            }
          ]
        }
      ]
    },
    {
      "id": "sys",
      "text": "系统设置",
      "icon": "cogs",
      "children": [
        {
          "id": "system_log",
          "text": "系统日志"
        },
        {
          "id": "config_list",
          "text": "参数设置",
          "children": [
            {
              "id": "config_edit",
              "text": "编辑"
            },
            {
              "id": "config_delete",
              "text": "删除"
            }
          ]
        }
      ]
    }
  ]


var Dept = React.createClass({

    getInitialState: function () {
        return {
            selectedValue: []
        };
    },
    getDefaultProps: function () {

    },

    componentWillMount: function () {

    },
    toggleShow: function(e) {
        e.preventDefault();
        this.setState({
            show: !this.state.show
        });
    },
    handleChange: function(item){
      this.setState({
        selectedValue:item
      });
    },
    render: function () {
        return (
            <Dropdown type="input" icon="fa fa-sitemap" className="width-100" value={this.state.selectedValue} clickMenuClose={false}>
                <span className="width-100 row">
                  <div className="col-xs-8" ref="PsnTree">
                    <Tree data={treeData} textTpl="{text}({id})" valueTpl="{id}" open={true} checkAble={true} onChange={this.handleChange}/>
                  </div>
                </span>
            </Dropdown>
        );
    }
});

module.exports = Dept;
