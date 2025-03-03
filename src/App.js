import {Component} from "react";
import {Routes, Route} from 'react-router-dom';
// import ProtectedRoute from './components/ProtectedRoute'
import LoginForm from './components/LoginForm';
import Feeds from './components/Feeds'
import AddPost from './components/AddPost'

import './App.css';

class App extends Component {
  render(){
    return (
      <Routes>
        {/* <Route exact path="/login" component={LoginForm} /> */}
        <Route path="/" element={<LoginForm />} />
        <Route path="/feeds" element={<Feeds />} />
        <Route path="/add-post" element={<AddPost />} />
      </Routes>
    );
  }
}

export default App;