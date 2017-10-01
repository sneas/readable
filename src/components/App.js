import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom'
import Category from './Category';

class App extends Component {
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
              <Route path='/category/:category' component={Category} />
            </div>
        </div>
    );
  }
}

export default App;
