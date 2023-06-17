import { SignIn, ClerkLoading, ClerkLoaded } from '@clerk/clerk-react'

export default function SignInPage() {
  return (
    <>
      <ClerkLoading>
        <div className='flex items-center justify-center'>
          loading...
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <div className='my-6 flex items-center justify-center'>
          <SignIn routing='path' path='/sign-in' redirectUrl='/' />
        </div>
      </ClerkLoaded>
    </>
  )
}
