import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom'
import Category from './Category';
import { connect } from "react-redux";
import { fetchCategories } from "../utils/api";
import { setCategories } from "../actions/index";

class App extends Component {
  componentDidMount() {
    fetchCategories().then(categories => {
      this.props.dispatch(setCategories(categories));
    });
  }

  render() {
    return (
        <div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/">Readable</Link>
                    </div>
                </div>
            </nav>
            <div className="container">
              <Route exact path='/' component={Category} />
              <Route exact path='/category/:category' component={Category} />
            </div>
        </div>
    );
  }
}

export default withRouter(connect()(App));
