import '../styles/globals.css';
import Navbar from '../src/components/Navbar.js';

function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}

export default App;
