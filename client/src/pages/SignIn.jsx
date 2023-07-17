import { SignIn, ClerkLoading, ClerkLoaded, useSignIn } from '@clerk/clerk-react'

export default function SignInPage() {
  const { isLoaded, signIn } = useSignIn()
  console.log('signIn: >>>>>>>>>', signIn)

  return (
    <>
      {/* <ClerkLoading>
        <div className='flex items-center justify-center'>
          loading...
        </div>
      </ClerkLoading> */}
      {!isLoaded && (
        <div className='flex items-center justify-center'>
          loading...
        </div>
      )}
      <ClerkLoaded>
        <div className='my-6 flex items-center justify-center'>
          <SignIn routing='path' path='/sign-in' redirectUrl='/' />
        </div>
      </ClerkLoaded>
    </>
  )
}
