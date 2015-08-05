
//TODO 使用Immutable重新封装

import _ from 'underscore';

class Config{
  instance = {
    DragOptions: {cursor: 'pointer',zIndex: 2000},
    ConnectionOverlays: [
      ["Arrow", {location: 1}]
    ],
    Container: "canvas"
  };

  anchors = ["TopCenter", "BottomCenter", "LeftMiddle", "RightMiddle"];

  lineWidth = 3;  //线宽
  lineColor = "#CACDCF"; //线色
  lineDoneColor = "#8BC34A"; //线色
  lineHoverColor = "#61B7CF"; //线色

  paintWidth = 3; //连接点 大小
  paintColor = "#7AB02C"; //连接点 颜色

  defaultStyle = {
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

  endpointStyle = (() => {
    var result = {};
    Object.assign(result, this.defaultStyle, {
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
  })()


  endpointReadonlyStyle = (() => {
    var result = {};
    Object.assign(result, this.defaultStyle, {
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
  })()

  getEndpointReadonlyStyle(node){
    var result = {};
    if(node.done){
      Object.assign(result, this.endpointReadonlyStyle, {
          connectorStyle: {
            lineWidth: this.lineWidth,
            strokeStyle: this.lineDoneColor
          },
      });
    }else{
      Object.assign(result, this.endpointReadonlyStyle, {
            connectorStyle: {
              lineWidth: this.lineWidth,
              strokeStyle: this.lineColor
            },
        });
    }
    return result;
  }

  getEndpointStyle(node,option){
    if(option.readonly){
      return this.getEndpointReadonlyStyle(node);
    }else{
      return this.endpointStyle;
    }
  }

}


export default new Config();
