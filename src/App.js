import './sass/styles.scss';
import Layout from './components/layout/Layout';
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <>
      <AuthProvider>
        <Layout />
      </AuthProvider>
    </>
  );
}

export default App;
