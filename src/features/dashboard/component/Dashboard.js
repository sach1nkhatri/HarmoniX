// src/features/dashboard/component/Dashboard.jsx
import React from "react";
import Fretboard from "../../fretboard/component/Fretboard";
import "../css/dashboard.css";

export default function Dashboard() {
    return (
        <div className="dashboard-shell">
            <aside className="dash-sidebar">
                <h2>GuitarLab</h2>
                <p>Tools</p>
            </aside>
            <main className="dash-main">
                <h1>Dashboard</h1>
                <Fretboard />
            </main>
        </div>
    );
}
