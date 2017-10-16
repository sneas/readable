import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'
import ListSort from './ListSort';

class PostList extends Component {
  render() {
    const orderField = this.props.orderField
    const posts = (this.props.category
      ? this.props.posts.filter(post => post.category === this.props.category)
      : this.props.posts).sort((a, b) => b[orderField] - a[orderField]);

    return (
      <div>
        <div className="col-xs-3">
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
        <div className="col-xs-9">
          <ListSort />
          {posts.map(post => (
            <div key={post.id}>
              <h1><Link to={`/post/${post.id}`}>{post.title}</Link></h1>
              <p>{post.body}</p>
              <p>
                <span className="badge">{post.voteScore}</span>
                &nbsp;
                by <strong>{post.author}</strong>
              </p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps({categories, posts, orderField}, ownProps) {
  return {
    categories,
    posts,
    orderField,
    category: ownProps.match.params.category,
  }
}

export default withRouter(connect(mapStateToProps)(PostList));
