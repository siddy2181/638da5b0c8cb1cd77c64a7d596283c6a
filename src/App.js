import React, { Component } from 'react';
import Header from './components/Header';
import Main from './Main';

class App extends Component {

  render() {
    return (
      <div>
      <Header />
        <div className="container" style={{marginTop:'30px'}}>
          <div className="row" >
            <div className="col-lg-12 col-md-12 col-sm-12">
              <Main/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

