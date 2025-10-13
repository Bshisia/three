import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
// Keep a reference to the #info element so we can animate it.
let infoEl = document.getElementById('info');
// Insert the canvas before the #info overlay so the overlay remains on top
if (infoEl) {
    document.body.insertBefore(renderer.domElement, infoEl);
} else {
    document.body.appendChild(renderer.domElement);
    // try to grab it again in case it was added later
    infoEl = document.getElementById('info');
}

const geometry = new THREE.BoxGeometry(1, 1, 1);
const materials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    new THREE.MeshBasicMaterial({ color: 0xff00ff }),
    new THREE.MeshBasicMaterial({ color: 0x00ffff }),
];
const cube = new THREE.Mesh(geometry, materials);
scene.add(cube);
camera.position.z = 5;

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
        // animate the overlay text: gentle bob + subtle opacity pulse
        if (infoEl) {
            const t = performance.now() / 1000; // seconds
            const y = Math.sin(t * 2.0) * 8; // pixels
            const pulse = 0.8 + 0.2 * Math.sin(t * 3.0);
            infoEl.style.transform = `translateY(${y}px)`;
            infoEl.style.opacity = String(pulse);
        }
        renderer.render(scene, camera);
}
renderer.setAnimationLoop(animate)