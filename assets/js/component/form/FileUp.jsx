import React from 'react';
import FormControl from './FormControl.jsx';
import _ from 'underscore';

var $ = window.jQuery = window.$ = require("jquery");
var WebUploader = window.WebUploader = require("fex-webuploader");

import '../../../less/component/fileup.less';

export default class FileUp extends React.Component {

  static propTypes = {

  }

  static defaultProps = {
    options: {
      swf: "fex-webuploader/dist/Uploader.swf"
    }
  }

  state = {
    files: this.formatData(this.props.value),
    percentage: 0
  }
  formatData(value) {
    let rst = { }
    if(value){
      value = value.toJS();
      for(let i = 0; i < value.length; i++){
        rst[value[i].id] = value[i];
      }
    }
    return rst;
  }
  componentWillReceiveProps (nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setState({
        files: this.formatData(nextProps.value)
      });
    }
  }
  componentDidMount() {
    this.uploader = window.uploader = WebUploader.create(_.extend(this.props.options, {
      pick: "#picker",
      server: "1/system/fileSystemServer/",
      method: "POST"
    }));

    this.uploader.on("fileQueued", file => {
      this.addFile(file);
    })

    this.uploader.on("uploadProgress", (file, percentage) => {
      this.setState({ percentage })
    })

    this.uploader.on("uploadSuccess", (file, res) => {
      this.state.files[file.id].originPath = res.originPath;
      this.setState({
        files: this.state.files
      })
      if(this.props.onChange){
        this.props.onChange();
      }
    })
  }
  componentWillUnmount() {
    this.uploader.destroy();
  }

  getValue(){
    let rst = [];
    _.map(this.state.files, (file) => {
      rst.push({
        originPath: file.originPath,
        id: file.id,
        name: file.name
      });
    })
    return rst;
  }

  addFile(file){
    this.state.files[file.id] = file;
    this.setState({
      files: this.state.files
    });
  }

  removeFile(file, index){
    if(file.Status){
      this.uploader.removeFile(file, true);
    }
    // TODO 删除服务器的附件
    delete this.state.files[file.id];
    this.setState({files: this.state.files});
  }

  UploaderStart(){
    this.uploader.upload();
  }

  getFileList() {
    var files = [];
    _.each(this.state.files, (file, index) => {
      files.push(
        <div className="file-item" key={file.id}>
          <a href={file.originPath} target="_blank">{file.name}</a>
          <i className="fa fa-close" onClick={this.removeFile.bind(this, file, index)}></i>
        </div>
      )
    })
    return files;
  }

  render() {
    return (
      <div className="wu-example">
        <div className="file-list">
          {this.getFileList()}
        </div>
        <div className="file-operates">
          <div id="picker">选择文件</div>
          <div id="ctlBtn" className="btn btn-default" onClick={this.UploaderStart.bind(this)}>开始上传({this.state.percentage})</div>
        </div>
      </div>
    );
  }
}

FormControl.register('file', function (props) {
  return <FileUp {...props}/>
}, FileUp, 'Set');
