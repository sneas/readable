import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { api } from "../utils/api";
import { updatePost, deletePost } from "../actions/index";
import { findPost } from "../utils/find-post";
import { Link } from 'react-router-dom'

class PostSummary extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    onDelete: PropTypes.func,
  }

  vote(event, option) {
    event.preventDefault();
    api.voteForPost(this.props.post.id, option).then((post) => {
      this.props.dispatch(updatePost(post));
    });
  }

  delete(event) {
    event.preventDefault();
    if (!window.confirm('Are you sure')) {
      return;
    }

    api.deletePost(this.props.post.id).then((post) => {
      this.props.dispatch(deletePost(post));
      this.props.onDelete && this.props.onDelete(post);
    })
  }

  render() {
    const post = this.props.post;
    return (
      <div className="row">
        <div className="col-xs-7">
          <span className="badge">{post.voteScore}</span>

          <button className="btn-link" onClick={event => this.vote(event, 'upVote')}><i className="glyphicon glyphicon-thumbs-up" /></button>
          <button className="btn-link" onClick={event => this.vote(event, 'downVote')}><i className="glyphicon glyphicon-thumbs-down" /></button>

          &nbsp;
          Created
          &nbsp;
          <em>{new Date(post.timestamp).toLocaleString()}</em>
          &nbsp;
          by <strong>{post.author}</strong>
        </div>
        <div className="col-xs-5 text-right">
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
        </div>
      </div>
    )
  }
}

export default connect(({posts}, ownProps) => ({
  post: findPost(posts, ownProps.id)
}))(PostSummary);
