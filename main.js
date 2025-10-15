import * as THREE from 'three';
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js';
import { materialRotation } from 'three/tsl';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 2);
light.position.set(1, 1, 1);
scene.add(light);
scene.add(new THREE.AmbientLight(0x404040, 0.5));

// Add ground
const groundGeometry = new THREE.PlaneGeometry(20, 20);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -1;
scene.add(ground);

const loader = new FBXLoader();
let car;

loader.load('2024-ford-shelby-super-snake-s650(1)/source/FNIAL_MODEL_24/FNIAL_MODEL_24.fbx', function (fbx) {
    console.log('Model loaded:', fbx);
    fbx.scale.setScalar(0.8);
    fbx.position.set(0, 0, 0);
    car = fbx;
    scene.add(fbx);
}, undefined, function (error) {
    console.error('Loading error:', error);
});

camera.position.set(0, 2, 5);
camera.lookAt(0, 0, 0);

function animate() {
    if (car) {
        car.rotation.y += 0.01;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}
animate();
