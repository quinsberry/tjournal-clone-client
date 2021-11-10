import "reflect-metadata";
import Head from 'next/head';
import { AppProps } from 'next/app';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { theme } from 'theme';
import { Header } from 'components/Header';
import { GlobalCommunicator } from '../components/GlobalCommunicator/GlobalCommunicator';
import { StoreProvider } from '../store/StoreProvider';
import 'styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>tjournal-clone</title>
            </Head>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <StoreProvider>
                    <GlobalCommunicator />
                    <Header />
                    <Component {...pageProps} />
                </StoreProvider>
            </MuiThemeProvider>
        </>
    );
}

export default App;
