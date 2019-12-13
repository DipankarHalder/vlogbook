import Layout from '../components/Layout';
import SigninComp from '../components/auth/SigninComp';

const Signin = () => {
    return (
        <Layout>
            <div className="app-mainwrapper left fwidth">
                <div className="app-inWrapper">
                    <h2>Login</h2>
                    <SigninComp />
                </div>
            </div>
        </Layout>
    )
}

export default Signin;