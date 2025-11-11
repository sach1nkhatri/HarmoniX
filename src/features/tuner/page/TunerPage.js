import React from "react";
import TunerWidget from "../component/TunerWidget";
import "../css/tuner.css";

export default function TunerPage() {
    return (
        <div className="tuner-page">
            <h2>Tuner</h2>
            <TunerWidget />
        </div>
    );
}