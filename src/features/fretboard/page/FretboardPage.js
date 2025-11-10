import React from "react";
import Fretboard from "../component/Fretboard";
import TheorySidebar from "../component/TheorySidebar";
import "../css/sidebar.css";

export default function FretboardPage() {
    return (
        <div className="fb-page">
            <div className="fb-page-main">
                <Fretboard />
            </div>
            <aside className="fb-page-sidebar">
                <TheorySidebar />
            </aside>
        </div>
    );
}