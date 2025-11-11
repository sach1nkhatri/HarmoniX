import { useCallback, useMemo, useState } from "react";

const DEFAULT_PROMPTS = [
    "Find all G notes on the fretboard.",
    "Play the Mixolydian scale starting from the 5th position.",
    "Ascend then descend A minor pentatonic in position 2.",
    "Target the 3rd of each chord in a I–IV–V in C.",
];

export default function usePrompts(seedPrompts) {
    const prompts = useMemo(() => seedPrompts || DEFAULT_PROMPTS, [seedPrompts]);
    const [idx, setIdx] = useState(0);

    const next = useCallback(() => {
        setIdx((v) => (v + 1) % prompts.length);
    }, [prompts.length]);

    return {
        prompt: prompts[idx],
        next,
    };
}

