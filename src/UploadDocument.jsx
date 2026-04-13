import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Nav from './Nav';
import { uploadDocument } from './Api';

// Allowed MIME types for study documents
const ALLOWED_TYPES = {
  'application/pdf': 'PDF',
  'application/msword': 'DOC',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'DOCX',
  'application/vnd.ms-powerpoint': 'PPT',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPTX',
  'application/vnd.ms-excel': 'XLS',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'XLSX',
  'text/plain': 'TXT',
  'image/jpeg': 'JPG',
  'image/png': 'PNG',
};

const MAX_SIZE_MB = 50;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const UploadDocument = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('FREE');
  const [price, setPrice] = useState('');
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    // Validate type
    if (!ALLOWED_TYPES[selected.type]) {
      setError(`Loại file không được hỗ trợ. Vui lòng chọn: PDF, Word, PowerPoint, Excel, TXT hoặc hình ảnh.`);
      e.target.value = '';
      setFile(null);
      setFileName('');
      return;
    }

    // Validate size
    if (selected.size > MAX_SIZE_BYTES) {
      setError(`File quá lớn (${(selected.size / 1024 / 1024).toFixed(1)} MB). Tối đa ${MAX_SIZE_MB} MB.`);
      e.target.value = '';
      setFile(null);
      setFileName('');
      return;
    }

    setError('');
    setFile(selected);
    setFileName(`${selected.name} (${(selected.size / 1024 / 1024).toFixed(2)} MB)`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Vui lòng chọn một file.');
      return;
    }

    setIsSubmitting(true);
    setError('');
    setMessage('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('type', type);
    if (type === 'PAID') {
      formData.append('price', price);
    }
    formData.append('file', file);

    try {
      await uploadDocument(formData, token);
      setMessage('Tải tài liệu lên thành công!');
      setTimeout(() => navigate('/home'), 1500);
    } catch (err) {
      setError(err.response?.data?.error || 'Có lỗi xảy ra khi tải lên.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Nav />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Tải tài liệu lên</h2>
          <p className="text-center text-gray-500 text-sm mb-6">Chia sẻ tài liệu học tập của bạn với cộng đồng</p>

          {/* Supported types info box */}
          <div className="mb-6 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
            <p className="text-xs font-semibold text-indigo-700 mb-2">📎 Định dạng hỗ trợ:</p>
            <div className="flex flex-wrap gap-2">
              {['PDF', 'DOC / DOCX', 'PPT / PPTX', 'XLS / XLSX', 'TXT', 'JPG / PNG'].map((t) => (
                <span key={t} className="px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded text-xs font-medium">{t}</span>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">Dung lượng tối đa: <strong>{MAX_SIZE_MB} MB</strong></p>
          </div>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm">{error}</div>}
          {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl text-sm">{message}</div>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
              <input
                type="text" required value={title} onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="VD: Giáo trình Toán cao cấp tập 1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mô tả</label>
              <textarea
                required value={description} onChange={(e) => setDescription(e.target.value)} rows="3"
                className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                placeholder="Nội dung chính của tài liệu này..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Loại tài liệu</label>
                <select
                  value={type} onChange={(e) => setType(e.target.value)}
                  className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
                >
                  <option value="FREE">🆓 Miễn phí</option>
                  <option value="PAID">💰 Trả phí</option>
                </select>
              </div>

              {type === 'PAID' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá (VNĐ)</label>
                  <input
                    type="number" required min="0" value={price} onChange={(e) => setPrice(e.target.value)}
                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                    placeholder="VD: 15000"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Chọn File</label>
              <input
                type="file"
                required
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.jpg,.jpeg,.png"
                className="w-full px-4 py-2 border rounded-xl border-dashed focus:ring-2 focus:ring-indigo-500 outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              {fileName && (
                <p className="mt-1 text-xs text-green-600 font-medium">✅ Đã chọn: {fileName}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition font-semibold mt-2 disabled:opacity-50"
            >
              {isSubmitting ? 'Đang tải lên...' : '📤 Tải lên'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadDocument;
