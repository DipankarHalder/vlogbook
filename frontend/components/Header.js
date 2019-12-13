import Router from 'next/router';
import Link from 'next/link';

import { APP_NAME } from '../config';
import { signout, isAuth } from '../actions/auth';

const Header = () => {
    return (
        <section className="app-header fwidth left">
            <div className="app-container">
                <header className="fwidth left">
                    <div className="app-logo left">
                        <div className="app-logoStyle">.{APP_NAME}</div>
                    </div>
                    <div className="app-navigation right">
                        <ul>
                            {
                                !isAuth() && (
                                    <React.Fragment>
                                        <li><Link href="/"><a>Home</a></Link></li>
                                        <li><Link href="/signin"><a>SignIn</a></Link></li>
                                        <li><Link href="/signup"><a>SignUp</a></Link></li>
                                    </React.Fragment>
                                )
                            }
                            {
                                isAuth() && (
                                    <li><a onClick={() => signout(() => Router.replace('/signin'))}>SignOut</a></li>
                                )
                            }
                        </ul>
                    </div>
                </header>
            </div>
        </section>
    )
}

export default Header;