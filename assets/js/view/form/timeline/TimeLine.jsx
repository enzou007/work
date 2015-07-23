"use strict";

var React = require("react"),
  _ = require("underscore"),
  $ = require("jquery"),
  moment = require("moment");

require("moment/locale/zh-cn");

var TimeLineItem = require("./TimeLineItem.jsx")
var TimeLine = React.createClass({
  getDefaultProps: function () {
    return {
      now: moment(new Date()),
      logs: []
    };
  },
  // hiddenTimeLine: function(){
  //   var width = this.$window.width() - this.$container.width() - this.$container.offset().left;
  //   if(width < 220){
  //     this.$node.addClass("hidden-title");
  //     if(width < 115){
  //       this.$node.addClass("hidden-value");
  //       if(width < 30){
  //         this.$node.addClass("hidden-self");
  //       }
  //     }
  //   }
  //
  //   if(width > 30){
  //     this.$node.removeClass("hidden-self");
  //     if(width > 120){
  //       this.$node.removeClass("hidden-value");
  //       if(width > 220){
  //         this.$node.removeClass("hidden-title");
  //       }
  //     }
  //   }
  // },
  // componentDidMount: function() {
  //   this.$node = $(this.getDOMNode());
  //   this.$window = $(window);
  //   this.$container = $(".container");
  //
  //   this.hiddenTimeLine();
  //   $(window).on("resize",this.hiddenTimeLine);
  // },
  render: function () {
    var year = this.props.now.year();
    var groupLogs = _.sortBy(this.props.logs,function(item){
      return item.time;
    });

    groupLogs = _.groupBy(groupLogs,function(item){
      var date = item.time.substr(0,10);
      if(date.substr(0,4) == year){
        date = date.substr(5,10);
      }
      return date
    });

    return (
      <div className="timeline-container timeline-style2 timeline">
        {
            _.map(groupLogs,function(log,key){
              return(
                <div>
                  <span className="timeline-label">
          					<b>{key}</b>
          				</span>
                  <div className="timeline-items">
                    { _.map(log,function(item,index){
                        return <TimeLineItem key={index} {...item}/>
                      })
                    }
                  </div>
                </div>
              )
            })
        }
      </div>
    );
  }
});

module.exports = TimeLine;
