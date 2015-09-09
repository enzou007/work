import React from 'react';
import FormControl from './FormControl.jsx';
import _ from 'underscore';
import Gritter from 'Component/Gritter.jsx';

var WebUploader = require("fex-webuploader/src/preset/withoutimage");

import '../../../less/component/fileup.less';

export default class FileUp extends React.Component {

  static propTypes = {
    readOnly: React.PropTypes.bool
  }

  static defaultProps = {
    options: {
      swf: "fex-webuploader/dist/Uploader.swf"
    }
  }

  state = {
    files: this.formatData(this.props.value),
    progress: 0,
    showProgress: false
  }

  formatData(value) {
    let rst = { }
    if(value){
      value = value.toJS();
      for(let i = 0; i < value.length; i++){
        rst[value[i]._guid] = value[i];
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
    if(!this.props.readOnly){
      this.initUploader();
    }
  }
  componentWillUnmount() {
    if(!this.props.readOnly){
      this.uploader.destroy();
    }
  }
  totalSize = 0.0
  uploaderSize = 0.0
  initUploader(){
    this.uploader = WebUploader.create(_.extend(this.props.options, {
      pick: {
        id: this.refs.picker.getDOMNode()
      },
      server: "1/system/fileSystemServer/",
      method: "POST",
      fileVal: "file",
      auto: true
    }));

    this.uploader.on("fileQueued", file => {
      this.addFile(file);
    });

    this.uploader.on("startUpload", file => {
      this.setState({
        progress: 0,
        showProgress: true
      });
    });

    this.uploader.on("uploadProgress", (file, progress) => {
      progress = (progress * file.size + this.uploaderSize) / this.totalSize;
      this.setState({ progress });
      {
        progress: progress
      }
    });

    this.uploader.on("uploadSuccess", (file, res) => {
      let showProgress = false;
      this.state.files[file._guid].originPath = res.originPath;
      this.setState({
        files: this.state.files
      });

      this.uploaderSize += file.size;

      if(this.props.onChange){
        this.props.onChange();
      }
      this.Alert("[" + file.name + "] 上传成功!");
    });

    this.uploader.on("uploadError", (file, res) => {
      this.Alert("[" + file.name + "] 上传失败!", "error");
    });

    this.uploader.on("uploadFinished", () => {
      this.setState({ progress: 1 }, () => {
        setTimeout(() => this.setState({
          showProgress: false
        }), 1000)
      });
    })
  }

  getValue(){
    let rst = [];
    _.map(this.state.files, (file) => {
      rst.push({
        originPath: file.originPath,
        _guid: file._guid,
        name: file.name
      });
    })
    return rst;
  }

  addFile(file){
    file._guid = new Date().getTime().toString(16);
    this.state.files[file._guid] = file;
    this.totalSize += file.size;
    this.setState({
      files: this.state.files
    });
  }

  removeFile(file, index){
    if(!file.originPath){
      this.totalSize -= file.size;
      this.uploader.removeFile(file, true);
    }
    // TODO 删除服务器的附件
    delete this.state.files[file._guid];
    this.setState({files: this.state.files});
    if(this.props.onChange){
      this.props.onChange();
    }
  }

  UploaderStart(){

    this.uploader.upload();
  }

  getFileList() {
    var files = [];
    _.each(this.state.files, (file, index) => {
      files.push(
        <div className={"file-item"+(file.originPath ? " file-succeed" : "")}  key={index}>
          <a href={file.originPath} target="_blank">{file.name}</a>
          {this.props.readOnly ? null :
            <i className="fa fa-close" onClick={this.removeFile.bind(this, file, index)}></i>
          }
        </div>
      )
    })
    return files;
  }

  render() {
    return (
      <div className="file-container">
        {this.props.readOnly ? null :
          [(this.state.showProgress? <div className="progress progress-striped active myprogress">
            <div className="progress-bar progress-bar-success" style={{width: (+this.state.progress * 100) + "%"}}></div>
          </div>: null),
          <div className="file-operates">
            <div className="operate-item" ref="picker"><i className="fa fa-plus"></i>添加</div>
            <div className="operate-item" onClick={this.UploaderStart.bind(this)}><i className="fa fa-save"></i>上传</div>
          </div>]
        }
        <div className="file-list">
          {this.getFileList()}
        </div>
      </div>
    );
  }

  Alert(text, result = "succeed"){
    let id = Gritter.add({
      title: '提示',
      time: 3000,
      class_name: "gritter-light " + (result === "succeed"
        ? "gritter-success"
        : "gritter-error"),
      text: (
        <div>
          <h5>{text}</h5>
          <div style={{textAlign: "right"}}>
            <a className="btn btn-sm btn-primary" onClick={() => Gritter.remove(id)}>确定</a>
          </div>
        </div>
      )
    });
  }
}

FormControl.register('file', function (props) {
  return <FileUp {...props}/>
}, FileUp, 'Set');
