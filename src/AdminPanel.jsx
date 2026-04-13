import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from './store/authSlice';
import Nav from './Nav';
import {
  getAdminSummary,
  getAdminUsers,
  getAdminDocs,
  getAdminRevenue,
  deleteAdminUser,
  updateAdminUserRole,
  deleteAdminDocument,
} from './Api';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const AdminPanel = () => {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tab, setTab] = useState('summary');
  const [summary, setSummary] = useState(null);
  const [users, setUsers] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [revenue, setRevenue] = useState([]);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token || user?.role !== 'ADMIN') {
      navigate('/home');
    }
  }, [token, user, navigate]);

  useEffect(() => {
    if (tab === 'summary') fetchSummary();
    if (tab === 'users') fetchUsers();
    if (tab === 'documents') fetchDocuments();
    if (tab === 'revenue') fetchRevenue();
  }, [tab]);

  const fetchSummary = async () => {
    try { const r = await getAdminSummary(token); setSummary(r.data); } catch {}
  };
  const fetchUsers = async () => {
    try { const r = await getAdminUsers(token); setUsers(r.data); } catch {}
  };
  const fetchDocuments = async () => {
    try { const r = await getAdminDocs(token); setDocuments(r.data); } catch {}
  };
  const fetchRevenue = async () => {
    try { const r = await getAdminRevenue(token); setRevenue(r.data); } catch {}
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm('Xóa người dùng này?')) return;
    setError(''); setMessage('');
    try {
      await deleteAdminUser(id, token);
      setMessage('Đã xóa người dùng!');
      setUsers(prev => prev.filter(u => u.id !== id));
    } catch (e) { setError('Không thể xóa người dùng.'); }
  };

  const handleToggleRole = async (id, currentRole) => {
    const newRole = currentRole === 'ADMIN' ? 'USER' : 'ADMIN';
    if (!window.confirm(`Đổi role thành ${newRole}?`)) return;
    setError(''); setMessage('');
    try {
      await updateAdminUserRole(id, newRole, token);
      setMessage(`Đã cập nhật role thành ${newRole}`);
      setUsers(prev => prev.map(u => u.id === id ? { ...u, role: newRole } : u));
    } catch (e) { setError('Không thể cập nhật role.'); }
  };

  const handleDeleteDocument = async (id) => {
    if (!window.confirm('Xóa tài liệu này?')) return;
    setError(''); setMessage('');
    try {
      await deleteAdminDocument(id, token);
      setMessage('Đã xóa tài liệu!');
      setDocuments(prev => prev.filter(d => d.id !== id));
    } catch (e) { setError('Không thể xóa tài liệu.'); }
  };

  const TabButton = ({ id, label }) => (
    <button
      onClick={() => { setTab(id); setMessage(''); setError(''); }}
      className={`px-5 py-2 rounded-lg font-semibold text-sm transition-all ${tab === id ? 'bg-indigo-600 text-white shadow' : 'bg-white text-gray-600 hover:bg-indigo-50'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Nav />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">Admin Panel</h1>
            <p className="text-gray-500 text-sm mt-1">Quản lý hệ thống StudyHard</p>
          </div>
          <div className="flex space-x-2 bg-gray-200 p-1 rounded-xl">
            <TabButton id="summary" label="📊 Tổng quan" />
            <TabButton id="users" label="👤 Người dùng" />
            <TabButton id="documents" label="📁 Tài liệu" />
            <TabButton id="revenue" label="💰 Doanh thu" />
          </div>
        </div>

        {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl text-sm">{message}</div>}
        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm">{error}</div>}

        {/* SUMMARY TAB */}
        {tab === 'summary' && summary && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: 'Tổng người dùng', value: summary.totalUsers, color: 'from-blue-500 to-blue-700', icon: '👤' },
              { label: 'Tổng tài liệu', value: summary.totalDocuments, color: 'from-purple-500 to-purple-700', icon: '📁' },
              { label: 'Giao dịch', value: summary.totalTransactions, color: 'from-yellow-500 to-yellow-700', icon: '🔁' },
              { label: 'Tổng doanh thu', value: `${Number(summary.totalRevenue).toLocaleString()} VNĐ`, color: 'from-green-500 to-green-700', icon: '💰' },
            ].map((stat, i) => (
              <div key={i} className={`bg-gradient-to-br ${stat.color} text-white rounded-2xl p-6 shadow-lg`}>
                <div className="text-4xl mb-3">{stat.icon}</div>
                <p className="text-sm font-medium opacity-80">{stat.label}</p>
                <p className="text-3xl font-bold mt-1">{stat.value}</p>
              </div>
            ))}
          </div>
        )}

        {/* USERS TAB */}
        {tab === 'users' && (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-50">
                <tr>
                  {['ID', 'Username', 'Email', 'Role', 'Ngày tạo', 'Hành động'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map(u => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">{u.id}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900">{u.username}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${u.role === 'ADMIN' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{u.createdAt?.split('T')[0]}</td>
                    <td className="px-6 py-4 flex space-x-2 items-center">
                      <button onClick={() => handleToggleRole(u.id, u.role)} className="text-xs px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 font-medium">
                        {u.role === 'ADMIN' ? '→ USER' : '→ ADMIN'}
                      </button>
                      {u.role === 'ADMIN' ? (
                        <span className="text-xs px-3 py-1 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed" title="Không thể xóa tài khoản ADMIN">
                          🔒 Bảo vệ
                        </span>
                      ) : (
                        <button onClick={() => handleDeleteUser(u.id)} className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium">
                          Xóa
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* DOCUMENTS TAB */}
        {tab === 'documents' && (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-50">
                <tr>
                  {['ID', 'Tiêu đề', 'Loại', 'Giá', 'Người đăng', 'Hành động'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {documents.map(d => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-500">{d.id}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-gray-900 max-w-xs truncate">{d.title}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs font-bold rounded-full ${d.type === 'FREE' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                        {d.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{d.type === 'PAID' ? `${d.price} VNĐ` : '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{d.uploaderName}</td>
                    <td className="px-6 py-4">
                      <button onClick={() => handleDeleteDocument(d.id)} className="text-xs px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 font-medium">
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* REVENUE TAB */}
        {tab === 'revenue' && (
          <div className="bg-white rounded-2xl shadow overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-800">Doanh thu theo tháng</h2>
            </div>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-indigo-50">
                <tr>
                  {['Tháng', 'Năm', 'Doanh thu'].map(h => (
                    <th key={h} className="px-6 py-3 text-left text-xs font-bold text-indigo-700 uppercase tracking-wider">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {revenue.length === 0 ? (
                  <tr><td colSpan="3" className="px-6 py-10 text-center text-gray-500">Chưa có dữ liệu doanh thu</td></tr>
                ) : revenue.map((r, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{MONTHS[r.month - 1]}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{r.year}</td>
                    <td className="px-6 py-4 text-sm font-bold text-green-700">{Number(r.total).toLocaleString()} VNĐ</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
