import { useState } from "react";
import GlobeScene from "../components/globe/GlobeScene";
import CircuitInfoPanel from "../components/panels/CircuitInfoPanel";
import TrackPathPanel from "../components/panels/TrackPathPanel";
import { useCircuits } from "../hooks/useCircuits";

export default function GlobePage() {
    const { circuits, loading } = useCircuits();
    const [selectedCircuit, setSelectedCircuit] = useState(null);
    const [trackPathActive, setTrackPathActive] = useState(false);

    function toggleTrackPath() {
        setTrackPathActive((v) => !v);
    }

    return (
        <div className="flex h-screen bg-black overflow-hidden">

            {/* Globe canvas */}
            <div className="flex-1 relative">
                <GlobeScene
                    circuits={circuits}
                    onSelect={setSelectedCircuit}
                    selectedCircuit={selectedCircuit}
                    trackPathActive={trackPathActive}
                />

                {/* ── Track Path toggle button ── */}
                <div className="absolute top-5 left-5 z-10">
                    <button
                        id="track-path-toggle"
                        onClick={toggleTrackPath}
                        disabled={loading || circuits.length === 0}
                        aria-pressed={trackPathActive}
                        style={{
                            /* Smooth background transition between states */
                            background: trackPathActive
                                ? "rgba(225, 6, 0, 0.18)"
                                : "rgba(24, 24, 27, 0.82)",
                            border: trackPathActive
                                ? "1px solid rgba(225, 6, 0, 0.65)"
                                : "1px solid rgba(63, 63, 70, 0.8)",
                            boxShadow: trackPathActive
                                ? "0 0 18px rgba(225,6,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)"
                                : "0 2px 8px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)",
                            backdropFilter: "blur(12px)",
                            WebkitBackdropFilter: "blur(12px)",
                            transition:
                                "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease, opacity 0.2s ease",
                        }}
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-full cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        {/* Flag icon */}
                        <svg
                            width="15"
                            height="15"
                            viewBox="0 0 15 15"
                            fill="none"
                            style={{
                                color: trackPathActive ? "#e10600" : "#a1a1aa",
                                transition: "color 0.3s ease",
                            }}
                        >
                            <path
                                d="M2 1.5v12M2 2.5l11 3-11 3"
                                stroke="currentColor"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>

                        <span
                            className="text-sm font-semibold tracking-wide select-none"
                            style={{
                                color: trackPathActive ? "#ff4444" : "#e4e4e7",
                                transition: "color 0.3s ease",
                            }}
                        >
                            Track Path
                        </span>

                        {/* Active indicator dot */}
                        <span
                            style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                backgroundColor: "#e10600",
                                boxShadow: "0 0 6px #e10600",
                                opacity: trackPathActive ? 1 : 0,
                                transform: trackPathActive ? "scale(1)" : "scale(0)",
                                transition: "opacity 0.25s ease, transform 0.25s ease",
                            }}
                        />
                    </button>
                </div>
            </div>

            {/* ── Sliding panel container ──
                Both panels live inside a fixed-width slot. CSS transforms slide
                each one in/out so the panel column never changes width, keeping
                the globe layout stable. */}
            <div
                className="relative flex-shrink-0 border-l border-zinc-700"
                style={{ width: 384 }} /* matches w-96 = 24rem = 384px */
            >
                {/* CircuitInfoPanel — slides to the right when Track Path is active */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        transform: trackPathActive ? "translateX(100%)" : "translateX(0)",
                        transition: "transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)",
                        willChange: "transform",
                        overflow: "hidden",
                    }}
                >
                    <CircuitInfoPanel circuit={selectedCircuit} />
                </div>

                {/* TrackPathPanel — slides in from the right when Track Path is active */}
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        transform: trackPathActive ? "translateX(0)" : "translateX(100%)",
                        transition: "transform 0.42s cubic-bezier(0.4, 0, 0.2, 1)",
                        willChange: "transform",
                        overflow: "hidden",
                    }}
                >
                    <TrackPathPanel
                        circuits={circuits}
                        onClose={() => setTrackPathActive(false)}
                    />
                </div>
            </div>

        </div>
    );
}