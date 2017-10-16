import React, { Component } from 'react';
import { connect } from "react-redux";
import { updateOrderField } from "../actions/index";

class ListSort extends Component {
  changeOrderField(event, field) {
    event.preventDefault();
    this.props.dispatch(updateOrderField(field));
  }

  getButtonClass(field) {
    return 'btn btn-default btn-xs'
     + (field === this.props.orderField ? ' active' : '');
  }

  render() {
    return (
      <div className="well well-sm">
        Order by
        &nbsp;
        <button className={this.getButtonClass('voteScore')} onClick={e => this.changeOrderField(e, 'voteScore')}>Vote score</button>
        &nbsp;
        /
        &nbsp;
        <button className={this.getButtonClass('timestamp')} onClick={e => this.changeOrderField(e, 'timestamp')}>Timestamp</button>
      </div>
    );
  }
}

export default connect(({orderField}) => ({
  orderField
}))(ListSort);
