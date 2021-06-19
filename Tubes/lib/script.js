var scene = new THREE.Scene();
const aspect = window.innerWidth / window.innerHeight;
const windowSize = 20;
var randomPos = [10, 0, -10];

var cam = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  1,
  1000
);

var renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// hlight = new THREE.AmbientLight(0x404040,100);
// scene.add(hlight);

// directionalLight = new THREE.DirectionalLight(0xffffff,100);
// directionalLight.position.set(0,1,0);
// directionalLight.castShadow = true;
// scene.add(directionalLight);

let loader2 = new THREE.GLTFLoader();
loader2.load("model_virus/scene.gltf", function (gltf) {
  virus = gltf.scene;
  virus.scale.set(0.5, 0.5, 0.5);
  virus.position.set(
    randomPos[Math.floor(Math.random() * randomPos.length)],
    0,
    -10
  );
  scene.add(virus);
});

let loader = new THREE.GLTFLoader();
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

var virus = new THREE.Object3D();
var person = new THREE.Object3D();
var mixer = new THREE.AnimationMixer(person);

//light untuk person
var light = new THREE.HemisphereLight(0xffffff, 0x000000, 2);
scene.add(light);

let grid = new THREE.GridHelper(100, 10, 0xfafafa, 0xfafafa);
grid.position.y = -1;
scene.add(grid);

cam.position.z = 35;
cam.position.y = 10;

var controls = new THREE.OrbitControls(cam, renderer.domElement);
controls.update();

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

window.addEventListener("resize", function () {
  var width = window.innerWidth;
  var height = window.innerHeight;
  renderer.setSize(width, height);
  cam.aspect = width / height;
  cam.updateProjectionMatrix();
});

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
      ? (person.position.y += 10)
      : (person.position.y = 10);
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

// var randomPos = [-10, 0, 10];
// randomPos[Math.floor(Math.random()*randomPos.length)];

var unused = [];

function obstacles() {
  // loader2.load("model_virus/scene.gltf", function (gltf) {
  //   virus2 = gltf.scene;
  //   virus2.scale.set(0.5, 0.5, 0.5);
  //   virus2.position.set(
  //     randomPos[Math.floor(Math.random() * randomPos.length)],
  //     0,
  //     -10
  //   );
  //   scene.add(virus2);
  // });
  console.log("test");
}
// obstacles();
const clock = new THREE.Clock();
let i = 0;
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
  if (
    Math.round(virus.position.z) == 19 &&
    person.position.x == virus.position.x
  ) {
    alert("stop");
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
    : (virus.position.z += 0.1);

  var delta = clock.getDelta();
  mixer.update(delta);

  renderer.render(scene, cam);
  document.getElementById("score").innerHTML = i++;
}

function draw() {
  obstacles();
}

animate();
setInterval(draw, 5000);
// backgroundAnimate();
