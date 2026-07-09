import {useEffect, useState} from "react";
import { getActiveCircuits } from "../service/f1service";

export function useCircuits(season = 2026){
    const [circuits, setCircuits] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load(){
                try {
            const data = await getActiveCircuits(season);
            setCircuits(data);
        }
        finally{
            setLoading(false);
        }
    }
    load();
        }, [season]);
        return{
            circuits, loading
        };
}