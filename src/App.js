import './sass/styles.scss';
import Layout from './components/layout/Layout';
import { AuthProvider } from "./context/AuthContext";
import { BrowserRouter as Router } from 'react-router-dom';


function App() {
  return (
    <>
      <AuthProvider>
        <Router>
          <Layout />
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
