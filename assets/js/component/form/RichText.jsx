import React from 'react';
import FormControl from './FormControl.jsx';
import _ from 'underscore';
import $ from 'jquery';

import './lib/ueditor/ueditor.config.js';

import './lib/ueditor/ueditor.all.js';
import './lib/ueditor/zh-cn.js';

import '../../../less/component/richtext/ueditor.css';
//TODO IE11不显示内容  上传图片失败
export default class RichText extends React.Component{

  static defaultProps = {
    value: "",
    options: { },
    readOnly: false,
    height: ($(window).height() - 230) < 500 ? 500 : $(window).height() - 230
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

FormControl.register('richtext', function (props) {
  return <RichText {...props}/>
}, RichText, 'string');
