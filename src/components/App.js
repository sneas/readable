import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom'
import PostList from './PostList';
import { connect } from "react-redux";
import PostForm from "./PostForm";
import Post from "./Post";
import { fetchCategories } from "../actions/categories";
import { fetchPosts } from "../actions/posts";

class App extends Component {
  componentDidMount() {
    this.props.dispatch(fetchCategories());
    this.props.dispatch(fetchPosts());
  }

  render() {
    if (!this.props.isLoaded) {
      return '';
    }

    return (
      <div>
        <nav className="navbar navbar-inverse navbar-fixed-top">
          <div className="container">
            <div className="navbar-header">
              <Link className="navbar-brand" to="/">Readable</Link>
            </div>
            <div className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li><Link to={`/add/post`}>Write post</Link></li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container">
          <Route exact path='/' component={PostList} />
          <Route exact path='/category/:category' component={PostList} />
          <Route exact path='/add/post/:category?' component={PostForm} />
          <Route exact path='/edit/post/:id' component={PostForm} />
          <Route exact path='/post/:id' component={Post} />
        </div>
      </div>
    );
  }
}

function mapStateToProps({dataLoaded}) {
  return {
    isLoaded: dataLoaded.posts && dataLoaded.categories
  }
}

export default withRouter(connect(
  mapStateToProps
)(App));
