import React from 'react';
import FormControl from './FormControl.jsx';
import RCTSelect from 'rctui/select';
import styles from 'rctui/src/less/form-control.less'
import classnames from 'classnames';

export class Select extends RCTSelect{

  static defaultProps = {
    dropup: false,
    sep: ',',
    optionTpl: '{text}',
    valueTpl: '{id}'
  }
  handleChange (i, d) {
    if (this.props.readOnly) {
      return;
    }

    let data = this.state.data
    if (this.props.mult) {
      data[i].$checked = !data[i].$checked
      this.setState({ data })
    } else {
      data.map(d => {
        if (typeof d !== 'string') {
          d.$checked = false
        }
      })
      data[i].$checked = true
      this.setState({ data })
      this.close()
    }
    if (this.props.onChange) {
      let value = this.getValue(this.props.sep, data)
      setTimeout(() => {
        this.props.onChange(value, d)
      }, 0)
    }
  }
  componentWillReceiveProps (nextProps) {
    let state = {}
    if(nextProps.value && nextProps.value.toJS){
      nextProps.value = nextProps.value.toJS();
    }
    if (nextProps.value !== this.props.value) {
      state.value = nextProps.value;
    }
    state.data = this.formatData(nextProps.data, state.value);
    this.setState(state);
  }
  render () {
    let active = this.state.active
    let result = []

    let className = classnames(
      this.props.className,
      this.getGrid(),
      styles.control,
      'select',
      {
        active: active,
        readonly: this.props.readOnly,
        dropup: this.state.dropup,
        single: !this.props.mult
      }
    )

    let placeholder = this.state.msg || this.props.placeholder

    let filter = this.props.filterAble ?
                 (<div className="filter">
                    <i className="search" />
                    <input value={this.state.filter}
                      onChange={ e=>this.setState({ filter: e.target.value }) }
                      type="text" />
                  </div>) :
                 null

    let filterText = this.state.filter ?
                     this.state.filter.toLowerCase() :
                     null

    let options = this.state.data.map(function (d, i) {
      if (typeof d === 'string') {
        return <span key={i} className="show group">{d}</span>
      }

      if (d.$checked) {
        if (this.props.mult) {
          result.push(
            <div key={i} className="result"
              onClick={this.handleRemove.bind(this, i)}
              dangerouslySetInnerHTML={{__html: d.$result}}
            />
          )
        } else {
          result.push(<span key={i} dangerouslySetInnerHTML={{__html: d.$result}} />)
        }
      }
      let optionClassName = classnames({
        active: d.$checked,
        show: filterText ? d.$filter.indexOf(filterText) >= 0 : true
      })
      return (
        <li key={i}
          onClick={this.handleChange.bind(this, i, d)}
          className={ optionClassName }
          dangerouslySetInnerHTML={{__html: d.$option}}
        />
      )
    }, this)

    return (
      <div onClick={this.open.bind(this)} style={this.props.style} className={className}>
        { result.length > 0 ? result : <span className="placeholder">{placeholder}&nbsp;</span> }
        <div className="options-wrap">
          <hr />
          <div ref="options" className="options">
            {filter}
            <ul>{options}</ul>
          </div>
        </div>
      </div>
    )
  }
}

FormControl.register('select', function (props) {
  return <Select {...props}/>
}, Select, 'array');
