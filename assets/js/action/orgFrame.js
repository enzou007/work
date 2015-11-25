var Backbone = require("backbone"),
  _ = require("underscore"),
  $ = require("jquery");

var QueryData = require("../store/viewFrame/queryData");
var OrgFrame = function () {
  this._dataCollection = null;
  this._activated = null;
  this._option = null;
  this._activeDept = {};
};
_.extend(OrgFrame.prototype, Backbone.Events, {
  bind: function (moduleOption) {
    this._option = moduleOption;
    this.toggleChangeItem({
      type: "personnel",
      departmentId: "N000026",
      condition: [["departmentId", "=", "N000026"]]
    });
    return this;
  },
  buildDataCollection: function(type) {
    return new QueryData(null, {
      model: this._activated.Model,
      url: this.getPath()
    });
  },
  setActiveItem: function(option){
    if(this._activated != this._option.View[option.type]){
      this._activated = this._option.View[option.type];
      this._dataCollection = this.buildDataCollection();
      
    }
    this._activated._departmentId = option.departmentId;
  },
  getColumns: function(){
    return this._activated.columns;
  },
  getPath(){
    return this._activated.url;
  },
  getFormPath: function(){
    return this._activated.formPath;
  },
  getPage: function(){
    return this._activated.page || this._option.page;
  },
  getDataCollection: function() {
    return this._dataCollection;
  },

  refreshDataCollection: function() {
    this._dataCollection.fetch({
      total: true,
      reset: true
    });
  },
  deleteSelectedData: function() {
    var objectIds = _.map(this._dataCollection.selected, function(model){
      return model.get("@objectId");
    }).join(";");

    return $.post(this._dataCollection.url+"/delete", {objectIds:objectIds})
      .done(function(){
        this._dataCollection.fetch({
          reset: true
        });
      }.bind(this));
  },
  toggleChangeItem: function(option) {
    this.setActiveItem(option);
    if(option.type !== "default"){
      if(option.condition){
        this._dataCollection.setCondition(option.condition);
      }else{
        this._dataCollection.setCondition([[]]);
      }
      this.refreshDataCollection();
    }
  },
  toggleSearchItem: function(key){
    this._dataCollection.setCondition([["@key", "", key]]);
    this.refreshDataCollection();
  },
  modifyDepartment(departmentId, departmentName){
    departmentId = departmentId || this._activated._departmentId;
    window.open(`${this.getPage()}?form=${this._option.View.department.formPath}&path=${this._option.View.department.url}&objectId=${departmentId}`)
  },
  createDepartment(departmentId, departmentName){
    departmentId = departmentId || this._activated._departmentId || "";
    if(departmentId){
      window.open(`${this.getPage()}?form=${this._option.View.department.formPath}&path=${this._option.View.department.url}&parent=${departmentId}`)
    }else{
      window.open(`${this.getPage()}?form=${this._option.View.department.formPath}&path=${this._option.View.department.url}`)
    }
  },
  createPersonnel(departmentId, departmentName){
    departmentId = departmentId || this._activated._departmentId || "";
    if(departmentId){
      window.open(`${this.getPage()}?form=${this._option.View.personnel.formPath}&path=${this._option.View.personnel.url}&parent=${departmentId}`)
    }else{
      window.open(`${this.getPage()}?form=${this._option.View.personnel.formPath}&path=${this._option.View.personnel.url}`)
    }

  },
  modifyPersonnel(personnelId){
    window.open(`${this.getPage()}?form=${this._option.View.personnel.formPath}&path=${this._option.View.personnel.url}&objectId=${personnelId}`)
  }
})

module.exports = new OrgFrame();
