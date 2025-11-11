// src/features/dashboard/page/DashboardPage.jsx
import React from "react";
import Fretboard from "../../fretboard/component/Fretboard";
import TunerWidget from "../../tuner/component/TunerWidget";
import "../css/dashboard.css";

export default function DashboardPage() {
    return (
        <div className="dash-container">
            <section className="dash-hero">
                <div className="dash-hero-title">Welcome to HarmoniX Academy</div>
                <div className="dash-hero-sub">Master the neck, master the music.</div>
            </section>
            <section className="dash-widgets">
                <div className="dash-card">
                    <h3>Interactive Fretboard</h3>
                    <Fretboard />
                </div>
                <div className="dash-card" style={{maxWidth:"280px"}}>
                    <h3>Quick Tuner</h3>
                    <TunerWidget />
                </div>
            </section>
        </div>
    );
}
