import '../styles/globals.css';
import Navbar from '../src/components/Navbar.js';
import { AuthProvider } from '../src/context/AuthContext.js';

function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Navbar />
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default App;
