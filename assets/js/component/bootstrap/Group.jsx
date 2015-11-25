
import React from 'react';
import classnames from 'classnames';
import $ from 'jquery';
import _ from 'underscore';
import Scroll from 'Component/Scrollbar.jsx'

export default class Group extends React.Component {
  state = {
    openId: this.props.defaultOpen
  }
  componentWillMount() {

    $(document).on('click.group', '[data-toggle="collapse"]', function(e) {
      var $this   = $(this);

      if (!$this.attr('data-target')) e.preventDefault();

      var $target = getTargetFromTrigger($this);
      var data    = $target.data('bs.collapse');
      var option  = data ? 'toggle' : $this.data();

      Plugin.call($target, option);
    })
  }
  componentWillUnmount() {
    $(document).off('click.group');
  }
  toggleClick(e, openId){
    this.setState({
      openId
    })
  }
  /*
  render() {
    let scrollHeight = this.props.maxHeight ? (this.props.maxHeight - this.props.children.length * 43) + "px" : "100%";
    return (
      <div id="accordion" className="panel-group accordion-style1 accordion-style2">
        {
          React.Children.map(this.props.children, function (child, index) {
            child.props.className = classnames(child.props.className, " panel-collapse", {
              "in": child.props.open,
              "collapse": !child.props.open,
            });

            return (
              <div className="panel panel-default">
                <div className="panel-heading panel-title">
                    <a aria-expanded="false" className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion" data-target={"#" + child.props.id}>
      								<i class="bigger-110 icon-angle-right" data-icon-hide="icon-angle-down" data-icon-show="icon-angle-right"></i>
      								{child.props.tab}
      							</a>
                </div>
                <div className="panel-body">
                {child}
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
*/

  render() {
    let scrollHeight = this.props.maxHeight ? (this.props.maxHeight - this.props.children.length * 43) + "px" : "100%";
    return (
      <div id="accordion" className="panel-group accordion-style1 accordion-style2">
        {
          React.Children.map(this.props.children, (child, index) => {
            let cs = classnames(child.props.className, "panel-collapse", {
              "in": this.state.openId === child.props.id,
              "collapse": this.state.openId !== child.props.id
            });
            if(!child.props.id){
              child.props.id = "Group_" + index
            }
            return (
              <div className="panel panel-default">
                <div className="panel-heading panel-title">
                    <a aria-expanded="false" className="accordion-toggle collapsed" data-toggle="collapse" data-parent="#accordion"
                      onClick={this.toggleClick.bind(this,child.props.id)} data-target={"#" + child.props.id}>
                      <i className="bigger-110 icon-angle-right" data-icon-hide="icon-angle-down" data-icon-show="icon-angle-right"></i>
                      {child.props.tab}
                    </a>
                </div>
                <div className={cs} id={child.props.id} style={{width: "100%"}}>
                  <Scroll style={{height: scrollHeight, width:"100%"}} className="panel-body ex3"  autoshow={true}>
                    {child.props.children}
                  </Scroll>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }

}

var Collapse = function (element, options) {
  this.$element      = $(element)
  this.options       = $.extend({}, Collapse.DEFAULTS, options)
  this.$trigger      = $('[data-toggle="collapse"][data-target="#' + element.id + '"]')
  this.transitioning = null

  if (this.options.parent) {
    this.$parent = this.getParent()
  } else {
    this.addAriaAndCollapsedClass(this.$element, this.$trigger)
  }

  if (this.options.toggle) this.toggle()
}

Collapse.TRANSITION_DURATION = 350

Collapse.DEFAULTS = {
  toggle: true
}

Collapse.prototype.dimension = function () {
  var hasWidth = this.$element.hasClass('width')
  return hasWidth ? 'width' : 'height'
}

Collapse.prototype.show = function () {
  if (this.transitioning || this.$element.hasClass('in')) return

  var activesData
  var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

  if (actives && actives.length) {
    activesData = actives.data('bs.collapse')
    if (activesData && activesData.transitioning) return
  }

  var startEvent = $.Event('show.bs.collapse')
  this.$element.trigger(startEvent)
  if (startEvent.isDefaultPrevented()) return

  if (actives && actives.length) {
    Plugin.call(actives, 'hide')
    activesData || actives.data('bs.collapse', null)
  }

  var dimension = this.dimension()

  this.$element
    .removeClass('collapse')
    .addClass('collapsing')[dimension](0)
    .attr('aria-expanded', true)

  this.$trigger
    .removeClass('collapsed')
    .attr('aria-expanded', true)

  this.transitioning = 1

  var complete = function () {
    this.$element
      .removeClass('collapsing')
      .addClass('collapse in')[dimension]('')
    this.transitioning = 0
    this.$element
      .trigger('shown.bs.collapse')
  }

  if (!$.support.transition) return complete.call(this)

  var scrollSize = $.camelCase(['scroll', dimension].join('-'))

  this.$element
    .one('bsTransitionEnd', $.proxy(complete, this))
    .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
}

Collapse.prototype.hide = function () {
  if (this.transitioning || !this.$element.hasClass('in')) return

  var startEvent = $.Event('hide.bs.collapse')
  this.$element.trigger(startEvent)
  if (startEvent.isDefaultPrevented()) return

  var dimension = this.dimension()

  this.$element[dimension](this.$element[dimension]())[0].offsetHeight

  this.$element
    .addClass('collapsing')
    .removeClass('collapse in')
    .attr('aria-expanded', false)

  this.$trigger
    .addClass('collapsed')
    .attr('aria-expanded', false)

  this.transitioning = 1

  var complete = function () {
    this.transitioning = 0
    this.$element
      .removeClass('collapsing')
      .addClass('collapse')
      .trigger('hidden.bs.collapse')
  }

  if (!$.support.transition) return complete.call(this)

  this.$element
    [dimension](0)
    .one('bsTransitionEnd', $.proxy(complete, this))
    .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
}

Collapse.prototype.toggle = function () {
  this[this.$element.hasClass('in') ? 'hide' : 'show']()
}

Collapse.prototype.getParent = function () {
  return $(this.options.parent)
    .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
    .each($.proxy(function (i, element) {
      var $element = $(element)
      this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
    }, this))
    .end()
}

Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
  var isOpen = $element.hasClass('in')

  $element.attr('aria-expanded', isOpen)
  $trigger
    .toggleClass('collapsed', !isOpen)
    .attr('aria-expanded', isOpen)
}

function getTargetFromTrigger($trigger) {
  var href
  var target = $trigger.attr('data-target')
    || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

  return $(target)
}

function Plugin(option) {
  return this.each(function () {
    var $this   = $(this)
    var data    = $this.data('bs.collapse')
    var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

    if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
    if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
    if (typeof option == 'string') data[option]()
  })
}
