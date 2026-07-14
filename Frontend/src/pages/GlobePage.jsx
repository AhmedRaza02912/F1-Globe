import { useState } from "react";
import GlobeScene from "../components/globe/GlobeScene";
import CircuitInfoPanel from "../components/panels/CircuitInfoPanel";

export default function GlobePage() {

    const [selectedCircuit, setSelectedCircuit] = useState(null);

    return (
        <div className="flex h-screen bg-black">

            <div className="flex-1">
                <GlobeScene
                    onSelect={setSelectedCircuit}
                    selectedCircuit={selectedCircuit}
                />
            </div>

            <CircuitInfoPanel
                circuit={selectedCircuit}
            />

        </div>
    );
}