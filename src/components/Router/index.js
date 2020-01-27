import React , {Fragment} from "react"
import { Router } from "@reach/router"
import { useDispatch ,useSelector } from "react-redux"
import Home from "../Home/index"
import Manage from "../Manage/index"
import OnBoradingForm from "../OnBoardForm/index"
import actions from "../../store/actions"

const AppRouter = () => {
    console.log("Router launched......");
    const data = useSelector(state => state.notification);
    const appId = data ? data.selectedApp.appId : null;
    console.log(appId);
    const dispatch = useDispatch();

    React.useEffect(() => {
        dispatch(actions.getSelectedApp());
    },[dispatch]);

    // function Display({ label }) {
    //     console.log("Display");
    //     return <div>{label}Hi</div>;
    // }
    return (
        <Fragment>
            <Router>
                <Home path="/app"/>
                <Manage path={`/app/id:${appId}/*`} />
                <OnBoradingForm path="/app/onboardingform"/>
                {/* <Manage path={`/app/id:${appId}/*`} >
                    <Display path={`/app/id:${appId}/templates`} label="Manage Templates" />
                    <Display path={`/app/id:${appId}/reports`} label="Manage Reports" />
                    <Display path={`/app/id:${appId}/notifications`} label="Manage Notifications" />
                </Manage> */}
            </Router>
        </Fragment>
        
    )
}
export default AppRouter