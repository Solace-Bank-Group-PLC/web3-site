import { Web3Provider } from '../providers/Web3Provider';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
  );
}

export default MyApp; 