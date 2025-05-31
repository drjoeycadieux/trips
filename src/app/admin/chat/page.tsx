import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import AdminChatDashboard from '@/components/AdminChatDashboard';

export default async function AdminChatPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
        redirect('/login');
    }

    // In a real app, you'd check if the user has admin privileges
    // For now, we'll allow any logged-in user to access this for demo purposes

    return <AdminChatDashboard />;
}
