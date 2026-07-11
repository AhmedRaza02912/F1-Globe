export default function CircuitInfo({ circuit }) {

    if (!circuit) return null;

    return (
        <div
            className="
                absolute
                top-8
                right-8
                w-80
                bg-zinc-900/90
                backdrop-blur-md
                rounded-xl
                p-6
                text-white
                shadow-2xl
                border
                border-red-600
            "
        >
            <h2 className="text-2xl font-bold text-red-500">
                {circuit.raceName}
            </h2>

            <div className="mt-4 space-y-2">

                <p>
                    <strong>Circuit:</strong> {circuit.circuitName}
                </p>

                <p>
                    <strong>Country:</strong> {circuit.country}
                </p>

                <p>
                    <strong>City:</strong> {circuit.locality}
                </p>

                <p>
                    <strong>Round:</strong> {circuit.round}
                </p>

                <p>
                    <strong>Date:</strong> {circuit.date}
                </p>

            </div>
        </div>
    );
}