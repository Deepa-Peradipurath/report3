import React from 'react';
import { useDispatch } from "react-redux";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CloseIcon from '@material-ui/icons/Close';
import actions from "../../store/actions";
import './FormHeader.scss'


const FormHeader = ({title, icon, setShowCopy, flag}) => {
    const dispatch = useDispatch();  

    const closeAction =() =>{
        setShowCopy(false)
        dispatch(actions.toggleHeader(true));
        dispatch(actions.postSucess(false));
        dispatch(actions.removeBreadCrumb());

    }
    return (
        <div className="appbar-container">
            <AppBar position="static" className={flag ? "tab-header-success-color" : "form-header-app-bar"}>
                <Toolbar>
                    <IconButton color="inherit"  aria-label="menu">
                    {flag ? <CheckIcon/>:   (icon === "edit" ?<EditIcon /> : <FileCopyIcon/>)}
                    </IconButton>
                   <h4 className="title">{flag ? (icon === "edit" ? "Successfully Updated the Content": "Successfully Added the Content") : title }</h4>
                    <CloseIcon onClick = {() => {closeAction()}}/>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default FormHeader;