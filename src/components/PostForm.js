import React, { Component } from 'react';
import { connect } from "react-redux";
import { api } from "../utils/api";
import { Link, withRouter } from 'react-router-dom'
import * as uuid from "uuid";
import { updatePost, addPost } from "../actions/posts";

class PostForm extends Component {
  state = {
    updated: false,
    post: {
      title: '',
      body: '',
      category: this.props.preselectedCategory || '',
      author: '',
    }
  }

  componentDidMount() {
    if (this.props.id) {
      api.fetchPost(this.props.id).then((post) => {
        this.setState({
          post
        });
      })
    }
  }

  handleChange(field, value) {
    this.setState({
      post: {
        ...this.state.post,
        [field]: value,
      }
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.post.id) {
     this.updatePost();
    } else {
      this.createPost();
    }
  }

  updatePost() {
    api.updatePost(this.state.post).then(post => {
      this.props.dispatch(updatePost(post));
      this.setState({
        updated: true
      })
    });
  }

  createPost() {
    const post = {
      ...this.state.post,
      id: uuid(),
      timestamp: Date.now(),
    };

    api.createPost(post).then(post => {
      this.props.dispatch(addPost(post));
      this.props.history.push(`/post/${post.id}`);
    });
  }

  render() {
    const post = this.state.post;

    return (
      <form onSubmit={(event) => this.handleSubmit(event)}>
        {
          this.state.updated ? (
            <div className="alert alert-success">
              <strong>Success!</strong> The post has been successfully updated
            </div>
          ) : ''
        }
        <h1>{this.props.id ? 'Edit post' : 'Write post'}</h1>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            value={post.category}
            required
            onChange={(event) => this.handleChange('category', event.target.value)}>
            <option value="">- select -</option>
            {this.props.categories.map(category => (
              <option key={category.path} value={category.path}>{category.name}</option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Post title"
            value={post.title}
            required
            onChange={(event) => this.handleChange('title', event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea
            className="form-control"
            id="body"
            placeholder="Post body"
            value={post.body}
            required
            onChange={(event) => this.handleChange('body', event.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            placeholder="Author"
            value={post.author}
            required
            onChange={(event) => this.handleChange('author', event.target.value)} />
        </div>
        {this.props.id ? (
            <span>
              <Link to={`/post/${this.state.post.id}`} className="btn btn-default"><i className="glyphicon glyphicon-chevron-left" /> Back to post</Link>
              &nbsp;
            </span>
          ) : ''}
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    );
  }
}

function mapStateToProps({categories}, ownProps) {
  return {
    categories,
    id: ownProps.match.params.id,
    preselectedCategory: ownProps.match.params.category
  }
}

export default withRouter(connect(mapStateToProps)(PostForm));
