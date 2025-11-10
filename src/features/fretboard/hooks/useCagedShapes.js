import { useMemo } from "react";
import cagedData from "../data/cagedData";

export default function useCagedShapes(root, variant) {
    return useMemo(() => {
        const set = cagedData[variant] || [];
        // naive mapping: shift ranges based on root index for demo
        return set.map((shape, i) => ({
            name: shape.name,
            fretRange: [shape.start, shape.end],
        }));
    }, [root, variant]);
}

