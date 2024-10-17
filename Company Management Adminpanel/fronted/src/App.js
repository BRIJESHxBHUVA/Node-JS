import './App.css';
import Employee from './Components/Employee/Employee';
import Header from './Components/Header/Header';
import Manager from './Components/Manager/Manager';
import Owner from './Components/Owner/Owner';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
    
   
    <Header/>
      <Routes>
        <Route path='/*' element={<Owner/>} />
        <Route path='/manager/*' element={<Manager/>} />
        <Route path='/employee/*' element={<Employee/>} />
      </Routes>
   
    
    </>
  );
}

export default App;
