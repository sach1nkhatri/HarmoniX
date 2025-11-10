import React, { useState } from "react";
import promptData from "../data/promptData";

export default function PromptEngine() {
    const [idx, setIdx] = useState(0);
    const prompt = promptData[idx];
    return (
        <div className="tutor-box">
            <div className="tutor-head">Practice Prompt</div>
            <div className="tutor-body">{prompt.text}</div>
            <div className="tutor-actions">
                <button className="tutor-btn" onClick={()=>setIdx((i)=>(i+1)%promptData.length)}>Next</button>
            </div>
        </div>
    );
}

