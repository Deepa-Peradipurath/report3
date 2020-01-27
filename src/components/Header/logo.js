import React from "react"
import { Link } from "gatsby"
import PepsicoLogo from '../../images/pepsico-logo-black-and-white.png'
import { makeStyles } from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
    logo: {
        maxWidth: '100%',
        margin:'-13px 10px 0 0'
      } 
}));

const Logo = () => {
    const classes = useStyles();
    return (
        <Link to={`/app`}>
            <img className={classes.logo} data-test="logo" alt="Logo" src={PepsicoLogo}></img>
        </Link> 
    )
    
}
export default Logo