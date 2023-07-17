import React, { useState, useEffect } from 'react'
import { useUser } from '@clerk/clerk-react'
import { RenderCards, Loader } from '../components'

export default function Profile() {
  const { user } = useUser()
  const [allPosts, setAllPosts] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        const response = await fetch(`${import.meta.env.VITE_APP_DEV_BACKEND_SERVER_BASE_URL}/api/v1/post`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.ok) {
          const result = await response.json()
          console.log('result: >>>>>>>>>>', result)
          setAllPosts(result.data.filter((item) => item.name === user.fullName).reverse())
        }
      } catch (error) {
        console.log(error)
        alert(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  console.log('allPosts: >>>>>>>>>>', allPosts)

  return (
    <div className="max-w-7xl mx-auto">
      <div className='text-center'>
        <h1 className="font-extrabold text-[#222328] text-[32px]">
          {user.fullName}'s Profile
        </h1>
        <p className="mt-2 text-[#666e75] text-[14px]">
          Your Generated Images
        </p>
      </div>
      <div className="mt-10">
        {loading ? (
          <div className="flex items-center justify-center">
            <Loader />
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-3">
            <RenderCards data={allPosts} title="No posts found" />
          </div>
        )}
      </div>
    </div>
  )
}
