import './App.css';
import * as React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react'
import LoginPanel from './components/login_panel'
import DashboardPage from './components/dashboard/dashboard_page'
import ExpensesPage from './components/expenses/budget_page'
import TokenNotification from './components/token_notification'
import DashboardNavigation from './components/navigation'

const api = 'http://localhost:4000';




function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [user, setUser] = React.useState(null);
  const [token, setToken] = React.useState(null);
  const [tokenExpiration, setTokenExpiration] = React.useState(null);
  const [notifyExpiration, setNotifyExpiration] = React.useState(false);


  React.useEffect(() => {
    if (token) {
      const checkTime = setInterval(() => {
      
      const currentTime = new Date();
      const expirationTime = new Date(tokenExpiration);
      // set notifyExpiration to true if token has 20 seconds or less left
      if (currentTime > expirationTime - 20000) {
        setNotifyExpiration(true);
      }
      if (currentTime > expirationTime) {
        setLoggedIn(false);
        setToken(null);
        setTokenExpiration(null);
      }
    }, 1000);
    return () => clearInterval(checkTime);
    }
  }
  , [token, tokenExpiration]);

  return (
    <ChakraProvider>
      <Router>
        <div className="App">
          <header className="App-header">
            <Routes>
              <Route path="/" element={loggedIn ? <Navigate to="/dashboard" replace/> : <Navigate to="/login" replace/>}/>
              <Route path="/login" element={<LoginPanel setLoggedIn={setLoggedIn} setUser={setUser} setToken={setToken} setTokenExpiration={setTokenExpiration} apiAddress={api} setNotifyExpiration={setNotifyExpiration}/>}>
              </Route>
              <Route path='/dashboard' element={loggedIn ? 
                <>
                  <DashboardNavigation onSignOut={() => {setLoggedIn(false); setToken(null); setTokenExpiration(null);}}/>
                  <DashboardPage user={user} token={token} apiAddress={api}/>
                </> :
                <Navigate to="/login" replace/> 
              }>
              </Route>
              <Route path='/expenses' element={loggedIn ?
                <>
                  <DashboardNavigation onSignOut={() => {setLoggedIn(false); setToken(null); setTokenExpiration(null);}}/>
                  <ExpensesPage user={user} token={token} apiAddress={api}/>
                </> :
                <Navigate to="/login" replace/>
              }>
              </Route>

            </Routes>
            {(token && notifyExpiration) &&
              <div> 
                <TokenNotification setTokenExpiration={setTokenExpiration} setNotifyExpiration={setNotifyExpiration} setToken={setToken} token={token} user={user} apiAddress={api} />
              </div>
            }
          </header>
        </div>
      </Router>
    </ChakraProvider>
  );
}

export default App;
