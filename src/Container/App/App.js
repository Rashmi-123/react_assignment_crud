import React ,{Component} from 'react';
import './App.css';
import RouteComponent from '../Router/router';

class App extends Component {

  render(){
 
    //  var header = (sessionStorage.getItem("token"));
    
     return (
       <div className="App">
         <RouteComponent />
        </div>
     );
   }
  
 }
 

export default App;
