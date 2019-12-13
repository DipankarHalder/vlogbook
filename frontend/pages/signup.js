import Layout from '../components/Layout';
import SignupComp from '../components/auth/SignupComp';

const Signup = () => {
    return (
        <Layout>
            <div className="app-mainwrapper left fwidth">
                <div className="app-inWrapper">
                    <h2>Create an account</h2>
                    <SignupComp />
                </div>
            </div>
        </Layout>
    )
}

export default Signup;