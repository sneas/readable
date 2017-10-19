import React, { Component } from 'react';
import { connect } from "react-redux";
import { api } from "../utils/api";
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { deletePost, updatePost } from "../actions/index";
import PostSummary from './PostSummary';
import PostComments from './PostComments';

class Post extends Component {
  state = {
    isLoaded: false,
    post: {}
  }

  componentDidMount() {
    api.fetchPost(this.props.match.params.id).then((post) => {
      this.setState({
        isLoaded: true,
        post
      });
    })
  }

  delete(event) {
    event.preventDefault();
    if (!window.confirm('Are you sure')) {
      return;
    }

    api.deletePost(this.state.post.id).then(() => {
      this.props.dispatch(deletePost(this.state.post));
      this.props.history.replace(`/category/${this.state.post.category}`);
    })
  }

  onPostUpdate(post) {
    this.setState({post});
    this.props.dispatch(updatePost(post));
  }

  render() {
    if (!this.state.isLoaded) {
      return '';
    }

    const post = this.state.post;
    return (
      <div>
        <h1>{post.title}</h1>
        <p>
          <Link to={`/edit/post/${post.id}`}>
            <i className="glyphicon glyphicon-edit" />
            Edit
          </Link>
          &nbsp;
          <button className="btn-link" onClick={e => this.delete(e)}>
            <i className="glyphicon glyphicon-remove" />
            Delete
          </button>
        </p>
        <p>{post.body}</p>
        <PostSummary post={post} allowVoting={true} onVote={(post) => this.onPostUpdate(post)} />
        <hr />
        <PostComments post={post} />
      </div>
    );
  }
}

export default withRouter(connect()(Post));
