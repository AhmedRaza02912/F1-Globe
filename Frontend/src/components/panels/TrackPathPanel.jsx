import { useMemo } from "react";
import { haversineDistance } from "../../utils/globeUtils";

export default function TrackPathPanel({ circuits, onClose }) {
    // Sort by race round to get chronological journey order
    const sorted = useMemo(
        () => [...circuits].sort((a, b) => a.round - b.round),
        [circuits]
    );

    // Calculate per-leg and total distances
    const legs = useMemo(() => {
        return sorted.slice(0, -1).map((c1, i) => {
            const c2 = sorted[i + 1];
            const dist = haversineDistance(
                parseFloat(c1.lat), parseFloat(c1.long),
                parseFloat(c2.lat), parseFloat(c2.long)
            );
            return { from: c1, to: c2, distKm: Math.round(dist) };
        });
    }, [sorted]);

    const totalKm = useMemo(
        () => legs.reduce((sum, leg) => sum + leg.distKm, 0),
        [legs]
    );

    const earthCircumference = 40075;
    const globeWraps = (totalKm / earthCircumference).toFixed(2);

    return (
        <div className="w-full h-full bg-zinc-900 text-white flex flex-col overflow-hidden">

            {/* Header */}
            <div className="px-7 pt-7 pb-5 border-b border-zinc-700/60 flex-shrink-0">
                <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2.5">
                        <span
                            className="inline-block w-2.5 h-2.5 rounded-full bg-red-600"
                            style={{ boxShadow: "0 0 8px 2px #e10600aa" }}
                        />
                        <span className="text-xs font-semibold tracking-[0.2em] text-zinc-400 uppercase">
                            Track Path
                        </span>
                    </div>
                    <button
                        onClick={onClose}
                        aria-label="Close Track Path"
                        className="text-zinc-500 hover:text-white transition-colors duration-150 p-1 rounded-md hover:bg-zinc-700/50"
                    >
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path
                                d="M3 3L13 13M13 3L3 13"
                                stroke="currentColor"
                                strokeWidth="1.8"
                                strokeLinecap="round"
                            />
                        </svg>
                    </button>
                </div>

                <h1 className="text-2xl font-bold mt-3 leading-tight">
                    Season Journey
                </h1>
                <p className="text-zinc-400 text-sm mt-1">
                    {sorted.length} circuits · {legs.length} legs
                </p>

                {/* Total distance hero stat */}
                <div
                    className="mt-5 rounded-xl px-5 py-4"
                    style={{
                        background:
                            "linear-gradient(135deg, rgba(225,6,0,0.15) 0%, rgba(225,6,0,0.05) 100%)",
                        border: "1px solid rgba(225,6,0,0.25)",
                    }}
                >
                    <p className="text-xs tracking-widest text-zinc-400 uppercase mb-1">
                        Total Travel Distance
                    </p>
                    <p className="text-3xl font-bold text-red-500 tabular-nums">
                        {totalKm.toLocaleString()}
                        <span className="text-base font-normal text-zinc-400 ml-1.5">km</span>
                    </p>
                    <p className="text-xs text-zinc-500 mt-1.5">
                        ≈ {globeWraps}× around the Earth
                    </p>
                </div>
            </div>

            {/* Per-leg table */}
            <div className="flex-1 overflow-y-auto px-7 py-4 space-y-0">
                <p className="text-xs tracking-widest text-zinc-500 uppercase mb-3">
                    Leg Breakdown
                </p>
                {legs.map((leg, i) => (
                    <div
                        key={i}
                        className="py-3 border-b border-zinc-800 hover:bg-zinc-800/30 -mx-2 px-2 rounded-md transition-colors duration-100 group"
                    >
                        <div className="flex items-center justify-between">
                            {/* Round badge + circuit name */}
                            <div className="flex items-center gap-2.5 min-w-0">
                                <span
                                    className="flex-shrink-0 w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-[10px] font-bold text-zinc-400 group-hover:border-red-700 group-hover:text-red-400 transition-colors"
                                >
                                    {leg.from.round}
                                </span>
                                <div className="min-w-0">
                                    <p className="text-xs font-medium text-white truncate leading-tight">
                                        {leg.from.raceName ?? leg.from.circuitName}
                                    </p>
                                    <p className="text-[10px] text-zinc-500 truncate leading-tight mt-0.5">
                                        → {leg.to.raceName ?? leg.to.circuitName}
                                    </p>
                                </div>
                            </div>

                            {/* Distance */}
                            <span className="flex-shrink-0 text-sm font-semibold tabular-nums text-zinc-300 group-hover:text-red-400 transition-colors ml-3">
                                {leg.distKm.toLocaleString()}&thinsp;km
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
