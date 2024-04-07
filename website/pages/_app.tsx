import { Inter } from 'next/font/google';

import '../styles/global.css';

const sans = Inter({
  display: 'swap',
  preload: true,
  style: 'normal',
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-sans',
});

const App = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};

export const fonts = { sans };

export default App;
