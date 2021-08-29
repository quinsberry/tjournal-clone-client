import { createTheme } from '@material-ui/core';

export const theme = createTheme({
    props: {
        MuiButtonBase: {
            disableRipple: true,
        },
    },
    palette: {
        primary: {
            main: '#4683d9',
        },
    },
    overrides: {
        MuiPaper: {
            rounded: {
                borderRadius: 8,
            },
        },
        MuiPopover: {},
        MuiButton: {
            root: {
                borderRadius: '8px',
                textTransform: 'inherit',
                fontSize: 16,
                transition: 'none',
                '&:active': {
                    boxShadow: 'none',
                }
            },
            contained: {
                transition: '0.1s ease-out',
                backgroundColor: 'white',
                boxShadow:
                    '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 5%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%)',
                '&:hover': {
                    backgroundColor: 'white',
                    boxShadow:
                        '0 1px 1px rgb(0 0 0 / 16%), 0 4px 7px rgb(0 0 0 / 8%), 0 -1px 0 rgb(0 0 0 / 8%), -1px 0 0 rgb(0 0 0 / 8%), 1px 0 0 rgb(0 0 0 / 15%)',
                },
                '&:active': {
                    boxShadow:
                        '0 1px 1px rgb(0 0 0 / 15%), 0 4px 7px rgb(0 0 0 / 5%), 0 -1px 0 rgb(0 0 0 / 5%), -1px 0 0 rgb(0 0 0 / 5%), 1px 0 0 rgb(0 0 0 / 5%)',
                }
            },
            containedPrimary: {
                backgroundColor: '#4683d9',
                '&:hover': {
                    backgroundColor: '#437CCE',
                },
            },
        },
    },
});
