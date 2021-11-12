import "reflect-metadata";
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Fragment } from "react";
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { theme } from 'theme';
import { Header } from 'components/Header';
import { GlobalCommunicator } from '../components/GlobalCommunicator/GlobalCommunicator';
import { StoreProvider } from '../store/StoreProvider';
import 'styles/globals.scss';
import { deserializeHydrationProps } from '../store/hydration';

function App({ Component, pageProps }: AppProps) {
    const [hydrationData, props] = deserializeHydrationProps(pageProps);
    return (
        <Fragment>
            <Head>
                <title>tjournal-clone</title>
            </Head>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <StoreProvider hydrationData={hydrationData} >
                    <GlobalCommunicator />
                    <Header />
                    <Component {...props} />
                </StoreProvider>
            </MuiThemeProvider>
        </Fragment>
    );
}

export default App;
