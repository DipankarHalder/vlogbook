import Link from 'next/link';

const AdminSidebar = () => {
    return (
        <div className="sidebar left">
            <ul>
                <li><Link href="/admin/crud/create-category"><a>Manage Category</a></Link></li>
                <li><Link href="/admin/crud/create-tag"><a>Magane Tag</a></Link></li>
            </ul>
        </div>
    )
}

export default AdminSidebar;