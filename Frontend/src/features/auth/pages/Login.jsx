import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Login = () => {

    const { loading, handleLogin } = useAuth()
    const navigate = useNavigate()

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleLogin({ email, password })
        navigate('/')
    }

    if (loading) {
        return (
            <main className="auth-page">
                <div className="auth-card" style={{ textAlign: "center", alignItems: "center" }}>
                    <div className="brand-icon">&lt;/&gt;</div>
                    <h2 style={{ fontSize: "1.1rem", marginTop: "1rem" }}>Authenticating...</h2>
                </div>
            </main>
        )
    }

    return (
        <main className="auth-page">
            <div className="auth-card">
                <div className="auth-brand">
                    <div className="brand-icon">&lt;/&gt;</div>
                    <h1>Candidate Portal</h1>
                    <p>Sign in to access your custom interview problems, company roadmaps, and resume analyses.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">ACCOUNT EMAIL</label>
                        <input
                            onChange={(e) => { setEmail(e.target.value) }}
                            type="email"
                            id="email"
                            name='email'
                            placeholder='candidate@domain.com'
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">PASSWORD</label>
                        <input
                            onChange={(e) => { setPassword(e.target.value) }}
                            type="password"
                            id="password"
                            name='password'
                            placeholder='&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;'
                            required
                        />
                    </div>
                    <button className='button primary-button auth-submit-btn'>
                        Sign In
                    </button>
                </form>

                <p className="auth-footer">
                    New to QraftAI? 
                    <Link to="/register">Create Candidate Account</Link>
                </p>
            </div>
        </main>
    )
}

export default Login