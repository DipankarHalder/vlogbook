import { useEffect } from 'react';
import Router from 'next/router';

import AdminSidebar from '../AdminSidebar';
import { isAuth } from '../../actions/auth';

const Admin = ({children}) => {
    useEffect(() => {
        if(!isAuth()){
            Router.push('/signin');
        } else if(isAuth().role !== 1){
            Router.push('/');
        };
    }, [])

    return (
        <React.Fragment>
            <AdminSidebar />
            <div className="left mainAdminWrapper">
                {children}
            </div>
        </React.Fragment>
    )
}

export default Admin;



