import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import AccountLayout from './features/account/AccountLayout';
import { Protect } from './components/Protect';
import Dashboard from './pages/Dashboard';
import PurchaseRequests from './pages/PurchaseRequests';

function App() {
  return (
    <>
      <Routes>
        <Route
          path='/account'
          element={
            <Protect>
              <AccountLayout />
            </Protect>
          }
        >
          <Route index element={<Navigate replace to='dashboard' />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='requests' element={<PurchaseRequests />} />
        </Route>
        <Route path='/' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
