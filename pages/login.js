import { useSession, signIn, signOut } from "next-auth/react"
import LoginLayout from "../components/LoginLayout"


function Login() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn('github', { callbackUrl: `/preferences` })}>Sign in</button>
    </>
  )
}

Login.getLayout = function getLayout(Login) {
  return (
    <LoginLayout>{Login}</LoginLayout>
  )
}

export default Login