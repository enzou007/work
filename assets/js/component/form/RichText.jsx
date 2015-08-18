import React from 'react';
import FormControl from './FormControl.jsx';
import _ from 'underscore';

import 'ueditor/dist/utf8-jsp/ueditor.config.js';

import 'ueditor/dist/utf8-jsp/ueditor.all.js';
import 'ueditor/dist/utf8-jsp/lang/zh-cn/zh-cn.js';

import '../../../less/component/richtext/ueditor.css';

export default class RichText extends React.Component{

  static defaultProps = {
    value: "",
    options: { },
    readonly: true
  }
  componentDidMount() {
    this.ue = window.UE.getEditor('richtext_container', _.extend(this.props.options, {
      readonly: this.props.readonly
    }));
    this.ue.ready(() => {
      this.ue.setContent(this.props.value, false);
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
