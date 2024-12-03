import { useAuth0 } from '@auth0/auth0-react'
import '../styles/AuthButton.css'

const SignInButton = () => {
    const {loginWithRedirect, isAuthenticated } = useAuth0()

    return (
        !isAuthenticated &&(
            <button className="sign_in" onClick={() => loginWithRedirect()}>
                Sign In
            </button>
        )
    )
}

export default SignInButton