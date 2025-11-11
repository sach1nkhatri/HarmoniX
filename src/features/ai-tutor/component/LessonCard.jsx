import React from "react";

export default function LessonCard({ title, description, xp = 50, onStart }) {
    return (
        <div className="tutor-card">
            <div className="tutor-card-title">{title}</div>
            <div className="tutor-card-desc">{description}</div>
            <div className="tutor-card-row">
                <span className="tutor-xp">+{xp} XP</span>
                <button className="tutor-btn" onClick={onStart}>Start</button>
            </div>
        </div>
    );
}

