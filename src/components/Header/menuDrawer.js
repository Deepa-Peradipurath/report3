import React ,{ useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import PieChartIcon from '@material-ui/icons/PieChart';
import HomeIcon from '@material-ui/icons/Home';
import actions from "../../store/actions";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "gatsby";
//import Loader from "../Loader";


const useStyles = makeStyles(theme => ({
  list: {
      width: 300,
      backgroundColor: theme.palette.primary.main,
      color:theme.palette.text.secondary  
    } ,
  linkTxt :{
    color:theme.palette.text.variant2,
    textDecoration:'none',
    
  } ,
  homeTxt :{
    color:theme.palette.text.secondary,
    textDecoration:'none',
    display:"flex"
  } ,
  appList :{
    paddingLeft:'10%' ,
    borderBottom: `${theme.palette.text.variant3} solid 1px`
  } 
}));

export default function TemporaryDrawer() {
  const classes = useStyles();
  const [state, setState] = React.useState({
    left: false,
    right: false,
  });
  const data = useSelector(state => state.notification);
  const appId = data ? data.selectedApp.appId : null;
  const navItems = data.allApplications.length > 0 ? data.allApplications : [];
  const arrayCheck =  Array.isArray(navItems); 
   const dispatch = useDispatch();
  useEffect(() => {
     dispatch(actions.getSelectedApp());
  },[dispatch]);
  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [side]: open });
  };
  const appSelection = (value) => {
      //console.log("App Selection :");
      //console.log(value);
      dispatch(actions.setSelectedApp(value))
      dispatch(actions.getChannelList(value.appId))
      dispatch(actions.getNotificationList(value.appId))
  }
  const sideList = (side) => {
    if (navItems.length > 0) {
      return (
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(side, false)}
          onKeyDown={toggleDrawer(side, false)}
        >
        <List>
            <ListItem button  key="Home">
              <Link className ={classes.homeTxt} to={`/app`} >
                <ListItemIcon><HomeIcon /></ListItemIcon>
                <ListItemText primary="Home" />
              </Link>
            </ListItem>
              { data && navItems && arrayCheck && navItems.length && navItems.map((value, index) => (
              <ListItem button key={index} className ={classes.appList}>
                <Link className ={classes.linkTxt} to={`/app/id:${value.appId}/notifications`} onClick={() => {
                      appSelection(value);
                  }}>
                  <ListItemText className ={ appId == value.appId ? 'active':''} primary={value.appName} />                      
                </Link> 
              </ListItem>
            ))
            }
          {['Settings', 'Analytics'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <SettingsIcon /> : <PieChartIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
      );
    }
    // else{
    //   return (
    //     <Loader/>
    //   )
    // }  
  }
    
  return (
    <div>
      <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}>
            <MenuIcon />
      </IconButton>  
      <Drawer open={state.left} className='sideDrawer' onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}