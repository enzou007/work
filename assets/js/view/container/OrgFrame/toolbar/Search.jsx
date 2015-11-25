import React from "react";
import $ from 'jquery';
import action from "../../../../action/orgFrame";

let Search = React.createClass({
  clickSearch(){
    let $input = $(".search-box input");
    if($input.width() > 27){
      this.searchView($input.val());
    }else{
      $input.animate({
        width: "200px"
      }, 300);
    }
  },
  triggerSearch(event){
    if(event.keyCode === 13){
      this.searchView($(".search-box input").val());
    }
  },
  searchView(key){
    if(!key){
      return false;
    }
    if(this._key != key){
      action.toggleSearchItem(key);
      this._key = key;
    }
  },
  render() {
    return (
      <div className="search-box">
        <input type="text" onKeyDown={this.triggerSearch.bind(this)}/>
        <i className="fa fa-search" onClick={this.clickSearch}></i>
      </div>
    );
  }
});

export default Search;
