import _ from 'underscore';
import $ from 'jquery';

class Action{
  constructor(param = {}) {

  }

  saveFlow(flowMapInfo, flowInfo){
    _.each(flowInfo.nodes, (node, index) => {
      _.extend(node, _.find(flowMapInfo,(item) => {
        return item.unid === node.unid;
      }))
    });
    console.log(flowInfo);
    let url = "/1/system/workflow";
    if(flowInfo["@objectId"]){
      url += "/" + flowInfo["@objectId"];
    }

    return $.post(url, {content:JSON.stringify(flowInfo)});
  }


}

export default new Action()
