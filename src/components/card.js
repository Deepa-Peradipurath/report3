import React from "react";
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    card: {
        //maxWidth: 345,
      },
      media: {
        height: 0,
        paddingTop: '30%', // 16:9
        margin: '0 20px'
      },
      title: {
        textAlign:'center',
        lineHeight:'15px' ,
        marginBottom:'35px',
        padding:'20px 0 0',
        textDecoration :'none'  
      },
      
      header:{
          padding:'10px 10px 0 10px'
      }
}));

const AppCard = ({cardInfo}) => {
    const classes = useStyles();
    return (
        <Card className={classes.card}>
            <CardHeader className={classes.header}
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
            />
            <CardMedia
                className={classes.media}
                image={`data:image/png;base64, ${cardInfo.appImageData}`}
                title="Paella dish"
            />
            <div className={classes.title}>
                <h4>{cardInfo.appName}</h4>
                <h5>{cardInfo.appDescription}</h5>
            </div>
        </Card>
    )
}

export default AppCard