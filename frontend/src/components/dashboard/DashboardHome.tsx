// DashboardHome.tsx
import { Link } from 'react-router-dom';

const DashboardHome = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Welcome to Your Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Quick Actions</h2>
          <Link
            to="/dashboard/transactions/import"
            className="block mb-2 text-blue-600 hover:underline"
          >
            Import Transactions
          </Link>
          <Link
            to="/dashboard/accounts/new"
            className="block text-blue-600 hover:underline"
          >
            Add New Account
          </Link>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Recent Activity</h2>
          {/* Recent activity content */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="font-semibold mb-4">Account Summary</h2>
          {/* Account summary content */}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;