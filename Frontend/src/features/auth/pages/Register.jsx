import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router'
import "../auth.form.scss"
import { useAuth } from '../hooks/useAuth'

const Register = () => {

    const navigate = useNavigate()
    const [ username, setUsername ] = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const { loading, handleRegister } = useAuth()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate("/")
    }

    if (loading) {
        return (
            <main className="auth-page">
                <div className="auth-card" style={{ textAlign: "center", alignItems: "center" }}>
                    <div className="brand-icon">&lt;/&gt;</div>
                    <h2 style={{ fontSize: "1.1rem", marginTop: "1rem" }}>Creating Candidate Profile...</h2>
                </div>
            </main>
        )
    }

    return (
        <main className="auth-page">
            <div className="auth-card">
                <div className="auth-brand">
                    <div className="brand-icon">&lt;/&gt;</div>
                    <h1>Create Candidate Account</h1>
                    <p>Join the AI interview preparation studio for targeted DSA and technical interview readiness.</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">CODENAME / USERNAME</label>
                        <input
                            onChange={(e) => { setUsername(e.target.value) }}
                            type="text"
                            id="username"
                            name='username'
                            placeholder='e.g. striver45'
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">EMAIL ADDRESS</label>
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
                        Create Account &amp; Start Prepping
                    </button>
                </form>

                <p className="auth-footer">
                    Already registered? 
                    <Link to="/login">Sign In</Link>
                </p>
            </div>
        </main>
    )
}

export default Register