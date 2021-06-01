var scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const windowSize = 5;
// scene.background = new THREE.Color(0xdddddd);

// var cam = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight);

let cam = new THREE.OrthographicCamera(
    -windowSize * aspect,
    windowSize * aspect, 
    windowSize,
    -windowSize,
    -100,
    1000
);

var renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);

hlight = new THREE.AmbientLight(0x404040,100);
scene.add(hlight);

directionalLight = new THREE.DirectionalLight(0xffffff,100);
directionalLight.position.set(0,1,0);
directionalLight.castShadow = true;
scene.add(directionalLight);

var controls = new THREE.OrbitControls(cam,renderer.domElement);
controls.update();

let loader = new THREE.GLTFLoader();
loader.load("models/scene.gltf",function(gltf){
    scene.add(gltf.scene);
    renderer.render(scene,cam);
});

let grid = new THREE.GridHelper(100, 20, 0xfafafa, 0xfafafa);
grid.position.y = -1;
scene.add(grid);

cam.position.set(3, 3, 7);

window.addEventListener('resize', function() {
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    cam.aspect = width / height;
    cam.updateProjectionMatrix();
})

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene,cam);
}
animate()
