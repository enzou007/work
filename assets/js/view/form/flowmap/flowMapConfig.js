
//TODO 使用Immutable重新封装

import _ from 'underscore';

class Config{
  defaultLineColor = "#CACDCF"
  doneLineColor = "#8BC34A"
  
  connectorPaintStyle = {
      lineWidth:3,
      strokeStyle: "#CACDCF",//"#49afcd",
      joinstyle:"round"
  }

  connectorHoverStyle = {
      lineWidth:3,
      strokeStyle:"#da4f49"
  }
  instance = {
    Container: "canvas",
    DragOptions : { cursor: 'pointer'},
    EndpointStyle : { fillStyle:'#CACDCF' },
    Endpoint : [ "Dot", {radius:1} ],
    ConnectionOverlays : [
        [ "Arrow", { location:1 } ],
        [ "Label", {
                location:0.1,
                id:"label",
                cssClass:"aLabel"
            }]
    ],
    Anchor : 'Continuous',
    ConnectorZIndex:5,
    //HoverPaintStyle: this.connectorHoverStyle
  };

  source = {
      filter: ".flow-anchor",
      anchor: "Continuous",
      endpoint:[ "Dot", { radius:1 } ],
      connector:[ "Flowchart", { stub:[5, 5] } ],
      //connectorStyle: this.connectorPaintStyle,
      //hoverPaintStyle: this.connectorHoverStyle,
      dragOptions:{},
      maxConnections:-1
  }

  target = {
      dropOptions:{ hoverClass:"hover", activeClass:"active" },
      anchor:"Continuous",
      maxConnections:-1,
      endpoint:[ "Dot", { radius:1 } ],
      //paintStyle:{ fillStyle:"#CACDCF",radius:1 },
      //hoverPaintStyle: this.connectorHoverStyle
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
