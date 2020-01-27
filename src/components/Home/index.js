import React , {Fragment } from "react"
import { Link } from "gatsby"
import { navigate } from "@reach/router"
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import AppCard from "./../card"
import actions from "../../store/actions"
import { useDispatch, useSelector} from "react-redux"
import CustomButton from "./../Button"
import Loader from "../Loader"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },
      paper: {
        //width: '90%',
        marginBottom:'30px'
      },
      navigation: {
          margin:'2% auto 0'
      },
      buttonWrapper :{
          textAlign:"right"
      }
    }));

const Home = () => {
    const classes = useStyles();
    const data = useSelector(state => state.notification);
    console.log(`Home : data loads...`);
    console.log(data)
    const navItems = data.allApplications.length > 0 ? data.allApplications : [];
    const arrayCheck =  Array.isArray(navItems); 
    const dispatch = useDispatch();
    React.useEffect(() => {
        dispatch(actions.getAllApplication());
    },[dispatch]);

const appSelection = (value) => {
    console.log("App Selection :");
    console.log(value);
    dispatch(actions.setSelectedApp(value))
    // dispatch(actions.listValues(value.appId))
    dispatch(actions.getChannelList(value.appId))
    dispatch(actions.getNotificationList(value.appId))
    dispatch(actions.getCategoryList(value.appId))


}

if (navItems.length > 0) {
    return (
        <Fragment>
            <nav className={classes.navigation}>
                <Grid container  justify="space-evenly" spacing={6}>
                <Grid xs={12} item className={classes.buttonWrapper} >
                    <CustomButton type="primary" 
                    text="Onboard Application" 
                    action = {() =>{navigate('/app/onboardingform')}}
                 /></Grid>
                    { data && navItems && arrayCheck && navItems.length && navItems.map((value,i) => (
                        <Grid xs={12} md={4} key={i} item>
                            <Link to={`/app/id:${value.appId}/notifications`} onClick={() => {
                                        appSelection(value);
                                    }}>
                                <Paper className={classes.paper}>
                                    <AppCard cardInfo={value}></AppCard>
                                </Paper>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
            </nav>
        </Fragment>
    )
} else {
    return (
        <Loader/>
    )
}
    
}
export default Home