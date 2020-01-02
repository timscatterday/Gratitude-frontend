import React from 'react';
import logo from './logo.svg';
import Entries from './components/Entries';
import SingleEntry from './components/SingleEntry';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import AddEntry from './components/AddEntry';
import {Container} from 'semantic-ui-react';
import './App.css';

function App() {
  return (
    <div className="App">
      <Container text > 
        <BrowserRouter>
          <Switch>
            <Route path='/' exact component={Entries} />
            <Route path='/new' exact component={AddEntry} />
            <Route path='/:id' exact component={SingleEntry} />
          </Switch>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
