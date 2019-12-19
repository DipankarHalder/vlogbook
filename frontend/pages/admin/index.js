import AdminLayout from '../../components/AdminLayout';
import Admin from '../../components/auth/Admin';

const AdminIndex = () => {
    return (
        <AdminLayout>
            <Admin>
                <h2 className="left fwidth">Admin Dashboard</h2>
                <div className="left fwidth">
                    <div className="main left">
                        Right
                    </div>
                </div>
            </Admin>
        </AdminLayout>
    )
}

export default AdminIndex;