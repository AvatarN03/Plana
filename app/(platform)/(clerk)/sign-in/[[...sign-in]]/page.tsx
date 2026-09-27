import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <SignIn 
      redirectUrl="/select-org"
      fallbackRedirectUrl="/select-org"
    />
  )
}