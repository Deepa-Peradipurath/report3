import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Typography from '@material-ui/core/Typography';
//import IconButton from '@material-ui/core/IconButton';
//import { generateKeyPair } from "crypto";

const useStyles = makeStyles(theme => ({
    removeGap: {
        padding: '0'
      } ,
    welcomeTxt :{
        fontSize:"0.667rem !important",
        color:theme.palette.textPrimary,  
    }
}));

const ProfileInfo = (props) => {
    const classes = useStyles();
    return (
        <List className={classes.root} data-test='profileInfo'>
            <ListItem alignItems="flex-start" className={classes.removeGap}>
                <ListItemAvatar
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={props.menuId}
                    aria-haspopup="true"
                    onClick={props.handleProfileMenuOpen}
                    color="inherit"
                >
                <Avatar alt="Profile Pic" src="data:image/jpeg;base64,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"  />
                </ListItemAvatar>
                <ListItemText
                edge="end"
                aria-label="account of current user"
                aria-controls={props.menuId}
                aria-haspopup="true"
                onClick={props.handleProfileMenuOpen}
                color="inherit"
                primary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            color="textSecondary"
                            className={classes.welcomeTxt}
                        >
                        <span>Welcome</span>
                    </Typography>
                    </React.Fragment>
                }
                secondary={
                    <React.Fragment>
                        <Typography
                            component="span"
                            color="textSecondary"
                        >
                        <span>John Smith Taylor</span>
                    </Typography>
                    </React.Fragment>
                }
                />
            </ListItem>
      </List>
    )
    
}
export default ProfileInfo