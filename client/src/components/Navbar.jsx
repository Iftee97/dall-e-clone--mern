import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { useUser, useClerk } from "@clerk/clerk-react"
import { logo } from "../assets"

export default function Navbar() {
  const [showPopover, setShowPopover] = useState(false)

  const { signOut } = useClerk()
  const { isLoaded, isSignedIn, user } = useUser()

  useEffect(() => {
    if (isSignedIn) {
      addLoggedInUserToDb(user)
    }
  }, [isSignedIn])

  async function addLoggedInUserToDb(user) {
    const res = await fetch('http://localhost:8080/api/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullName: user.fullName,
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
      })
    })
    console.log('backend login res: >>>>>>>>', res)
    if (res.ok) {
      console.log('adding to db failed')
    } else {
      alert('please try again.')
      await signOut()
    }
  }

  async function handleSignOut() {
    await signOut()
    setShowPopover(false)
  }

  return (
    <header className="w-full flex justify-between items-center bg-white sm:px-8 px-4 py-4 border-b border-b-[#e6ebf4]">
      <Link to="/">
        <img
          src={logo}
          alt="logo"
          className="w-28 object-contain"
        />
      </Link>
      {!isLoaded && (
        <div className="flex items-center gap-4">
          <div className="animate-pulse bg-[#e6ebf4] w-10 h-10 rounded-full" />
          <div className="animate-pulse bg-[#e6ebf4] w-20 h-10 rounded-md" />
        </div>
      )}
      {isLoaded && isSignedIn && (
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={user?.imageUrl}
              alt="user avatar"
              className="w-8 h-8 rounded-full cursor-pointer"
              onClick={() => setShowPopover(!showPopover)}
            />
            {showPopover && (
              <div className="bg-slate-100 p-3 rounded-md absolute top-[35px] right-[-75px] w-[150px]">
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm text-blue-400 hover:text-blue-500">
                    {user?.fullName}
                  </span>
                  <button className="text-sm text-red-500 hover:underline border-none" onClick={handleSignOut}>
                    sign out
                  </button>
                </div>
              </div>
            )}
          </div>
          <Link to="/create-post" className="font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md">
            Create
          </Link>
        </div>
      )}
      {isLoaded && !isSignedIn && (
        <Link to='/sign-in'>
          Sign In
        </Link>
      )}
    </header>
  )
}
