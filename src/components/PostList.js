import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'
import ListSort from './ListSort';
import PostSummary from './PostSummary';

class PostList extends Component {
  render() {
    const orderField = this.props.orderField
    const posts = this.props.posts.sort((a, b) => b[orderField] - a[orderField]);

    return (
      <div>
        <div className="col-xs-3">
          {
            this.props.category
              ? (<Link to={`/`}>All categories</Link>)
              : (<span>All categories</span>)
          }
          {
            this.props.categories.map(category => (
              <div key={category.path}>
                {
                  this.props.category === category
                    ? (<span>{category.name}</span>)
                    : (<Link to={`/category/${category.path}`}>{category.name}</Link>)
                }
              </div>
            ))
          }
        </div>
        <div className="col-xs-9">
          <ListSort />
          {
            posts.length === 0
              ? (
                <p className="lead">
                  No posts {this.props.category ? `about ${this.props.category.name}` : ''} yet.
                  Would you like to <Link to={'/add/post' + (this.props.category ? `/${this.props.category.path}` : '')}>create</Link> one?
                </p>
              )
              : ''
          }
          {posts.map(post => (
            <div key={post.id}>
              <h1><Link to={`/post/${post.id}`}>{post.title}</Link></h1>
              <p>{post.body}</p>
              <PostSummary id={post.id}></PostSummary>
              <hr />
            </div>
          ))}
        </div>
      </div>
    )
  }
}

function mapStateToProps({categories, posts, orderField}, ownProps) {
  const categoryPath = ownProps.match.params.category;
  return {
    categories,
    orderField,
    posts: categoryPath ? posts.filter(post => post.category === categoryPath) : posts,
    category: categories.find(category => category.path === categoryPath),
  }
}

export default withRouter(connect(mapStateToProps)(PostList));
