import { useState } from 'react';
import { signup } from '../../actions/auth';

const SignupComp = () => {

    const [values, setValues] = useState({ name: '', email: '', password: '', error: '', loading: false, message: '', showForm: true });
    const { name, email, password, error, loading, message, showForm } = values;

    const handleSubmit = e => {
        e.preventDefault();
        setValues({ ...values, loading: true, error: false });
        const user = { name, email, password };

        signup(user).then(data => {
            if(data.error){
                setValues({ ...values, error: data.error,loading: false });
            } else {
                setValues({ ...values, name: '', email: '', password: '', error: '', loading: false, message: data.message,showForm: false });
            };
        });

    };

    const handleChange = name => e => {
        setValues({ ...values, error: false, [name]: e.target.value });
    };

    const showLoading = () => (loading ? <div>Loading...</div> : "");
    const showError = () => (error ? <div>{error}</div> : "");
    const showMessage = () => (message ? <div>{message}</div> : "");

    const signupForm = () => {
        return (
            <form onSubmit={handleSubmit}>
                <div className="app-frmCover">
                    <div className="app-field">
                        <span>Name</span>
                        <input type="text" value={name} onChange={handleChange('name')} />
                    </div>
                    <div className="app-field">
                        <span>email</span>
                        <input type="email" value={email} onChange={handleChange('email')} />
                    </div>
                    <div className="app-field">
                        <span>password</span>
                        <input type="password" value={password} onChange={handleChange('password')} />
                    </div>
                    <div className="app-fieldBtn">
                        <button className="app-btns">Signup</button>
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
            {showForm && signupForm()}
        </React.Fragment>
    )
}

export default SignupComp;