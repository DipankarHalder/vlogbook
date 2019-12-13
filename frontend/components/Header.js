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
                        <Link href="/"><a className="app-logoStyle">.{APP_NAME}</a></Link>
                    </div>
                    <div className="app-navigation right">
                        <ul>
                            {!isAuth() && (
                                <React.Fragment>
                                    <li><Link href="/signin"><a>Signin</a></Link></li>
                                    <li><Link href="/signup"><a>Signup</a></Link></li>
                                </React.Fragment>
                            )}
                            {isAuth() && isAuth().role === 0 && (
                                <li><Link href="/user"><a>{`${isAuth().name}'s dashboard`}</a></Link></li>
                            )}
                            {isAuth() && isAuth().role === 1 && (
                                <li><Link href="/admin"><a>{`${isAuth().name}'s dashboard`}</a></Link></li>
                            )}
                            {isAuth() && (
                                <li><a onClick={() => signout(() => Router.replace('/signin'))}>Signout</a></li>
                            )}
                            
                        </ul>
                    </div>
                </header>
            </div>
        </section>
    )
}

export default Header;