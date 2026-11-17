import React from 'react';
import { createRoot } from 'react-dom/client';
import { AdminDashboard } from './components/admin/AdminDashboard';
import './index.css';

const host = document.getElementById('admin-root');
if (!host) throw new Error('Admin mount element is unavailable.');
createRoot(host).render(<AdminDashboard />);
