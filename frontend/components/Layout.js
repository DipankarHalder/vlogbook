import Header from './Header';

const Layout = ({ children }) => {
    return(
        <React.Fragment>
            <Header />
            <div className="app-wrapper left fwidth">
                <div className="app-container">
                    {children}
                </div>
            </div>
        </React.Fragment>
    )
}

export default Layout;