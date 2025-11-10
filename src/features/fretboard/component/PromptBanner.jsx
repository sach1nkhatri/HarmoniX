import React from "react";
import usePrompts from "../hooks/usePrompts";

export default function PromptBanner() {
    const { prompt, next } = usePrompts();
    return (
        <div className="fb-prompt" onClick={next} title="Click for next prompt">
            <span className="label">AI Practice Prompt</span>
            <span className="text">{prompt}</span>
        </div>
    );
}

