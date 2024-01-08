import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

// pages and components
import SessionSettings from './pages/SessionSettings';
import Session from './pages/Session';
import Background from './components/Background';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              exact path='/'
              element={ <SessionSettings /> }
            />
            <Route
              path='/app.html'
              element={ <Navigate to="/" replace={true} /> }
            />
            <Route
              path='/session'
              element={ <Session /> }
            />
        </Routes>
        </div>
      </BrowserRouter>
      <Background />
    </div>
  );
}

export default App;
