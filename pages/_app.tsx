import Head from 'next/head';
import { AppProps } from 'next/app';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { theme } from 'theme';
import 'styles/globals.scss';
import { Header } from 'components/Header';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>tjournal-clone</title>
            </Head>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <Header />
                <Component {...pageProps} />
            </MuiThemeProvider>
        </>
    );
}

export default MyApp;
