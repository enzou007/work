var React = require("react"),
    Dropdown = require("../bootstrap/Dropdown.jsx");

var $ = require("jquery");
require("./ztree.min.js");

var Psn = React.createClass({
    getInitialState: function () {
        return {
            show: false
        };
    },
    getDefaultProps: function () {
    
    },
    
    componentDidMount: function () {
        var setting = {
            view: {
                dblClickExpand: false,
                showLine: true,
                selectedMulti: false
            },
            data: {
                simpleData: {
                    enable:true,
                    idKey: "id",
                    pIdKey: "pId",
                    rootPId: ""
                }
            }
        };
        
        var zNodes = [
            {id:1, pId:0, name:"开发部", open:true},
            {id:101, pId:1, name:"姚斌", itcode:"yaobin"},
            {id:102, pId:1, name:"吴凌霄", itcode:"wulingxiao"}
        ]
        
        $.fn.zTree.init($(this.refs.PsnTree.getDOMNode), setting, zNodes);
    },
    toggleShow: function(e) {
        e.preventDefault();
        this.setState({
            show: !this.state.show
        });        
    },
    render: function () {
        return (        
            <Dropdown type="input" icon="fa fa-user bigger-130" className="width-100">
                <div className="dropdown-menu width-100" key="psn">
                    <div className="row">
                        <div className="col-xs-8" ref="PsnTree">
                        
                        </div>
                        <div className="col-xs-4">
                        
                        </div>
                    </div>
                </div>
            </Dropdown>
        );


    }
    
});

module.exports = Psn;
