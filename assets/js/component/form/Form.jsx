let React = require('react')
  let Objects = require('rctui/utils/objects'),
    Classable = require('rctui/mixins/classable'),
    FormControl = require('./FormControl.jsx')
  var store = {};

  let Form = React.createClass({
    displayName: 'Form',
    propTypes: {
      action: React.PropTypes.string,
      children: React.PropTypes.any,
      hintType: React.PropTypes.oneOf([
        'block', 'none', 'pop', 'inline'
      ]),
      layout: React.PropTypes.oneOf([
        'aligned', 'stacked', 'inline'
      ]),
      onSubmit: React.PropTypes.func
    },
    mixins: [Classable],
    getDefaultProps() {
      return {
        layout: 'inline'
      }
    },
    getInitialState() {
      return {
        locked: false,
        data: {}
      }
    },
    getValue() {
      return store;
    },
    setData(data) {
      Objects.forEach(this.refs, (ref, k) => {
        ref.setValue(data[k])
      })
    },
    equalValidate(targetRef, equalRef) {
      let self = this
      return function () {
        let target = self.refs[targetRef]
        if (!target) {
          console.warn(`equal target '${targetRef}' not existed`)
          return false
        }
        let equal = self.refs[equalRef]
        return target.getValue() === equal.getValue()
      }
    },
    getChildren(children) {
      return React.Children.map(children || this.props.children, (child) => {
        let props = {
          hintType: child.props.hintType || this.props.hintType,
          readOnly: child.props.readOnly || this.state.locked,
          layout: this.props.layout
        }
        if (child.type === FormControl) {
          if (!child.props.name) {
            console.warn('FormControl must have a name!')
            return null
          }
          props.store = store;
          props.value = store[child.props.name]
          if (child.props.equal) {
            props.onValidate = this.equalValidate(child.props.equal, child.props.name)
          }

          return React.addons.cloneWithProps(child, props)
        } else if (child.props && typeof child.props.children === 'object') {
          props.children = this.getChildren(child.props.children)
          return React.addons.cloneWithProps(child, props)
        }

        return child
      }, this);
    },
    getReference(name) {
      return this.refs[name]
    },
    handleSubmit(event) {
      if (this.state.locked) {
        return
      }

      event.preventDefault()
      this.setState({
        locked: true
      })
      let success = true
      Objects.forEach(this.refs, function (child) {
        let suc = child.validate()
        success = success && suc
      })
      if (!success) {
        this.setState({
          locked: false
        })
        return
      }

      let data = this.getValue()
    },

    render() {
      let className = this.getClasses('pure-form', {
        'pure-form-aligned': this.props.layout === 'aligned',
        'pure-form-inline': this.props.layout === 'inline',
        'pure-form-stacked': this.props.layout === 'stacked'
      })
      return (
        <form action={this.props.action} className={className} onSubmit={this.handleSubmit}>
          {this.getChildren()}
        </form>
      )
    }
  })
  module.exports = Form
