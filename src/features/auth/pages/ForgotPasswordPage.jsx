import { useState } from 'react';
import { Link } from 'react-router-dom';
import { API_CONFIG } from '../../../api/config';
import { ArrowRight, Mail } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });
    setIsLoading(true);

    try {
      // Remove /api from baseURL if it's already there because the endpoint is /api/Authentication/...
      // Actually API_CONFIG.baseURL usually includes /api. 
      // Let's check API_CONFIG again. It was http://pgs.runasp.net/api
      // So we should append /Authentication/Forgot-Password
      
      const response = await fetch(`${API_CONFIG.baseURL}/Authentication/Forgot-Password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      // Check for various success responses based on API behavior
      if (response.ok) {
        setStatus({
          type: 'success',
          message: 'تم إرسال تعليمات استعادة كلمة المرور إلى بريدك الإلكتروني.'
        });
        setEmail('');
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'فشل إرسال الطلب. تأكد من صحة البريد الإلكتروني.'
        });
      }
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'حدث خطأ في الاتصال بالخادم. يرجى المحاولة لاحقاً.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
              <Mail className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">استعادة الحساب</h1>
            <p className="text-gray-600 mt-2">أدخل بريدك الإلكتروني لاستلام تعليمات الاستعادة</p>
          </div>

          {/* Status Message */}
          {status.message && (
            <div className={`mb-6 p-4 border rounded-lg ${
              status.type === 'success' 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <p className="text-sm text-center">{status.message}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                البريد الإلكتروني
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="admin@example.com"
                disabled={isLoading}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  جاري الإرسال...
                </span>
              ) : (
                'إرسال رابط الاستعادة'
              )}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-6 text-center">
            <Link to="/login" className="inline-flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowRight className="w-4 h-4 ml-1" />
              العودة لتسجيل الدخول
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
