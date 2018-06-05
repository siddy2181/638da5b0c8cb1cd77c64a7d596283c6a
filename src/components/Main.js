import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './Home'
import ServiceWork from './ServiceWork'


const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Home}/>
      <Route path='/ServiceWork' component={ServiceWork}/>
    </Switch>
  </main>
)

export default Main
