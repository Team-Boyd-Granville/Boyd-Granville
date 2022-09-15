import  { useSession, signIn, signOut } from "next-auth/react"
import LoginLayout from "../components/LoginLayout"


const Login = () => {
const {data: session} = useSession()

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
      <button onClick={() => signIn('github', { callbackUrl: `/home` })}>Sign in</button>
    </>
  )
}

Login.getLayout = function getLayout(login) {
  return (
      <LoginLayout>{login}</LoginLayout>
  )
}

export default Login