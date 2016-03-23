'use strict';

var React = require('react');
var classnames = require('classnames');


var OfflineSearchList = React.createClass({
  getInitialState(){
    return ({
      results: []
    });
  },
  getDefaultProps(){
    return ({
      list: [],
      displayedField: 'username',
      dropDownDefaultState: false,
      placeholder: 'username'
    });
  },

  onSelection(selection, e){
    e.stopPropagation();
    this.props.onSelection(selection);
    this.setState({results: []});

  },

  onSearch(query){
    query = query.target.value;
    let searchProp = this.props.displayedField;
    if(query === ''){
      this.setState({
        results: []
      });
      return;
    }
    var results = this.props.list.filter((item)=> {
      if (searchProp) {
        return item[searchProp].toLowerCase().indexOf(query.toLowerCase()) >= 0 || item === this.props.selected;
      } else {
        return item.toLowerCase().indexOf(query.toLowerCase()) >= 0;
      }
    });
    results = results.filter(function(item){
      for(var user in this.props.selectedList){
        if(this.props.selectedList[user].username === item.username){
          return false;
        }
      }
      return true;
    }.bind(this));
    console.log('selectedList', this.props.selectedList);
    this.setState({
      results: results
    });
  },

  isOpen(){
    return this.state.results.length > 0;
  },
  render: function () {
//    console.log(this.isOpen());
    let listToDisplay = this.state.results.length ? this.state.results : this.props.list;
    //console.log('display', listToDisplay);
    return (
        <div className="OfflineSearchList">
          <div className='search-bar'>
            <input className={classnames({'open': this.isOpen()})} type='text' placeholder={this.props.placeholder} onChange={this.onSearch}/>
          </div>
            <ul className={classnames('result-list', {'close': !this.isOpen()})}>
              {listToDisplay.map((item, i)=> {
                return (
                    <li key={i} className={classnames('list-item', {selected: this.props.selected === item})}
                        onClick={this.onSelection.bind(this, item)}>{item[this.props.displayedField]}</li>
                );
              })}
            </ul>
        </div>
      );
  }
});

module.exports = OfflineSearchList;
