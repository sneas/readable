import React, { Component } from 'react';

class Category extends Component {
  render() {
    return (
      <div>Category {this.props.match.params.category}</div>
    );
  }
}

export default Category;