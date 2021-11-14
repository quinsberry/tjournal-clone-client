import "reflect-metadata";
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Fragment } from "react";
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { theme } from 'theme';
import { Header } from 'components/Header';
import { GlobalCommunicator } from '../components/GlobalCommunicator/GlobalCommunicator';
import { withStore } from '../store/StoreProvider';
import 'styles/globals.scss';

function App({ Component, pageProps }: AppProps) {
    return (
        <Fragment>
            <Head>
                <title>tjournal-clone</title>
            </Head>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <GlobalCommunicator />
                <Header />
                <Component {...pageProps} />
            </MuiThemeProvider>
        </Fragment>
    );
}

export default withStore(App);
