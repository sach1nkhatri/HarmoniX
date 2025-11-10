import React, { useMemo, useState } from "react";
import useCagedShapes from "../hooks/useCagedShapes";

export default function CagedOverlay({ root }) {
    const [variant, setVariant] = useState("major"); // "major" | "minor"
    const shapes = useCagedShapes(root, variant);

    const ranges = useMemo(() => {
        return shapes.map(s => s.fretRange);
    }, [shapes]);

    return (
        <div className="caged-overlay">
            <div className="caged-toolbar">
                <span>CAGED</span>
                <select value={variant} onChange={(e)=>setVariant(e.target.value)}>
                    <option value="major">Major</option>
                    <option value="minor">Minor</option>
                </select>
            </div>
            <div className="caged-ranges">
                {ranges.map((r, i) => (
                    <div key={i} className="caged-chip">{r[0]}–{r[1]}</div>
                ))}
            </div>
        </div>
    );
}

