export default function CircuitInfo({ circuit }) {

    if(!circuit){
        return(
            <div className="h-full bg-zinc-900 text-white flex items-center justify-center">
                <p>Select a circuit</p>
            </div>
        );
    }

    return(
        <div className="h-full bg-zinc-900 text-white p-8">
            <h1>
                {circuit.raceName}
            </h1>
            <h2 className="text-xl mt2">
                {circuit.circuitName}
            </h2>
            <div className="mt-10 space-y-4">
                <InfoRow label="Country" value={circuit.country} />
                <InfoRow label="City" value={circuit.locality} />
                <InfoRow label="Laps" value={circuit.laps} />
                <InfoRow label="Circuit Length" value={`${circuit.country} km`}/>
                <InfoRow label="Race Distance" value={`${circuit.country} km`}/>
                <InfoRow label="First Grand Prix" value={circuit.firstGrandPrix} />
            </div>
        </div>
    );
}