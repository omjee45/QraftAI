import React, { useState, useEffect } from 'react'
import '../style/interview.scss'
import { useInterview } from '../hooks/useInterview.js'
import { Link, useParams } from 'react-router'
import Navbar from '../../../components/Navbar.jsx'

const NAV_ITEMS = [
    { 
        id: 'technical', 
        label: 'Technical Problems', 
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) 
    },
    { 
        id: 'behavioral', 
        label: 'Behavioral Scenarios', 
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) 
    },
    { 
        id: 'roadmap', 
        label: 'Day-by-Day Roadmap', 
        icon: (<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) 
    },
]

// ── Sub-components ────────────────────────────────────────────────────────────
const QuestionCard = ({ item, index }) => {
    const [ open, setOpen ] = useState(index === 0)
    return (
        <div className='q-card'>
            <div className='q-card__header' onClick={() => setOpen(o => !o)}>
                <div className="q-card__left">
                    <span className='q-card__index'>Problem #{String(index + 1).padStart(2, '0')}</span>
                    <p className='q-card__question'>{item.question}</p>
                </div>
                <span className={`q-card__chevron ${open ? 'q-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </div>
            {open && (
                <div className='q-card__body'>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--intention'>Interviewer Intention &amp; Focus</span>
                        <p>{item.intention}</p>
                    </div>
                    <div className='q-card__section'>
                        <span className='q-card__tag q-card__tag--answer'>Optimal Model Approach &amp; Solution</span>
                        <div className="answer-box">
                            <p>{item.answer}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

const RoadMapDay = ({ day }) => (
    <div className='roadmap-day'>
        <div className='roadmap-day__header'>
            <span className='roadmap-day__badge'>Day {day.day}</span>
            <h3 className='roadmap-day__focus'>{day.focus}</h3>
        </div>
        <ul className='roadmap-day__tasks'>
            {day.tasks.map((task, i) => (
                <li key={i}>
                    <span className='roadmap-day__bullet' />
                    <span>{task}</span>
                </li>
            ))}
        </ul>
    </div>
)

// ── Main Component ────────────────────────────────────────────────────────────
const Interview = () => {
    const [ activeNav, setActiveNav ] = useState('technical')
    const { report, getReportById, loading, getResumePdf, downloadingResume } = useInterview()
    const { interviewId } = useParams()

    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId)
        }
    }, [ interviewId ])

    if (loading || !report) {
        return (
            <>
                <Navbar />
                <main className='loading-screen'>
                    <div className="loading-runner">
                        <div className="runner-ring"></div>
                        <span className="runner-icon">&lt;/&gt;</span>
                    </div>
                    <h1>Loading Interview Workspace...</h1>
                    <p>Fetching problem statements, evaluation parameters, and preparation roadmap.</p>
                </main>
            </>
        )
    }

    const scoreColor =
        report.matchScore >= 80 ? 'score--high' :
            report.matchScore >= 60 ? 'score--mid' : 'score--low'

    return (
        <>
            <Navbar />
            <div className='interview-page'>

                {/* Top Action & Breadcrumb Bar */}
                <div className="interview-topbar">
                    <div className="topbar-breadcrumb">
                        <Link to="/">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
                            Prep Studio
                        </Link>
                        <span className="crumb-sep">/</span>
                        <span className="crumb-current">{report.title || 'Study Plan Workspace'}</span>
                    </div>

                    <div className="topbar-right">
                        <button
                            onClick={() => { getResumePdf(interviewId) }}
                            disabled={downloadingResume}
                            className='button primary-button'>
                            {downloadingResume ? (
                                <>
                                    <svg className="spinner-icon" height="14" width="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="2" x2="12" y2="6"></line>
                                        <line x1="12" y1="18" x2="12" y2="22"></line>
                                        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
                                        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
                                        <line x1="2" y1="12" x2="6" y2="12"></line>
                                        <line x1="18" y1="12" x2="22" y2="12"></line>
                                        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
                                        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
                                    </svg>
                                    Generating Resume PDF...
                                </>
                            ) : (
                                <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                                    Download Tailored Resume
                                </>
                            )}
                        </button>
                    </div>
                </div>

                <div className='interview-layout'>

                    {/* ── Left Nav (Problem Selector) ── */}
                    <nav className='interview-nav'>
                        <div className="nav-content">
                            <p className='interview-nav__label'>Problem Sets &amp; Modules</p>
                            {NAV_ITEMS.map(item => {
                                const count = item.id === 'technical'
                                    ? report.technicalQuestions?.length
                                    : item.id === 'behavioral'
                                        ? report.behavioralQuestions?.length
                                        : report.preparationPlan?.length;

                                return (
                                    <button
                                        key={item.id}
                                        className={`interview-nav__item ${activeNav === item.id ? 'interview-nav__item--active' : ''}`}
                                        onClick={() => setActiveNav(item.id)}
                                    >
                                        <div className="item-left">
                                            <span className='interview-nav__icon'>{item.icon}</span>
                                            {item.label}
                                        </div>
                                        {count !== undefined && (
                                            <span className="track-badge">{count}</span>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </nav>

                    <div className='interview-divider' />

                    {/* ── Center Content ── */}
                    <main className='interview-content'>
                        {activeNav === 'technical' && (
                            <section>
                                <div className='content-header'>
                                    <h2>
                                        <span className="header-icon">&lt;/&gt;</span>
                                        Technical &amp; System Design Problems
                                    </h2>
                                    <span className='content-header__count'>{report.technicalQuestions?.length || 0} Problems</span>
                                </div>
                                <div className='q-list'>
                                    {report.technicalQuestions?.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'behavioral' && (
                            <section>
                                <div className='content-header'>
                                    <h2>
                                        <span className="header-icon">&#x229E;</span>
                                        Behavioral &amp; Culture Scenarios
                                    </h2>
                                    <span className='content-header__count'>{report.behavioralQuestions?.length || 0} Scenarios</span>
                                </div>
                                <div className='q-list'>
                                    {report.behavioralQuestions?.map((q, i) => (
                                        <QuestionCard key={i} item={q} index={i} />
                                    ))}
                                </div>
                            </section>
                        )}

                        {activeNav === 'roadmap' && (
                            <section>
                                <div className='content-header'>
                                    <h2>
                                        <span className="header-icon">&#x29BF;</span>
                                        Structured Prep Roadmap
                                    </h2>
                                    <span className='content-header__count'>{report.preparationPlan?.length || 0}-Day Plan</span>
                                </div>
                                <div className='roadmap-list'>
                                    {report.preparationPlan?.map((day) => (
                                        <RoadMapDay key={day.day} day={day} />
                                    ))}
                                </div>
                            </section>
                        )}
                    </main>

                    <div className='interview-divider' />

                    {/* ── Right Sidebar ── */}
                    <aside className='interview-sidebar'>

                        {/* Match Score */}
                        <div className='match-score'>
                            <p className='match-score__label'>Role Alignment Rating</p>
                            <div className={`match-score__ring ${scoreColor}`}>
                                <span className='match-score__value'>{report.matchScore}</span>
                                <span className='match-score__pct'>% MATCH</span>
                            </div>
                            <p className='match-score__sub'>
                                {report.matchScore >= 80 ? 'Strong Match &bull; High Readiness' : report.matchScore >= 60 ? 'Moderate Match &bull; Review Skill Gaps' : 'Targeted Revision Recommended'}
                            </p>
                        </div>

                        <div className='sidebar-divider' />

                        {/* Skill Gaps */}
                        <div className='skill-gaps'>
                            <p className='skill-gaps__label'>Topics to Revise / Skill Gaps</p>
                            <div className='skill-gaps__list'>
                                {report.skillGaps?.map((gap, i) => (
                                    <span key={i} className={`skill-tag skill-tag--${gap.severity}`}>
                                        {gap.skill}
                                    </span>
                                ))}
                            </div>
                        </div>

                    </aside>
                </div>
            </div>
        </>
    )
}

export default Interview