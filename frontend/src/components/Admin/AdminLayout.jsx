import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import {
  UsersIcon,
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ChartBarIcon,
  CubeIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'User Management', href: '/admin/users', icon: UsersIcon },
  { name: 'Item Management', href: '/admin/items', icon: ShoppingBagIcon },
  { name: 'Transactions', href: '/admin/transactions', icon: CurrencyDollarIcon },
  { name: 'Reports & Analytics', href: '/admin/reports', icon: ChartBarIcon },
  { name: 'Inventory Overview', href: '/admin/inventory', icon: CubeIcon },
];

const AdminLayout = ({ sidebarOpen }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h1 className="text-2xl font-bold text-customGreen">Admin Dashboard</h1>
        </div>
        <nav className="mt-5 px-2">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === '/admin'}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-base font-medium rounded-md ${
                  isActive
                    ? 'bg-customGreen text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-customGreen'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon
                    className={`mr-4 h-6 w-6 ${
                      isActive
                        ? 'text-white'
                        : 'text-gray-400 group-hover:text-customGreen'
                    }`}
                  />
                  {item.name}
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        {/* <div className="sticky top-0 z-20 bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <button
                type="button"
                className="text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-customGreen"
                onClick={() => sidebarOpen = !sidebarOpen}
              >
                <span className="sr-only">Toggle sidebar</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
              <div className="text-gray-600 font-medium">Admin</div>
            </div>
          </div>
        </div> */}

        {/* Page content */}
        <main className="flex-1 py-6 px-4 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
