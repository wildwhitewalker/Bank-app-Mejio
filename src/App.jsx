import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignUpForm";
import WelcomePage from "./components/WelcomePage";
import Dashboard from "./components/Dashboard";
import Deposit from "./components/Deposit";
import Withdraw from "./components/Withdraw";
import TransferFunds from "./components/TransferFunds";


function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <Router>
      <header className="bg-gradient-to-r from-yellow-300 via-red-500 to-purple-500 p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <NavLink
            to="/"
            className="text-white font-semibold text-lg hover:text-gray-200"
          >
            BankApp
          </NavLink>
          <div className="space-x-4">
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-200"
              >
                Logout
              </button>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="text-white hover:text-gray-200"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="text-white hover:text-gray-200"
                >
                  Signup
                </NavLink>
              </>
            )}
          </div>
        </nav>
      </header>
      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="login" element={<LoginForm onLogin={handleLogin} />} />
          <Route path="signup" element={<SignupForm />} />
          <Route path="dashboard" element={<Dashboard currentUser={currentUser} />} />
          <Route path="deposit" element={<Deposit currentUser={currentUser} />} />
          <Route path="withdraw" element={<Withdraw currentUser={currentUser} />} />
          <Route path="transfer" element={<TransferFunds currentUser={currentUser} />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
