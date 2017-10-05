import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'

class Category extends Component {
  render() {
    return (
      <div>
        Category selected: {this.props.category}
        {
          this.props.categories.map(category => (
            <div key={category.path}>
              {
                this.props.category === category.path
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

function mapStateToProps({categories}, ownProps) {
  return {
    categories,
    category: ownProps.match.params.category,
  }
}

export default withRouter(connect(mapStateToProps)(Category));