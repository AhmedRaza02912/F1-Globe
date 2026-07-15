import Info from "./Info";

export default function CircuitInfoPanel({ circuit }) {
    return (
        <div
            className="
                w-96
                bg-zinc-900
                text-white
                border-l
                border-zinc-700
                p-8
                overflow-y-auto
            "
        >
            {!circuit ? (
                <div className="h-full flex items-center justify-center">
                    <p className="text-zinc-400">
                        Select a circuit
                    </p>
                </div>
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-red-500">
                        {circuit.raceName}
                    </h1>

                    <h2 className="mt-2 text-xl">
                        {circuit.circuitName}
                    </h2>

                    <div className="mt-8 space-y-3">

                        <Info title="Country" value={circuit.country} />

                        <Info title="City" value={circuit.locality} />

                        <Info title="Round" value={circuit.round} />

                        <Info
                            title="Date"
                            value={
                                circuit.date
                                    ? new Date(circuit.date).toLocaleDateString()
                                    : "-"
                            }
                        />

                        <Info title="Laps" value={circuit.laps} />

                        <Info
                            title="Length"
                            value={`${circuit.lengthKm} km`}
                        />

                        <Info
                            title="Race Distance"
                            value={`${circuit.raceDistanceKm} km`}
                        />

                        <Info
                            title="First Grand Prix"
                            value={circuit.firstGrandPrix}
                        />

                    </div>
                </>
            )}
        </div>
    );
}