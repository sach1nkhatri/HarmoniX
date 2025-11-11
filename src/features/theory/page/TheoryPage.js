import React from "react";
import "../css/theory.css";

export default function TheoryPage() {
    return (
        <div className="theory-page">
            <div className="theory-hero">
                <h1>Music Theory Guide</h1>
                <p className="theory-subtitle">Master the fundamentals of guitar music theory</p>
            </div>

            <div className="theory-content">
                <section className="theory-section">
                    <h2>Intervals</h2>
                    <p className="theory-desc">Intervals are the building blocks of scales and chords. They measure the distance between two notes.</p>
                    <div className="theory-grid">
                        <div className="theory-card">
                            <h3>Perfect Intervals</h3>
                            <ul className="theory-list">
                                <li><strong>Unison (P1):</strong> 0 semitones - Same note</li>
                                <li><strong>Perfect 4th (P4):</strong> 5 semitones - Stable, consonant</li>
                                <li><strong>Perfect 5th (P5):</strong> 7 semitones - Very stable, power chord</li>
                                <li><strong>Octave (P8):</strong> 12 semitones - Same note, different pitch</li>
                            </ul>
                        </div>
                        <div className="theory-card">
                            <h3>Major/Minor Intervals</h3>
                            <ul className="theory-list">
                                <li><strong>Major 2nd (M2):</strong> 2 semitones</li>
                                <li><strong>Major 3rd (M3):</strong> 4 semitones - Major chord quality</li>
                                <li><strong>Major 6th (M6):</strong> 9 semitones</li>
                                <li><strong>Major 7th (M7):</strong> 11 semitones</li>
                                <li><strong>Minor 2nd (m2):</strong> 1 semitone</li>
                                <li><strong>Minor 3rd (m3):</strong> 3 semitones - Minor chord quality</li>
                                <li><strong>Minor 6th (m6):</strong> 8 semitones</li>
                                <li><strong>Minor 7th (m7):</strong> 10 semitones</li>
                            </ul>
                        </div>
                        <div className="theory-card">
                            <h3>Altered Intervals</h3>
                            <ul className="theory-list">
                                <li><strong>Tritone (TT/b5):</strong> 6 semitones - The "devil's interval"</li>
                                <li><strong>Augmented 4th (+4):</strong> 6 semitones</li>
                                <li><strong>Diminished 5th (b5):</strong> 6 semitones</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="theory-section">
                    <h2>Scales</h2>
                    <p className="theory-desc">Scales are sequences of notes that create the foundation for melodies and harmonies.</p>
                    <div className="theory-grid">
                        <div className="theory-card">
                            <h3>Major Scale</h3>
                            <p><strong>Formula:</strong> 1 2 3 4 5 6 7</p>
                            <p><strong>Example (C Major):</strong> C D E F G A B</p>
                            <p>Bright, happy sound. Foundation of Western music.</p>
                        </div>
                        <div className="theory-card">
                            <h3>Natural Minor Scale</h3>
                            <p><strong>Formula:</strong> 1 2 b3 4 5 b6 b7</p>
                            <p><strong>Example (A Minor):</strong> A B C D E F G</p>
                            <p>Dark, melancholic sound. Relative minor of C Major.</p>
                        </div>
                        <div className="theory-card">
                            <h3>Pentatonic Scales</h3>
                            <p><strong>Major Pentatonic:</strong> 1 2 3 5 6</p>
                            <p><strong>Minor Pentatonic:</strong> 1 b3 4 5 b7</p>
                            <p>Five-note scales used in rock, blues, and folk music.</p>
                        </div>
                        <div className="theory-card">
                            <h3>Blues Scale</h3>
                            <p><strong>Formula:</strong> 1 b3 4 b5 5 b7</p>
                            <p>Minor pentatonic with added b5 (blue note). Essential for blues and rock.</p>
                        </div>
                        <div className="theory-card">
                            <h3>Dorian Mode</h3>
                            <p><strong>Formula:</strong> 1 2 b3 4 5 6 b7</p>
                            <p>Minor mode with raised 6th. Used in jazz and rock.</p>
                        </div>
                        <div className="theory-card">
                            <h3>Mixolydian Mode</h3>
                            <p><strong>Formula:</strong> 1 2 3 4 5 6 b7</p>
                            <p>Major mode with lowered 7th. Dominant sound, common in rock.</p>
                        </div>
                    </div>
                </section>

                <section className="theory-section">
                    <h2>Chord Construction</h2>
                    <p className="theory-desc">Chords are built by stacking intervals. Understanding chord construction helps with improvisation and composition.</p>
                    <div className="theory-grid">
                        <div className="theory-card">
                            <h3>Triads</h3>
                            <ul className="theory-list">
                                <li><strong>Major:</strong> 1 3 5 (C E G)</li>
                                <li><strong>Minor:</strong> 1 b3 5 (C Eb G)</li>
                                <li><strong>Diminished:</strong> 1 b3 b5 (C Eb Gb)</li>
                                <li><strong>Augmented:</strong> 1 3 #5 (C E G#)</li>
                            </ul>
                        </div>
                        <div className="theory-card">
                            <h3>Seventh Chords</h3>
                            <ul className="theory-list">
                                <li><strong>Major 7th:</strong> 1 3 5 7 (C E G B)</li>
                                <li><strong>Minor 7th:</strong> 1 b3 5 b7 (C Eb G Bb)</li>
                                <li><strong>Dominant 7th:</strong> 1 3 5 b7 (C E G Bb)</li>
                                <li><strong>Diminished 7th:</strong> 1 b3 b5 bb7 (C Eb Gb A)</li>
                            </ul>
                        </div>
                        <div className="theory-card">
                            <h3>Extended Chords</h3>
                            <ul className="theory-list">
                                <li><strong>9th:</strong> Add 9th (2nd) to 7th chord</li>
                                <li><strong>11th:</strong> Add 11th (4th) to 9th chord</li>
                                <li><strong>13th:</strong> Add 13th (6th) to 11th chord</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="theory-section">
                    <h2>Diatonic Harmony</h2>
                    <p className="theory-desc">In any major key, chords follow a predictable pattern based on the scale degrees.</p>
                    <div className="theory-card theory-card-wide">
                        <h3>Major Key Chord Progression</h3>
                        <div className="chord-progression">
                            <div className="chord-item">
                                <div className="chord-roman">I</div>
                                <div className="chord-name">Major</div>
                                <div className="chord-example">C maj7</div>
                            </div>
                            <div className="chord-item">
                                <div className="chord-roman">ii</div>
                                <div className="chord-name">Minor</div>
                                <div className="chord-example">D m7</div>
                            </div>
                            <div className="chord-item">
                                <div className="chord-roman">iii</div>
                                <div className="chord-name">Minor</div>
                                <div className="chord-example">E m7</div>
                            </div>
                            <div className="chord-item">
                                <div className="chord-roman">IV</div>
                                <div className="chord-name">Major</div>
                                <div className="chord-example">F maj7</div>
                            </div>
                            <div className="chord-item">
                                <div className="chord-roman">V</div>
                                <div className="chord-name">Dominant</div>
                                <div className="chord-example">G 7</div>
                            </div>
                            <div className="chord-item">
                                <div className="chord-roman">vi</div>
                                <div className="chord-name">Minor</div>
                                <div className="chord-example">A m7</div>
                            </div>
                            <div className="chord-item">
                                <div className="chord-roman">vii°</div>
                                <div className="chord-name">Diminished</div>
                                <div className="chord-example">B m7b5</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="theory-section">
                    <h2>Modes</h2>
                    <p className="theory-desc">Modes are variations of the major scale, each with a unique character and sound.</p>
                    <div className="theory-grid">
                        <div className="theory-card">
                            <h3>Ionian (Major)</h3>
                            <p><strong>Formula:</strong> 1 2 3 4 5 6 7</p>
                            <p>Bright, happy, stable. The default major scale.</p>
                        </div>
                        <div className="theory-card">
                            <h3>Dorian</h3>
                            <p><strong>Formula:</strong> 1 2 b3 4 5 6 b7</p>
                            <p>Minor with raised 6th. Smooth, jazzy feel.</p>
                        </div>
                        <div className="theory-card">
                            <h3>Phrygian</h3>
                            <p><strong>Formula:</strong> 1 b2 b3 4 5 b6 b7</p>
                            <p>Dark, Spanish, exotic sound.</p>
                        </div>
                        <div className="theory-card">
                            <h3>Lydian</h3>
                            <p><strong>Formula:</strong> 1 2 3 #4 5 6 7</p>
                            <p>Major with raised 4th. Dreamy, floating quality.</p>
                        </div>
                        <div className="theory-card">
                            <h3>Mixolydian</h3>
                            <p><strong>Formula:</strong> 1 2 3 4 5 6 b7</p>
                            <p>Major with lowered 7th. Bluesy, rock sound.</p>
                        </div>
                        <div className="theory-card">
                            <h3>Aeolian (Natural Minor)</h3>
                            <p><strong>Formula:</strong> 1 2 b3 4 5 b6 b7</p>
                            <p>Dark, melancholic. The default minor scale.</p>
                        </div>
                        <div className="theory-card">
                            <h3>Locrian</h3>
                            <p><strong>Formula:</strong> 1 b2 b3 4 b5 b6 b7</p>
                            <p>Unstable, dissonant. Rarely used in practice.</p>
                        </div>
                    </div>
                </section>

                <section className="theory-section">
                    <h2>Practice Tips</h2>
                    <div className="theory-card theory-card-wide">
                        <ul className="theory-list">
                            <li><strong>Start Slow:</strong> Master scales and chords at slow tempos before increasing speed.</li>
                            <li><strong>Use a Metronome:</strong> Develop solid timing and rhythm from the beginning.</li>
                            <li><strong>Learn Intervals:</strong> Understanding intervals helps you navigate the fretboard.</li>
                            <li><strong>Practice Positions:</strong> Learn scales in multiple positions across the neck.</li>
                            <li><strong>Use CAGED:</strong> The CAGED system helps visualize chord shapes across the fretboard.</li>
                            <li><strong>Target Chord Tones:</strong> When soloing, target the 3rd and 7th of each chord.</li>
                            <li><strong>Ear Training:</strong> Practice identifying intervals and chord qualities by ear.</li>
                            <li><strong>Apply Theory:</strong> Don't just memorize—understand how theory applies to songs you play.</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
}

