import './App.css';
import {Routes,Route} from 'react-router-dom'
import HomePage from './Pages/HomePage';
import Temps from './Pages/Temps';
function App() {
  return (
    <div className="App">
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/temp' element={<Temps/>}/>
     </Routes>
    </div>
  );
}

export default App;
