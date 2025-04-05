import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="space-y-4">
        <Link
          to="#"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Hi!
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;