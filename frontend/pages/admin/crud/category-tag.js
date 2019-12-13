import Link from 'next/link';
import Layout from '../../../components/Layout';
import Admin from '../../../components/auth/Admin';

const CategoryTag = () => {
    return (
        <Layout>
            <Admin>
                <h2 className="left fwidth">Manage Categories & Tags</h2>
                <div className="left fwidth">
                    <div className="sidebar left">
                       <p>Categories</p>
                    </div>
                    <div className="main left">
                        <p>Tags</p>
                    </div>
                </div>
            </Admin>
        </Layout>
    )
}

export default CategoryTag;