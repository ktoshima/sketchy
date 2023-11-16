import { BrowserRouter, Routes, Route } from 'react-router-dom';

// pages and components
import InputForm from './pages/InputForm';
import Session from './pages/Session';
import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              exact path='/index.html'
              element={ <InputForm /> }
            />
            <Route
              path='/session'
              element={ <Session /> }
            />
            </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
