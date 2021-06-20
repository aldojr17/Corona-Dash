// Deklarasi Variable
var scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
var cam = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  1,
  100
);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const alert = document.getElementById("modal");
const btnRestart = document.getElementById("btnRestart");
const highScore = document.getElementById("highScore");
const score = document.getElementById("score");
const loader = new THREE.GLTFLoader();
var randomPos = [10, 0, -10];
var virus = new THREE.Object3D();
var virus2 = new THREE.Object3D();
var person = new THREE.Object3D();
var mixer = new THREE.AnimationMixer(person);

const clock = new THREE.Clock();
var speed = 0;
let i = 0;

// Set Up Posisi Kamera
cam.position.z = 35;
cam.position.y = 10;

// Variable High Score Dari Game Sebelumnya
localStorage.getItem("highScore") == null
  ? (highScore.innerHTML = "0")
  : (highScore.innerHTML = localStorage.getItem("highScore"));

// Reload Page Ketika Button Restart Ditekan
btnRestart.addEventListener("click", (ev) => {
  window.location.reload();
});

// hlight = new THREE.AmbientLight(0x404040,100);
// scene.add(hlight);

// let spotLight = new THREE.SpotLight(0x404040);
// spotLight.position.set(0,20,-50);
// scene.add(spotLight);

// let directionalLight = new THREE.DirectionalLight(0xcccccc,100);
// directionalLight.position.set(0,0,-10);
// let helper = new THREE.DirectionalLightHelper(directionalLight, 5);
// // directionalLight.castShadow = true;
// scene.add(directionalLight);
// scene.add(helper);

// Load Model Virus 1
loader.load("model_virus/scene.gltf", function (gltf) {
  scene.add(gltf.scene);
  virus = gltf.scene;
  virus.scale.set(0.5, 0.5, 0.5);
  virus.position.set(
    randomPos[Math.floor(Math.random() * randomPos.length)],
    0,
    -10
  );
});

// Load Model Virus 2
loader.load("model_virus/scene.gltf", function (gltf) {
  scene.add(gltf.scene);
  virus2 = gltf.scene;
  virus2.scale.set(0.5, 0.5, 0.5);
  virus2.position.set(
    randomPos[Math.floor(Math.random() * randomPos.length)],
    0,
    -10
  );
});

// Load Model Person
loader.load("model_person/scene.gltf", function (gltf) {
  person = gltf.scene;
  person.scale.set(0.1, 0.1, 0.1);
  person.position.set(0, 0, 20);
  person.rotation.y = 9.5;
  scene.add(person);
  mixer = new THREE.AnimationMixer(gltf.scene);
  var action = mixer.clipAction(gltf.animations[0]);
  action.play();
});

//light untuk Model
let light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
scene.add(light);

let grid = new THREE.GridHelper(100, 10, 0xfafafa, 0xfafafa);
grid.position.y = -1;
scene.add(grid);

// const plane = new THREE.PlaneGeometry(50,100);
// const grass_texture = new THREE.TextureLoader().load('../skybox/texture.jpg');
// const mat_rumput = new THREE.MeshBasicMaterial({
//     map:grass_texture, 
//     side: THREE.DoubleSide
// });
// let mesh_plane = new THREE.Mesh(plane,mat_rumput);
// mesh_plane.position.set(0,0,-10);
// scene.add(mesh_plane);
// mesh_plane.rotation.x-=Math.PI/2;

let controls = new THREE.OrbitControls(cam, renderer.domElement);
controls.update();
controls.enabled = false;

// let loader3 = new THREE.CubeTextureLoader();
// let skybox = loader3.load([
//   "skybox/px.png",
//   "skybox/nx.png",
//   "skybox/py.png",
//   "skybox/ny.png",
//   "skybox/pz.png",
//   "skybox/nz.png",
// ]);
// scene.background = skybox;

// Resize Window Function
window.addEventListener("resize", function () {
  let width = window.innerWidth;
  let height = window.innerHeight;
  renderer.setSize(width, height);
  cam.aspect = width / height;
  cam.updateProjectionMatrix();
});

// Move Left, Right, And Jump
document.body.onkeypress = function (evt) {
  if (evt.key == "a") {
    person.position.x != -10
      ? (person.position.x -= 10)
      : (person.position.x = -10);
  } else if (evt.key == "d") {
    person.position.x != 10
      ? (person.position.x += 10)
      : (person.position.x = 10);
  } else if (evt.key == " ") {
    person.position.y == 0
      ? (person.position.y = 7)
      : (person.position.y = 0);
  }
};

// let starGeo, stars;
// function backgroundAnimate() {
//   starGeo = new THREE.Geometry();
//   for(let i=0;i<6000;i++) {
//     star = new THREE.Vector3(
//       Math.random() * 600 - 300,
//       Math.random() * 600 - 300,
//       Math.random() * 600 - 300
//     );
//     star.velocity = 0;
//     star.acceleration = 0.02;
//     starGeo.vertices.push(star);
//   }
//   let sprite = new THREE.TextureLoader().load('/skybox/stars.jpg');
//   let starMaterial = new THREE.PointsMaterial({
//     color: 0xaaaaaa,
//     size: 0.7,
//     map: sprite
//   });

//   stars = new THREE.Points(starGeo, starMaterial);
//   scene.add(stars);
//   animate();
// }

// Fungsi untuk check jika menabrak virus
function checkCollision(virus, person) {
  return (
    Math.round(virus.position.z) == 19 &&
    person.position.x == virus.position.x &&
    person.position.y == virus.position.y
  );
}

function animate() {
  // starGeo.vertices.forEach(p=>{
  //   p.velocity += p.acceleration;
  //   p.y -= p.velocity;
  //   if (p.y <-200) {
  //     p.y = 200;
  //     p.velocity = 0;
  //   }
  // });
  // starGeo.verticesNeedUpdate = true;
  // stars.rotation.y += 0.002;
  if (checkCollision(virus, person) || checkCollision(virus2, person)) {
    let sound4 = new THREE.Audio(pendengar);
    let loaderAudio4 = new THREE.AudioLoader().load("audio/audio_death.mp3", (hasil) => {
        sound4.setBuffer(hasil);
        sound4.setVolume(0.4);
        sound4.play();
    });
    modal.classList.add("show-modal");
    if (highScore.innerHTML < i) {
      highScore.innerHTML = i;
      localStorage.setItem("highScore", i);
    }
  } else {
    requestAnimationFrame(animate);
  }

  Math.round(person.position.y) != 0
    ? (person.position.y -= 0.25)
    : (person.position.y = 0);

  Math.round(virus.position.z) == 30
    ? virus.position.set(
        randomPos[Math.floor(Math.random() * randomPos.length)],
        0,
        -10
      )
    : (virus.position.z += 0.1 + speed);

  Math.round(virus2.position.z) == 30
    ? virus2.position.set(
        randomPos[Math.floor(Math.random() * randomPos.length)],
        0,
        -10
      )
    : (virus2.position.z += 0.1 + speed);

  let delta = clock.getDelta();
  mixer.update(delta);

  renderer.render(scene, cam);
  score.innerHTML = i++;
}

function addSpeed() {
  speed += 0.1;
}

animate();
setInterval(addSpeed, 5000);
// backgroundAnimate();
