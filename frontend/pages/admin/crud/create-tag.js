import Link from 'next/link';
import AdminLayout from '../../../components/AdminLayout';
import Admin from '../../../components/auth/Admin';
import Tag from '../../../components/crud/Tag';

const CategoryTag = () => {
    return (
        <AdminLayout>
            <Admin>
                <div className="left fwidth">
                    <h2 className="left fwidth adminheading">Manage Tags</h2>
                    <Tag />
                </div>
            </Admin>
        </AdminLayout>
    )
}

export default CategoryTag;