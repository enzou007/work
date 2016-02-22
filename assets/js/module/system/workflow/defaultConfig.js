import { fromJS } from 'immutable';

const DEFAULT_INFO = fromJS({
  //流程信息默认值
  flow: {
    name: "新建流程",
    version: 0,
    state: "true",
    keys: "",
    allowReSubmit: "true",
    allowWithdraw: "false",
    allowNotify: "true",
    allowPress: "true",
    allowTo: [],
    defaultReader: [],
    defaultAuthor: [],
    moduleId: [],
    nodes: []
  },
  //处理环节默认值
  task: {
    "@type": "task",
    name: "未命名",
    allowTurn: "true",           //允许转办
    allowApostille: "true",      //允许加签
    allowEmptySkip: "true",      //允许为空跳过
    allowSameSkip: "true",      //允许同一处理人跳过
    allowChangePerson: "false", //允许更改处理人
    signatureType: "ANY",       //环节签批类型 [ANY, ALL, ORDINAL]
    rejectType: "NONE",         //驳回类型 [NONE, START, BEFORE, HISTORY, RANGE]
    rejectRange: [],            //可驳回环节
    sendMessage: "true",        //发送消息
    sendMail: "true",           //发送邮件
    processors: [],             //处理人配置
    outputs: []
  },
  //开始环节默认值
  start: {
    "@type": "start",
    unid: "Start",
    id: "Start",
    name: "开始",
    outputs: []
  },
  //结束环节默认值
  end: {
    "@type": "end",
    unid: "End",
    id: "End",
    name: "结束"
  },
  //文本节点默认值
  text: {
    "@type": "text",
    name: "文本描述"
  },
  //条件环节默认值
  decision: {
    "@type": "decision",
    name: "条件",
    script: "",
    outputs: []
  }
})

export default {
  getDefaultFlowInfo: function(){
    return DEFAULT_INFO.get("flow").toJS();
  },
  getDefaultNode: function(type, x, y, id) {
    let newNode = DEFAULT_INFO.get(type);
    let unid;
    switch (type) {
      case "start":
      case "end":
        return newNode.merge({
          x,
          y
        });
      case "text":
        id = unid = "NODE_UNID_"+new Date().getTime();
        return newNode.merge({
          x,
          y,
          id,
          unid
        });
      case "decision":
      default:
        unid = "NODE_UNID_"+new Date().getTime();
        return newNode.merge({
          x,
          y,
          id,
          unid
        });
    }
  }
}
