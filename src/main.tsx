import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Safely suppress errors originating from external browser extensions in iframe
window.addEventListener('error', (event) => {
  if (
    (event.filename && event.filename.includes('chrome-extension://')) ||
    (event.message && event.message.includes('Cannot set property fetch'))
  ) {
    event.preventDefault();
  }
});

createRoot(document.getElementById('root')!).render(<App />);
