import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Home, CreatePost, SignIn } from './pages'
import { Navbar } from './components'
import { useUser } from '@clerk/clerk-react'

export default function App() {
  const { isSignedIn } = useUser()

  return (
    <BrowserRouter>
      <Navbar />
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create-post" element={isSignedIn ? <CreatePost /> : <Navigate to='/' />} />
          <Route path="/sign-in" element={isSignedIn ? <Navigate to='/' /> : <SignIn />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}
