import React, {Fragment ,useEffect }  from "react"
import { useDispatch ,useSelector } from "react-redux"
import actions from "../../store/actions"
import Tabs from "../tabs/index"
import BreadCrumbs from "./../breadcrumbs"
import Loader from "../Loader"

const Manage = () => {
    const data = useSelector(state => state.notification);
    const appId = data ? data.selectedApp.appId : null;
    const appName = data ? data.selectedApp.appName : null;
    const showTabView = data ? data.showTab : true;

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(actions.getSelectedApp());
        const currentURL = window.location.href;
        if (currentURL.includes("notifications")){
            dispatch(actions.removeAllBreadCrumbs());
            dispatch(actions.addBreadCrumb({label :"Manage Notifications",path :`/app/id:${appId}/notifications`}));
        }
    },[dispatch]);

    if ( appId ) {
        return (
            <Fragment>
                <BreadCrumbs appName ={ appName }/>
                <Tabs appId = { appId }/>
            </Fragment>
        )

    } else {
        return (
            <Loader/>    
        )
    }  
    
}
export default Manage