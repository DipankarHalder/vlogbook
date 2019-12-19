import Link from 'next/link';
import AdminLayout from '../../../components/AdminLayout';
import Admin from '../../../components/auth/Admin';
import Category from '../../../components/crud/Category';

const CategoryTag = () => {
    return (
        <AdminLayout>
            <Admin>
                <div className="left fwidth">
                    <h2 className="left fwidth adminheading">Manage Categories</h2>
                    <Category />
                </div>
            </Admin>
        </AdminLayout>
    )
}

export default CategoryTag;