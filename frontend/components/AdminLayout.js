import Header from './Header';

const AdminLayout = ({ children }) => {
    return(
        <React.Fragment>
            <div className="left fwidth">
                <Header />
                <div className="app-wrapper left fwidth">
                    {children}
                </div>
            </div>
        </React.Fragment>
    )
}

export default AdminLayout;