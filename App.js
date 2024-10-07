import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserTable from './components/UserTable';
import UserDetail from './components/UserDetail';
import UserForm from './components/UserForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserTable />} />
          <Route path="/user/:id" element={<UserDetail />} />
          <Route path="/create" element={<UserForm />} />
          <Route path="/edit/:id" element={<UserForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
