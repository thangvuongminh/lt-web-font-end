import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from './store/authSlice';

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav className="bg-indigo-600 p-4 shadow-md text-white flex justify-between items-center">
      <Link to="/home" className="text-2xl font-bold tracking-wider hover:text-indigo-200 transition-colors">
        StudyHard
      </Link>
      
      <div className="flex items-center space-x-6">
        <Link to="/home" className="hover:text-indigo-200 transition-colors font-medium">Trang chủ</Link>
        {isAuthenticated && (
          <Link to="/upload" className="hover:text-indigo-200 transition-colors font-medium">Tải tài liệu lên</Link>
        )}
        {isAuthenticated && user?.role === 'ADMIN' && (
          <Link to="/admin" className="bg-yellow-400 text-indigo-900 px-3 py-1 rounded-lg font-bold text-sm hover:bg-yellow-300 transition-colors">⚙ Admin</Link>
        )}
        
        {isAuthenticated ? (
          <div className="flex items-center space-x-4">
            <span className="bg-indigo-800 px-3 py-1 rounded-full text-sm">
              {user?.username || 'User'}
            </span>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition-colors shadow"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <Link to="/login" className="bg-white text-indigo-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow">
            Đăng nhập
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
