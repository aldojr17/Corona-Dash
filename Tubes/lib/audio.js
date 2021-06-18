let pendengar = new THREE.AudioListener();
cam.add(pendengar);

//BACKGROUND AUDIO
let sound1 = new THREE.Audio(pendengar);
let loaderAudio1 = new THREE.AudioLoader().load("audio/audio_background.mp3", (hasil) => {
    sound1.setBuffer(hasil);
    sound1.setVolume(0.2);
    sound1.setLoop(true);
    sound1.play();
});

//JUMP AUDIO
let sound2 = new THREE.Audio(pendengar);
let loaderAudio2 = new THREE.AudioLoader().load("audio/audio_jump(legit).mp3", (hasil) => {
    sound2.setBuffer(hasil);
    sound2.setVolume(0.2);
});

//WHOOSH AUDIO
let sound3 = new THREE.Audio(pendengar);
let loaderAudio3 = new THREE.AudioLoader().load("audio/audio_whoosh(legit).mp3", (hasil) => {
    sound3.setBuffer(hasil);
    sound3.setVolume(0.4);
});

addEventListener('keydown', (evt) => {
    if (evt.key == " ") {
        sound2.play();
    }
    else if (evt.key == "a") {
        sound3.play();
    }
    else if (evt.key == "d") {
        sound3.play();
    }
});
