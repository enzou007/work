var Moudles = {
  "5582272444ae2b5937e53911": {
    "flows": [{
      "objectId": "5582272444ae2b5937e53930",
      "name": "新闻发布申请"
    }]
  },
  "5582272444ae2b5937e53909": {
    "flows": [{
      "objectId": "5582272444ae2b5937e53931",
      "name": "入职申请"
    }]
  },
  "5582272444ae2b5937e5390801": {
    "flows": [{
      "objectId": "5582272444ae2b5937e53932",
      "name": "请假申请"
    }]
  },
}

module.exports = function (data) {
  return {json:Moudles[data.params.moduleId]};
}
