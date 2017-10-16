import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'

class PostList extends Component {
  render() {
    const posts = this.props.category
      ? this.props.posts.filter(post => post.category === this.props.category)
      : this.props.posts;

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
          {posts.map(post => (
            <div key={post.id}>
              <h1>{post.title}</h1>
              <p>{post.body}</p>
              <p>
                <span className="badge">{post.voteScore}</span>
                &nbsp;
                <Link to={`/post/${post.id}`}>View</Link>
              </p>
              <hr />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps({categories, posts}, ownProps) {
  return {
    categories,
    posts,
    category: ownProps.match.params.category,
  }
}

export default withRouter(connect(mapStateToProps)(PostList));
