import React from 'react';
import ROUTES, {RenderRoutes} from "./src/routes";
import {useDispatch, useSelector} from "react-redux";
import {removeLastNotification} from "./src/store/notification/actions";
import SnackBar from "./src/components/SnackBar";

function Main() {
    const dispatch = useDispatch();
    const notification = useSelector(state => state.notification);
    return (
        <div>
            {notification.current &&
            <SnackBar

                onClose={() => (dispatch(removeLastNotification()))}
                variant={notification.current.type}
                autoHideDuration={notification.current.duration || 3000}
                message={notification.current.message || "Something went wrong"}
            />
            }

            <RenderRoutes routes={ROUTES}/>
        </div>
    );
}
export default Main;
