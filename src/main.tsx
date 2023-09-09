import ReactDOM from 'react-dom/client';
import '@/index.css';
import { BrowserRouter } from 'react-router-dom';
import { App } from 'pages/index';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>
)
