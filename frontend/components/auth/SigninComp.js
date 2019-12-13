import { useState } from 'react';
import Router from 'next/router';
import { signin, authenticate } from '../../actions/auth';

const SigninComp = () => {

    const [values, setValues] = useState({ email: '', password: '', error: '', loading: false, message: '', showForm: true });
    const { email, password, error, loading, message, showForm } = values;

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });
        const user = { email, password };

        signin(user).then(data => {
            if(data.error){
                setValues({ ...values, error: data.error,loading: false });
            } else {
                authenticate(data, () => {
                    Router.push(`/`);
                });
            };
        });

    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div>Loading...</div> : "");
    const showError = () => (error ? <div>{error}</div> : "");
    const showMessage = () => (message ? <div>{message}</div> : "");

    const signinForm = () => {
        return (
            <form onSubmit={handleSubmit} className="left fwidth">
                <div className="app-frmCover left fwidth">
                    <div className="app-field left fwidth">
                        <span>email</span>
                        <input type="email" value={email} onChange={handleChange('email')} />
                    </div>
                    <div className="app-field left fwidth">
                        <span>password</span>
                        <input type="password" value={password} onChange={handleChange('password')} />
                    </div>
                    <div className="app-fieldBtn">
                        <button className="app-btns">Signin</button>
                    </div>
                </div>
            </form>
        )
    };

    return (
        <React.Fragment>
            {showLoading()}
            {showError()}
            {showMessage()}
            {showForm && signinForm()}
        </React.Fragment>
    )
}

export default SigninComp;