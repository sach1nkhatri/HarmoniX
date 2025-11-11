import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.css";
import logoImg from "./assets/images/logo.png";

import DashboardPage from "./features/dashboard/page/DashboardPage";
import FretboardPage from "./features/fretboard/page/FretboardPage";
import TunerPage from "./features/tuner/page/TunerPage";
import PracticePage from "./features/practice/page/PracticePage";
import ProfilePage from "./features/profile/page/ProfilePage";
import TheoryPage from "./features/theory/page/TheoryPage";
import AdPopup from "./components/AdPopup";

function App() {
    return (
        <Router>
            <div className="hx-shell">
                <header className="hx-topbar">
                    <div className="hx-brand">
                        <img src={logoImg} alt="HarmoniX logo" className="hx-logo" />
                        <div className="hx-title">
                            <div className="hx-name">HarmoniX Academy</div>
                            <div className="hx-tagline">Master the neck, master the music.</div>
                        </div>
                    </div>
                    <nav className="hx-nav">
                        <Link to="/dashboard">Dashboard</Link>
                        <Link to="/fretboard">Fretboard</Link>
                        <Link to="/theory">Theory</Link>
                        <Link to="/practice">Practice</Link>
                        <Link to="/tuner">Tuner</Link>
                        <Link to="/profile">Profile</Link>
                    </nav>
                </header>
                <main className="hx-main">
                    <Routes>
                        <Route path="/" element={<Navigate to="/dashboard" />} />
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/fretboard" element={<FretboardPage />} />
                        <Route path="/tuner" element={<TunerPage />} />
                        <Route path="/theory" element={<TheoryPage />} />
                        <Route path="/practice" element={<PracticePage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        {/* fallback: any unknown route → dashboard */}
                        <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                </main>
                <AdPopup />
                <footer className="hx-footer">
                    <div className="hx-footer-grid">
                        <div className="hx-footer-brand">
                            <img src={logoImg} alt="HarmoniX logo" className="hx-logo" />
                            <div>
                                <div className="hx-name">HarmoniX Academy</div>
                                <div className="hx-tagline">Master the neck, master the music.</div>
                            </div>
                        </div>
                        <div>
                            <div className="hx-foot-head">Products</div>
                            <ul className="hx-foot-list">
                                <li><Link to="/fretboard">Interactive Fretboard</Link></li>
                                <li><Link to="/tuner">Guitar Tuner</Link></li>
                                <li><Link to="/practice">Metronome</Link></li>
                            </ul>
                        </div>
                        <div>
                            <div className="hx-foot-head">Learn</div>
                            <ul className="hx-foot-list">
                                <li><Link to="/theory">Music Theory</Link></li>
                                <li><Link to="/fretboard">CAGED System</Link></li>
                                <li><Link to="/practice">Ear Training</Link></li>
                            </ul>
                        </div>
                        <div>
                            <div className="hx-foot-head">Community</div>
                            <ul className="hx-foot-list">
                                <li><a href="#">Roadmap</a></li>
                                <li><a href="#">Changelog</a></li>
                                <li><a href="#">Support</a></li>
                            </ul>
                        </div>
                        <div>
                            <div className="hx-foot-head">Assets</div>
                            <ul className="hx-foot-list">
                                <li><a href="#">Logos</a></li>
                                <li><a href="#">Brand Guide</a></li>
                                <li><a href="#">Press Kit</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="hx-foot-bottom">
                        © 2025 | HarmoniX Academy | Built by Sachin Khatri. All Rights Reserved.
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
