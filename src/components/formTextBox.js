import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles(theme => ({
    inlineList: {
        display: 'inline-flex',
        flexDirection: 'row',
        padding: 0,
        width:'100%'
    }, 
    listItemLeft :{
        width :'auto',
        justifyContent :'flex-start',
        padding :'0',
        whiteSpace :'nowrap'
    },
    listItemRight :{
        width:'100%',
        padding :'0',
        justifyContent:'flex-end'
    }
}));

const FormTextBox = ({label,helperTxt}) => {
    const classes = useStyles();
    return (
        <List  className = {classes.inlineList}>
            <ListItem className ={ classes.listItemLeft}>
                <label className="label-name">{label}</label>
            </ListItem>
            <ListItem className ={ classes.listItemRight}>
                <Typography className="helper-text" variant="caption" display="block" gutterBottom>
                {helperTxt}
                </Typography>
            </ListItem>
        </List> 
    )
}

export default FormTextBox
