"use strict";

var _ = require("underscore");

var Config = function(){
  this.instance = {
    DragOptions: {cursor: 'pointer',zIndex: 2000},
    ConnectionOverlays: [
      ["Arrow", {location: 1}]
    ],
    Container: "canvas"
  };

  this.anchors = ["TopCenter", "BottomCenter", "LeftMiddle", "RightMiddle"];

  this.lineWidth = 3;  //线宽
  this.lineColor = "#CACDCF"; //线色
  this.lineDoneColor = "#8BC34A"; //线色
  this.lineHoverColor = "#61B7CF"; //线色

  this.paintWidth = 3; //连接点 大小
  this.paintColor = "#7AB02C"; //连接点 颜色

  this.defaultStyle = {
    isSource: true,  //可为起点
    isTarget: true,  //可为终点
    maxConnections: -1,  //不限制连接数
    endpoint: "Dot", //连接点形状(圆形)

    // //连接点样式
    // paintStyle: {
    //   strokeStyle: this.paintColor,
    //   radius: this.paintWidth,
    //   lineWidth: 2
    // },
    //连接线配置
    connector: [
      "Flowchart", {
        stub: [40, 60],
        gap: 10,
        cornerRadius: 5,
        alwaysRespectStubs: true
      }
    ],
    //连接线样式
    connectorStyle: {
      lineWidth: this.lineWidth,
      strokeStyle: this.lineDoneColor
    },
    // //连接线hover样式
    // connectorHoverStyle: {
    //   lineWidth: this.lineWidth,
    //   strokeStyle: this.lineHoverColor
    // },
    overlays: [
      [
        "Label", {
          location: [
            0.5, 1.5
          ],
          label: "",
          cssClass: "endpointSourceLabel"
        }
      ]
    ]
  }

  this.endpointStyle = (function(){
    var result = {};
    _.extend(result,this.defaultStyle,{
      paintStyle: {
        strokeStyle: this.paintColor,
        radius: this.paintWidth,
        lineWidth: 2
      },
      connectorHoverStyle: {
        lineWidth: this.lineWidth,
        strokeStyle: this.lineHoverColor
      }
    });

    return result;
  }.bind(this))()


  this.endpointReadonlyStyle = (function(){
    var result = {};
    _.extend(result,this.defaultStyle,{
      isSource:false,
      isTarget:false,
      maxConnections:-1,
      paintStyle: {
        strokeStyle: "",
        radius: this.paintWidth,
        lineWidth: 2
      }
    });

    return result;
  }.bind(this))()

  this.getEndpointReadonlyStyle = function(node){
    var result = {};
    if(node.done){
      _.extend(result,this.endpointReadonlyStyle,{
          connectorStyle: {
            lineWidth: this.lineWidth,
            strokeStyle: this.lineDoneColor
          },
      });
    }else{
      _.extend(result,this.endpointReadonlyStyle,{
            connectorStyle: {
              lineWidth: this.lineWidth,
              strokeStyle: this.lineColor
            },
        });
    }
    return result;
  }

  this.getEndpointStyle = function(node,option){
    if(option.readonly){
      return this.getEndpointReadonlyStyle(node);
    }else{
      return this.endpointStyle;
    }
  }

  this.lineStyle = function() {
    // {
    //   endpoints:["Blank", "Blank" ],
    //   paintStyle:{strokeStyle:this.lineColor,lineWidth:3},
    //   connector:["Flowchart", {stub: [40, 60],gap: 10,cornerRadius: 5,alwaysRespectStubs: true}]
    // }
  }
}


module.exports = window.Config = new Config();
