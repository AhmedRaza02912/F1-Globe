import * as THREE from "three";

export function latLngToVector3(lat, lng, radius = 1.02) {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = (lng + 180) * Math.PI / 180;

    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const y =  radius * Math.cos(phi);
    const z =  radius * Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
}

// Great-circle distance in km between two lat/lng pairs (Haversine formula)
export function haversineDistance(lat1, lng1, lat2, lng2) {
    const R = 6371;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLng = toRad(lng2 - lng1);
    const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

// Returns `segments+1` Vector3 points tracing a great-circle arc between two
// globe-surface vectors, lifted above the surface by a sin(πt) envelope so the
// arc visually clears the Earth's curvature.
export function getGreatCirclePoints(v1, v2, segments = 80) {
    const points = [];
    const ARC_HEIGHT = 0.12; // max lift above surface (in globe-radius units)
    const SURFACE_RADIUS = 1.05;
    for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const p = v1
            .clone()
            .lerp(v2, t)
            .normalize()
            .multiplyScalar(SURFACE_RADIUS + Math.sin(Math.PI * t) * ARC_HEIGHT);
        points.push(p);
    }
    return points;
}