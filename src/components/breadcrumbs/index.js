import React ,{ useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Link from '@material-ui/core/Link'
import { navigate } from '@reach/router'
import { useDispatch ,useSelector } from 'react-redux'
import actions from '../../store/actions'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
      },

      eleWrapper: {
          margin:'1% auto 0',  
      }
    }));

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
  navigate(`/app`)
}

export default function BreadCrumbs({ appName }) {
    const classes = useStyles();
    const data = useSelector(state => state.notification);
    const breadCrumbs = data.allBreadCumbs;
    console.log("breadCrumbs...");
    console.log(data);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(actions.getBreadCrumbs());
    },[dispatch]);
  return (
   <div className ={classes.eleWrapper}> 
        <Breadcrumbs aria-label="breadcrumb" color="textPrimary">
            <Link  href="/" onClick={ handleClick }>
                Home
            </Link>
            <Link  href="/" onClick={ handleClick }>
                { appName }
            </Link>
        {
            data && breadCrumbs.length && breadCrumbs.map((value,i) => (
                (breadCrumbs.length > ++i ) ? 
                <Link  href={value.path} >{value.label}</Link> 
                :
                <Typography color="textPrimary">{value.label}</Typography>
                
                
            ))
        }        
        </Breadcrumbs>
    </div>  
  );
}

