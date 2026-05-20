import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AdminLogin = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const res = await axios.post(
        `${apiUrl}/admin/login`,
        { email, password }
      );

      // ...existing code...

      if (res.data.token) {
        localStorage.setItem('apkpac_admin_token', res.data.token);
        router.push('/admin/dashboard');
      } else {
        setError('Token not received');
      }

    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 py-12 px-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-md p-10 rounded-2xl shadow-2xl border border-blue-100">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-blue-600 rounded-full p-3 mb-2 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 2c-2.67 0-8 1.337-8 4v2a1 1 0 001 1h14a1 1 0 001-1v-2c0-2.663-5.33-4-8-4z" /></svg>
            </div>
            <h2 className="text-2xl font-extrabold text-blue-700 mb-1 tracking-tight">Admin Login</h2>
            <p className="text-gray-500 text-sm">Sign in to your admin account</p>
          </div>
          {error && <div className="text-red-500 mb-3 text-center font-medium">{error}</div>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="email">Email</label>
            <input id="email" type="email" placeholder="admin@example.com" value={email}
              onChange={e => setEmail(e.target.value)}
              className="border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2 w-full transition outline-none bg-blue-50/50" required />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-semibold mb-1" htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Password" value={password}
              onChange={e => setPassword(e.target.value)}
              className="border border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 rounded-lg px-4 py-2 w-full transition outline-none bg-blue-50/50" required />
          </div>
          <button type="submit" className="bg-blue-600 hover:bg-blue-700 transition text-white font-bold px-4 py-2 rounded-lg w-full shadow-md text-lg">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

