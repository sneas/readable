import React, { Component } from 'react';
import { connect } from "react-redux";
import { api } from "../utils/api";
import { withRouter } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { deletePost, updatePost } from "../actions/index";

class Post extends Component {
  state = {
    post: {}
  }

  componentDidMount() {
    api.fetchPost(this.props.match.params.id).then((post) => {
      this.setState({
        post
      });
    })
  }

  delete(event) {
    event.preventDefault();
    api.deletePost(this.state.post.id).then(() => {
      this.props.dispatch(deletePost(this.state.post));
      this.props.history.replace(`/category/${this.state.post.category}`);
    })
  }

  vote(event, weight) {
    event.preventDefault();
    api.voteForPost(this.state.post.id, weight).then((post) => {
      this.setState({post});
      this.props.dispatch(updatePost(post));
    });
  }

  render() {
    const post = this.state.post;
    return (
      <div>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
        <div className="row">
          <div className="col-xs-6">
            <span className="badge">{post.voteScore}</span>
            <button className="btn-link" onClick={event => this.vote(event, 'upVote')}><i className="glyphicon glyphicon-thumbs-up" /></button>
            <button className="btn-link" onClick={event => this.vote(event, 'downVote')}><i className="glyphicon glyphicon-thumbs-down" /></button>
          </div>
          <div className="col-xs-6 text-right">
            <Link to={`/edit/post/${post.id}`}>
              <i className="glyphicon glyphicon-edit" />
              Edit
            </Link>
            &nbsp;
            <button className="btn-link" onClick={e => this.delete(e)}>
              <i className="glyphicon glyphicon-remove" />
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(connect()(Post));
