import React, { Component } from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { api } from "../utils/api";
import { updatePost } from "../actions/index";

class PostSummary extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired,
    allowVoting: PropTypes.bool,
    onVote: PropTypes.func,
  }

  vote(event, weight) {
    event.preventDefault();
    api.voteForPost(this.props.post.id, weight).then((post) => {
      this.props.onVote(post);
    });
  }

  render() {
    const post = this.props.post;
    return (
      <div>
        <span className="badge">{post.voteScore}</span>

        {
          this.props.allowVoting
          ? (
            <span>
              <button className="btn-link" onClick={event => this.vote(event, 'upVote')}><i className="glyphicon glyphicon-thumbs-up" /></button>
              <button className="btn-link" onClick={event => this.vote(event, 'downVote')}><i className="glyphicon glyphicon-thumbs-down" /></button>
            </span>
            )
          : ''
        }

        &nbsp;
        Created
        &nbsp;
        <em>{new Date(post.timestamp).toLocaleString()}</em>
        &nbsp;
        by <strong>{post.author}</strong>
      </div>
    )
  }
}

export default connect()(PostSummary);
