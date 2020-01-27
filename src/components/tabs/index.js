import React, { Fragment ,useEffect } from 'react';
import { useSelector ,useDispatch } from "react-redux"

import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Router,Link } from "@reach/router"

import Notifications from "../Notifications/index"
import Reports from "../Reports/index"
import Templates from "../Template/index"
import actions from "../../store/actions"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

// function a11yProps(index) {
//   return {
//     id: `simple-tab-${index}`,
//     'aria-controls': `simple-tabpanel-${index}`,
//   };
// }

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: "transparent",
    '&:hover': {
      color: '#000',
      opacity: 1,
    },
    '&$selected': {
      color: '#000',
    },
    '&:focus': {
      color: '#000',
    },
  },
  indicator: {
    backgroundColor: 'red',
  },
  tabBar:{
    borderBottom:"#bdbcbc solid 1px",
    marginBottom:"15px"
  }
}));

export default function SimpleTabs({ appId }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//   };
  const data = useSelector(state => state.notification);
  const showTabView = data ? data.showTab : true;
  const dispatch = useDispatch();
  // useEffect(()=>{
  //   dispatch(actions.removeAllBreadCrumbs());
  //   dispatch(actions.addBreadCrumb({label :"Manage Notification",path :`/app/id:${appId}/notifications`}));
  // },[dispatch]);

  const handleTabChange = index => {
    setValue(index);
   
  }
  const NavLink = React.forwardRef((props, ref) => (
    <Link
      {...props}
      getProps={({ isPartiallyCurrent }) => {
        // the object returned here is passed to the
        // anchor element's props
        if (isPartiallyCurrent) {
          handleTabChange(props.index);
        }
      }}
    />
  )); 
  const handleTabClick = (label,path)=> {
    console.log("TAB CLICK ******")  ;
    console.log(label);
    console.log(path);
     dispatch(actions.removeAllBreadCrumbs());
     dispatch(actions.addBreadCrumb({label :label,path :path}));
  }
  return (
    <div className={classes.root}>
    <div position="static">
    <Fragment>
        {showTabView &&<Tabs className ={classes.tabBar}
            value={value}
            onChange={(e, val) => {
                setValue(val);
                console.log(value);
            }}
            >
            <Tab 
              label="Manage Notifications" 
              index={0} 
              component={NavLink} 
              to={`./notifications`} 
              onClick = {() => {handleTabClick('Manage Notifications',`./notifications`)}}
            />
            <Tab 
              label="Manage Templates" 
              index={1} 
              component={NavLink} 
              to={`/app/id:${appId}/templates`} 
              onClick = {() => {handleTabClick('Manage Templates',`/app/id:${appId}/templates`)}}
            />
            <Tab 
              label="Manage Report" 
              index={2} 
              component={NavLink} 
              to={`/app/id:${appId}/reports`} 
              onClick = {() => {handleTabClick('Manage Report',`/app/id:${appId}/reports`)}}
            />
          </Tabs> }
        <Router>
            <Templates path="/templates"/>
            <Reports path="/reports" />
            <Notifications path="/notifications" />
        </Router>
            
      </Fragment>  
    </div>
  </div>
    
  );
}