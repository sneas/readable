import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchPost } from "../utils/api";
import { withRouter } from 'react-router-dom'

class PostForm extends Component {
  state = {
    post: {
      title: '',
      body: '',
    }
  }

  componentDidMount() {
    if (this.props.id) {
      fetchPost(this.props.id).then((post) => {
        this.setState({
          post
        });
      })
    }
  }

  handleChange(field, value) {
    this.setState({
      post: Object.assign({}, this.state.post, { [field]: value })
    });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  render() {
    if (this.state.post === undefined) {
      return (
        <div>Loading...</div>
      )
    }

    const post = this.state.post;

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Post title"
            value={post.title}
            onChange={(event) => this.handleChange('title', event.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="body">Body</label>
          <textarea
            className="form-control"
            id="body"
            placeholder="Post body"
            value={post.body}
            onChange={(event) => this.handleChange('body', event.target.value)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Submit" />
      </form>
    );
  }
}

function mapStateToProps({categories}, ownProps) {
  return {
    categories,
    id: ownProps.match.params.id,
  }
}

export default withRouter(connect(mapStateToProps)(PostForm));