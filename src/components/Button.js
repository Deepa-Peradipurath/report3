import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {grey, green} from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
    primaryBtn: {
        margin: theme.spacing(1),
        color: grey[50],
        height: '44px',
        textTransform: "capitalize",
        marginRight :'0'
    },
    secondaryBtn: {
        margin: theme.spacing(1),
        color: grey,
        height: '44px',
        textTransform: "capitalize",
        marginRight :'0',
        border: 'grey solid 1px',
        backgroundColor:theme.palette.button.white,
        '&:hover':{
            backgroundColor : grey[200],
        }
    }
}));

// const TYPE_COLOR_MAP = {
//     primary: green,
//     secondary : grey,
//     default: grey
// }
const TYPE_COLOR_MAP = {
    primary: green[500],
    secondary : grey[50]
}

export default function CustomizedButton({ type, text, action }) {
    
    const classes = useStyles();
    const theme = React.useMemo(() => {
        return createMuiTheme({
            palette: {
                //primary: TYPE_COLOR_MAP[type]
                primary: {
                    main: TYPE_COLOR_MAP[type]
                 }
            }
        });
    }, [type])

    return (
        <ThemeProvider theme={theme}>
            <Button 
                variant="contained" 
                color="primary" 
                className={type ==='primary'? classes.primaryBtn : classes.secondaryBtn} 
                onClick = {action} disableElevation>
                {text}
            </Button>
        </ThemeProvider>
    );
}
