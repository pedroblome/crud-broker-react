import './App.css'
import { AuthProvider } from './auth/AuthContext'
import { AuthGate } from './components/AuthGate'

function App() {
  return (
    <AuthProvider>
      <AuthGate />
    </AuthProvider>
  )
}

export default App
