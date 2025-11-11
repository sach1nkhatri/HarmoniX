import React, { useState } from "react";
import "../css/profile.css";

export default function ProfilePage() {
    const [showNotice, setShowNotice] = useState(false);
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");

    function handleSave(e) {
        e.preventDefault();
        setShowNotice(true);
    }

    return (
        <div className="profile-page">
            <div className="profile-hero">
                <h1>Profile</h1>
                <p className="profile-subtitle">Manage your account and track your progress</p>
            </div>
            <div className="profile-content">
                <div className="profile-card">
                    <h2>Statistics</h2>
                    <div className="profile-stats">
                        <div className="profile-stat-item">
                            <div className="profile-stat-label">Total XP</div>
                            <div className="profile-stat-value">0</div>
                        </div>
                        <div className="profile-stat-item">
                            <div className="profile-stat-label">Current Streak</div>
                            <div className="profile-stat-value">0 days</div>
                        </div>
                        <div className="profile-stat-item">
                            <div className="profile-stat-label">Lessons Completed</div>
                            <div className="profile-stat-value">0</div>
                        </div>
                    </div>
                </div>
                <div className="profile-card">
                    <h2>Account Settings</h2>
                    <div className="profile-settings">
                        <div className="profile-setting-item">
                            <label>Display Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={displayName}
                                onChange={(e) => setDisplayName(e.target.value)}
                            />
                        </div>
                        <div className="profile-setting-item">
                            <label>Email</label>
                            <input
                                type="email"
                                placeholder="your.email@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <button className="profile-save-btn" onClick={handleSave}>Save Changes</button>
                    </div>
                </div>
                <div className="profile-card">
                    <h2>Progress</h2>
                    <div className="profile-progress">
                        <p className="profile-progress-text">Your learning journey starts here. Complete lessons to see your progress!</p>
                    </div>
                </div>
            </div>
            {showNotice && (
                <div className="profile-modal-overlay" onClick={() => setShowNotice(false)}>
                    <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="profile-modal-icon">🎉</div>
                        <h3 className="profile-modal-title">Thanks for the love!</h3>
                        <p className="profile-modal-text">
                            Our backend is currently under development. Profile updates like display name and email
                            will be coming soon. Stay tuned — and thanks for your support!
                        </p>
                        <button className="profile-modal-btn" onClick={() => setShowNotice(false)}>Got it</button>
                    </div>
                </div>
            )}
        </div>
    );
}

