import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'

class Category extends Component {
  render() {
    return (
      <div>
        Category selected: {this.props.match.params.category}
        {
          this.props.categories.map(category => (
            <div key={category.path}>
              {
                this.props.match.params.category === category.path
                  ? (<span>{category.name}</span>)
                  : (<Link to={`/category/${category.path}`}>{category.name}</Link>)
              }
            </div>
          ))
        }
        </div>
    )
  }
}

function mapStateToProps({categories}) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(Category);