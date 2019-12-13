import Link from 'next/link';
import Layout from '../../components/Layout';
import Admin from '../../components/auth/Admin';

const AdminIndex = () => {
    return (
        <Layout>
            <Admin>
                <h2 className="left fwidth">Admin Dashboard</h2>
                <div className="left fwidth">
                    <div className="sidebar left">
                        <ul>
                            <li><Link href="/admin/crud/category-tag"><a>Create category</a></Link></li>
                        </ul>
                    </div>
                    <div className="main left">
                        Right
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default AdminIndex;