import React, { Component } from 'react';
import Header from './Header';
import Main from './Main';

//App is the root element
class App extends Component {

  render() {
    return (
      <div>
      <Header />
        <div className="container" style={{marginTop:'30px'}}>
          <div className="row" >

              <Main/>
            </div>
          </div>
        </div>

    );
  }
}

export default App;

