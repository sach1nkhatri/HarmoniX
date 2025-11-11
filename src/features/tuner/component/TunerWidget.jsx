import React, { useEffect, useRef, useState } from "react";

const GUITAR_STRINGS = [
    { name: "E4", freq: 329.63 },
    { name: "B3", freq: 246.94 },
    { name: "G3", freq: 196.00 },
    { name: "D3", freq: 146.83 },
    { name: "A2", freq: 110.00 },
    { name: "E2", freq: 82.41 },
];

export default function TunerWidget() {
    const [isOn, setIsOn] = useState(false);
    const [freq, setFreq] = useState(null);
    const [note, setNote] = useState("--");
    const [target, setTarget] = useState({ name: "--", cents: 0 });
    const analyserRef = useRef(null);
    const streamRef = useRef(null);
    const rafRef = useRef(null);

    useEffect(() => {
        if (!isOn) {
            stopAudio();
            return;
        }
        startAudio().catch(console.error);
        return () => {
            stopAudio();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOn]);

    async function startAudio() {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const ctx = new (window.AudioContext || window.webkitAudioContext)();
        const src = ctx.createMediaStreamSource(stream);
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 2048;
        src.connect(analyser);
        analyserRef.current = { analyser, ctx };
        streamRef.current = stream;
        tick();
    }

    function stopAudio() {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        analyserRef.current = null;
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(t => t.stop());
            streamRef.current = null;
        }
    }

    function autoCorrelate(buf, sampleRate) {
        let SIZE = buf.length;
        let rms = 0;
        for (let i = 0; i < SIZE; i++) rms += buf[i] * buf[i];
        rms = Math.sqrt(rms / SIZE);
        if (rms < 0.01) return -1;
        let r1 = 0, r2 = SIZE - 1, th = 0.2;
        for (let i = 0; i < SIZE / 2; i++) if (Math.abs(buf[i]) < th) { r1 = i; break; }
        for (let i = 1; i < SIZE / 2; i++) if (Math.abs(buf[SIZE - i]) < th) { r2 = SIZE - i; break; }
        buf = buf.slice(r1, r2);
        SIZE = buf.length;
        const c = new Array(SIZE).fill(0);
        for (let i = 0; i < SIZE; i++) for (let j = 0; j < SIZE - i; j++) c[i] += buf[j] * buf[j + i];
        let d = 0; while (c[d] > c[d + 1]) d++;
        let maxval = -1, maxpos = -1;
        for (let i = d; i < SIZE; i++) {
            if (c[i] > maxval) { maxval = c[i]; maxpos = i; }
        }
        const T0 = maxpos;
        return sampleRate / T0;
    }

    function freqToNote(f) {
        const A4 = 440;
        const n = Math.round(12 * Math.log2(f / A4)) + 69;
        const names = ["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];
        const name = names[n % 12];
        const oct = Math.floor(n / 12) - 1;
        return `${name}${oct}`;
    }

    function nearestGuitarString(f) {
        let best = GUITAR_STRINGS[0];
        let minErr = Math.abs(f - best.freq);
        for (let s of GUITAR_STRINGS) {
            const err = Math.abs(f - s.freq);
            if (err < minErr) { minErr = err; best = s; }
        }
        // cents = 1200 * log2(f/ftarget)
        const cents = Math.round(1200 * Math.log2(f / best.freq));
        return { name: best.name, cents };
    }

    function tick() {
        rafRef.current = requestAnimationFrame(tick);
        if (!analyserRef.current) return;
        const { analyser, ctx } = analyserRef.current;
        const buf = new Float32Array(analyser.fftSize);
        analyser.getFloatTimeDomainData(buf);
        const f = autoCorrelate(buf, ctx.sampleRate);
        if (f > 0) {
            setFreq(f.toFixed(1));
            setNote(freqToNote(f));
            setTarget(nearestGuitarString(f));
        }
    }

    return (
        <div style={{background:"#0f172a",color:"#e2e8f0",padding:"0.6rem 0.8rem",borderRadius:"0.75rem"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8}}>
                <div style={{fontSize:"0.6rem",textTransform:"uppercase",opacity:.7}}>Guitar Tuner</div>
                <button
                    onClick={()=>setIsOn(v=>!v)}
                    style={{fontSize:12,background:isOn?"#16a34a":"#334155",color:"#e2e8f0",border:"1px solid rgba(148,163,184,.3)",borderRadius:8,padding:"2px 8px",cursor:"pointer"}}
                >
                    {isOn ? "On" : "Off"}
                </button>
            </div>
            <div style={{display:"flex",alignItems:"baseline",gap:10}}>
                <div style={{fontSize:"1.4rem",fontWeight:700,minWidth:64}}>{note}</div>
                <div style={{fontSize:"0.8rem",opacity:.9}}>{freq ? `${freq} Hz` : (isOn ? "listening..." : "off")}</div>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8,marginTop:6}}>
                <span style={{fontSize:12,opacity:.8}}>Target</span>
                <span style={{fontWeight:700}}>{target.name}</span>
                <span style={{fontSize:12,opacity:.8}}>Offset</span>
                <span style={{fontWeight:700,color: target.cents===0 ? "#a7f3d0" : (target.cents>0?"#fca5a5":"#93c5fd")}}>{target.cents>0?`+${target.cents}`:target.cents}¢</span>
            </div>
            <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
                {GUITAR_STRINGS.slice().reverse().map(s=>(
                    <div key={s.name} style={{fontSize:12,opacity:.9,background:"rgba(148,163,184,.15)",border:"1px solid rgba(148,163,184,.3)",padding:"2px 6px",borderRadius:999}}>{s.name}</div>
                ))}
            </div>
        </div>
    );
}
