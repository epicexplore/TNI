'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';

export function CameraRig() {
    const scroll = useScroll();
    const { camera } = useThree();
    const vec = new THREE.Vector3();
    const lookAtVec = new THREE.Vector3();

    // Define the Cinematic Path
    // Waypoints correspond to the 8 sections
    const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 0, 5),    // 0. Hero (Start)
        new THREE.Vector3(0, 0.5, 0),  // Transition
        new THREE.Vector3(0, 1, -8),   // 1. Belief (Looking at Orb -10)
        new THREE.Vector3(-1, 2, -18), // 2. Problem (Looking at Noise -20)
        new THREE.Vector3(0, 0, -30),  // 3. Method (Process)
        new THREE.Vector3(1, -1, -38), // 4. Work (Looking at Orb -40)
        new THREE.Vector3(-1, 1, -48), // 5. Voice (Looking at Orb -50)
        new THREE.Vector3(0, 0, -65)   // 6. Legacy/Invitation (End)
    ]);

    // Smooth the curve
    curve.curveType = 'catmullrom';
    curve.tension = 0.5;

    useFrame((state, delta) => {
        // Get point on curve based on scroll offset (0 to 1)
        // We use a slight dampening for smoothness
        const t = scroll.offset; // ScrollControls handles dampening via 'damping' prop

        curve.getPoint(t, vec);

        // Add slight mouse parallax
        vec.x += (state.pointer.x * 0.5);
        vec.y += (state.pointer.y * 0.5);

        // Move camera
        // camera.position.lerp(vec, delta * 2); // Lerp can lag behind scroll too much if damping is already on scroll
        camera.position.copy(vec);

        // Look slightly ahead on the curve
        const lookAtT = Math.min(t + 0.1, 1);
        curve.getPoint(lookAtT, lookAtVec);

        // Smooth lookAt
        // camera.lookAt(lookAtVec); 
        // Or manual quaternion slerp for ultra smooth, but lookAt is okay for now
        camera.lookAt(lookAtVec.x, lookAtVec.y, lookAtVec.z - 5); // Look forward
    });

    return null;
}
