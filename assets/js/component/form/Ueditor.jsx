import React from 'react';
import FormControl from './FormControl.jsx';
import _ from 'underscore';
import $ from 'jquery';

import './ueditor/ueditor.config.js';
import 'ueditor/ueditor.all.js';
import 'ueditor/lang/zh-cn/zh-cn.js';

//TODO IE11不显示内容  上传图片失败
export default class Ueditor extends React.Component{
  static defaultProps = {
    value: "",
    options: { },
    readOnly: false,
    height: ($(window).height() - 230) < 500 ? 500 : $(window).height() - 230
  }
  static propTypes = {
    readOnly: React.PropTypes.bool
  }
  componentDidMount() {
    this.ue = window.UE.getEditor('richtext_container', _.extend(this.props.options, {
      readonly: this.props.readOnly
    }));
    this.ue.ready(() => {
      this.ue.setContent(this.props.value, false);
      this.ue.setHeight(this.props.height);
    });

    if(this.props.onChange){
      this.ue.addListener( 'contentChange', editor => {
        this.props.onChange();
      })
    }
  }
  getValue(){
    return this.ue.getContent();
  }

  render() {
    return (
      <script id="richtext_container" name="content" type="text/plain"></script>
    );
  }

};

FormControl.register('ueditor', function (props) {
  return <Ueditor {...props}/>
}, Ueditor, 'string');
