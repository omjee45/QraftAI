import React, { useState, useRef } from 'react'
import "../style/home.scss"
import { useInterview } from '../hooks/useInterview.js'
import { useNavigate } from 'react-router'
import Navbar from '../../../components/Navbar.jsx'

const Home = () => {

    const { loading, generateReport, reports } = useInterview()
    const [jobDescription, setJobDescription] = useState("")
    const [selfDescription, setSelfDescription] = useState("")
    const [selectedFileName, setSelectedFileName] = useState("")
    const resumeInputRef = useRef()

    const navigate = useNavigate()

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current?.files?.[0]
        const data = await generateReport({ jobDescription, selfDescription, resumeFile })
        if (data?._id) {
            navigate(`/interview/${data._id}`)
        }
    }

    if (loading) {
        return (
            <>
                <Navbar />
                <main className='loading-screen'>
                    <div className="loading-runner">
                        <div className="runner-ring"></div>
                        <span className="runner-icon">&lt;/&gt;</span>
                    </div>
                    <h1>Compiling Your Interview Study Plan...</h1>
                    <p>Evaluating job requirements, mapping candidate tech stack, and generating targeted interview questions &amp; roadmap.</p>
                    <div className="loading-steps">
                        <span className="step-pill step-pill--active">1. Parse Spec</span>
                        <span className="step-pill step-pill--active">2. Match Skills</span>
                        <span className="step-pill step-pill--active">3. Synthesize Prep</span>
                    </div>
                </main>
            </>
        )
    }

    return (
        <>
            <Navbar />
            <div className='home-page'>

                {/* Page Header */}
                <header className='page-header'>
                    <h1>Target Role &amp; <span className='highlight'>Candidate Dossier</span></h1>
                    <p>Provide the target job specifications and your background to construct algorithmic, technical &amp; behavioral question sets tailored for high-bar interviews.</p>
                </header>

                {/* Main IDE Card */}
                <div className='interview-card'>
                    {/* IDE Topbar */}
                    <div className="interview-card__topbar">
                        <div className="topbar-tabs">
                            <div className="topbar-tab">
                                <span className="tab-dot"></span>
                                job_description.spec
                            </div>
                            <div className="topbar-tab">
                                candidate_profile.dossier
                            </div>
                        </div>
                        <div className="topbar-actions">
                            <span className="action-dot action-dot--red"></span>
                            <span className="action-dot action-dot--yellow"></span>
                            <span className="action-dot action-dot--green"></span>
                        </div>
                    </div>

                    <div className='interview-card__body'>

                        {/* Left Panel - Job Description */}
                        <div className='panel panel--left'>
                            <div className='panel__header'>
                                <div className="header-title-group">
                                    <span className='panel__icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
                                    </span>
                                    <h2>Target Job Requirements</h2>
                                </div>
                                <span className='badge badge--required'>Required</span>
                            </div>
                            <textarea
                                value={jobDescription}
                                onChange={(e) => { setJobDescription(e.target.value) }}
                                className='panel__textarea'
                                placeholder={`// Paste full job description / role requirements...\n// e.g.:\n// Role: Senior Fullstack Engineer\n// Requirements:\n// - Proficient in React, Node.js, distributed databases\n// - System design: caching, microservices, concurrency\n// - 3+ years experience building scalable systems`}
                                maxLength={5000}
                            />
                            <div className='char-counter'>{jobDescription.length} / 5000 chars</div>
                        </div>

                        {/* Vertical Divider */}
                        <div className='panel-divider' />

                        {/* Right Panel - Profile */}
                        <div className='panel panel--right'>
                            <div className='panel__header'>
                                <div className="header-title-group">
                                    <span className='panel__icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                                    </span>
                                    <h2>Candidate Profile</h2>
                                </div>
                            </div>

                            {/* Upload Resume */}
                            <div className='upload-section'>
                                <label className='section-label'>
                                    <span>Resume File</span>
                                    <span className='badge badge--best'>Recommended</span>
                                </label>
                                <label className='dropzone' htmlFor='resume'>
                                    <span className='dropzone__icon'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="12" y2="12"/><line x1="15" y1="15" x2="12" y2="12"/></svg>
                                    </span>
                                    <p className='dropzone__title'>{selectedFileName ? `Attached: ${selectedFileName}` : 'Select Resume (PDF)'}</p>
                                    <p className='dropzone__subtitle'>{selectedFileName ? 'Click to replace attached file' : 'Click to browse or drop file (Max 5MB)'}</p>
                                    <input
                                        ref={resumeInputRef}
                                        hidden
                                        type='file'
                                        id='resume'
                                        name='resume'
                                        accept='.pdf'
                                        onChange={(e) => setSelectedFileName(e.target.files?.[0]?.name || '')}
                                    />
                                </label>
                            </div>

                            {/* OR Divider */}
                            <div className='or-divider'><span>OR</span></div>

                            {/* Quick Self-Description */}
                            <div className='self-description'>
                                <label className='section-label' htmlFor='selfDescription'>Quick Background Summary</label>
                                <textarea
                                    value={selfDescription}
                                    onChange={(e) => { setSelfDescription(e.target.value) }}
                                    id='selfDescription'
                                    name='selfDescription'
                                    className='panel__textarea panel__textarea--short'
                                    placeholder="// If no resume PDF is handy, summarize your current role, primary technologies, years of experience, and key projects..."
                                />
                            </div>

                            {/* Info Box */}
                            <div className='info-box'>
                                <span className='info-box__icon'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg>
                                </span>
                                <p>Provide either your <strong>Resume PDF</strong> or a <strong>Summary</strong> so the AI can compute real role match scores and identify exact skill gaps.</p>
                            </div>
                        </div>
                    </div>

                    {/* Card Footer */}
                    <div className='interview-card__footer'>
                        <span className='footer-info'>
                            <span className="status-pulse"></span>
                            Engine: Gemini 2.5 Flash &bull; Study Plan Synthesizer Ready
                        </span>
                        <button
                            onClick={handleGenerateReport}
                            className='generate-btn'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                            Run Analysis &amp; Generate Plan
                        </button>
                    </div>
                </div>

                {/* Recent Reports List (LeetCode Row Style with Green Text) */}
                {reports.length > 0 && (
                    <section className='recent-reports'>
                        <div className="recent-header">
                            <h2>My Prepared Study Sheets</h2>
                            <span className="report-count">{reports.length} Sheets Available</span>
                        </div>
                        <div className='reports-grid'>
                            {reports.map(report => (
                                <div key={report._id} className='report-item' onClick={() => navigate(`/interview/${report._id}`)}>
                                    <div className="report-left">
                                        <h3>{report.title || 'Target Role Study Plan'}</h3>
                                        <span className='report-date'>{new Date(report.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div className="report-right">
                                        <span className={`match-score-text ${report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low'}`}>
                                            {report.matchScore}% Match
                                        </span>
                                        <span className="review-link">Open &rarr;</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Page Footer */}
                <footer className='page-footer'>
                    <a href='#'>Documentation</a>
                    <a href='#'>Interview Patterns</a>
                    <a href='#'>DSA &amp; System Design Tracks</a>
                </footer>
            </div>
        </>
    )
}

export default Home