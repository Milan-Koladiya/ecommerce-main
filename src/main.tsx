import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { AuthProvider } from './context/AuthContex.js'
import store from './store/index.js'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>

)
