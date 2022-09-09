var planetlist = [];
var audio = new Audio('spacemusic.mp3');
audio.play();

let resizeFunction = function() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}

// PLANET CLASS
class Planet {
  constructor(name, x, y, z, intensity=0, light_color = 0xffffff, haze_exist=null, cloudsbump=null,roughmap=null) {
    this.name = name;
    this.intensity = intensity;
    this.light_color = light_color;
    this.x = x;
    this.y = y;
    this.z = z;
    this.haze_exist = haze_exist;
    this.cloudsbump = cloudsbump;
    this.roughmap = roughmap;
    this.body = '';
    this.haze = '';
    this.clouds = '';
  }
  
  createPlanet() {
    this.body = new THREE.Mesh(
      // The geometry: the shape & size of the object
      new THREE.SphereGeometry(2,40,40),
      // The material: the appearance (color, texture) of the object
      new THREE.MeshStandardMaterial({
        map:  new THREE.TextureLoader().load(this.name+'/diffuse.png'),
        normalMap: new THREE.TextureLoader().load(this.name+'/normal.png'),
        shininess: 0,
        metalness: 0,
        specularMap: new THREE.TextureLoader().load(this.name+'/specular.png'),
        emissiveMap:  new THREE.TextureLoader().load(this.name+'/lights.png'),
        emissive: this.light_color,
        emissiveIntensity: this.intensity,
        roughnessMap: this.roughmap,
        displacementMap: new THREE.TextureLoader().load(this.name+'/displacement.png'),
        displacementScale: 0.07,
      })
    );

    this.clouds = new THREE.Mesh(
      //geometry
      new THREE.SphereGeometry(2.03,36,36),
      //texture mapping
      new THREE.MeshPhongMaterial({
        map:  new THREE.TextureLoader().load(this.name+'/clouds.png'),
        normalMap: this.cloudsbump,
        transparent: true
      })
    );
    this.body.position.set(this.x,this.y,this.z);
    this.clouds.position.set(this.x,this.y,this.z);
    
    if (this.haze_exist == true) {
      this.haze = new THREE.Mesh(
        // The geometry: the shape & size of the object
        new THREE.SphereGeometry(2.05,36,36),
        // The material: the appearance (color, texture) of the object
        new THREE.MeshPhongMaterial({
          opacity: 0.3,
          color: 0x463fcc,
          transparent: true
        })
      );
      this.haze.position.set(this.x,this.y,this.z);
    }
  }
}


/// STAR POPULATION
function addStar () {
  const geometry = new THREE.SphereGeometry (0.15, 24, 24);
  const material =   new THREE.MeshStandardMaterial( { color: 0xffffff, emissive : 0xffffff, emissiveIntensity: 0.3 });
  const star = new THREE.Mesh( geometry, material );
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}



/////////////////// SET UP SCENE ////////////////////////////////////
function init() {

  //render setup
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 5;

  controls = new THREE.TrackballControls(camera, renderer.domElement);
  controls.target.set(0, 0, -10);
  
  //lighting
  const pointLight = new THREE.PointLight(0xffffff);
  pointLight.position.set(55,75,50);
  
  const light = new THREE.AmbientLight( 0xffffff ); // soft white light
  scene.add( pointLight );

  
  //////////// STARS ///////////////////
  Array(220).fill().forEach(addStar)

  
  //////////// PLANETS ///////////////////
  // Coruscant
  const p1 = new Planet('coruscant', 10, 3, -5, 1.4, 0xfcc168, haze_exist=true, cloudsbump = new THREE.TextureLoader().load('coruscant/cloudsbump.png'));
  p1.createPlanet();
  planetlist.push(p1.body, p1.clouds, p1.haze);

  // Nar Shaddaa
  const p2 = new Planet('shaddaa', -10, 5,-10, 2, 0xfcc168, roughmap=new THREE.TextureLoader().load('shaddaa/roughness.png'));
  p2.createPlanet();
  planetlist.push(p2.body, p2.clouds);

  //Csilla
  const p3 = new Planet('csilla', -7, -10, -10, 2, 0x2dccfc, roughmap=new THREE.TextureLoader().load('csilla/roughness.png'));
  p3.createPlanet();
  planetlist.push(p3.body, p3.clouds);
  
  // Taris
  const p4 = new Planet('taris', 9, -7, -8, 1.4, 0xfcc168, cloudsbump = new THREE.TextureLoader().load('taris/cloudsbump.png'));
  p4.createPlanet();
  planetlist.push(p4.body, p4.clouds);

  // Mon Cala
  const p5 = new Planet('moncala', 3, 3, 4, 2, 0x2dccfc, roughmap=new THREE.TextureLoader().load('moncala/roughness.png'));
  p5.createPlanet();
  planetlist.push(p5.body, p5.clouds);

  // Tatooine
  const p6 = new Planet('tatooine', 3, 7, -13, 3, 0xfcc168);
  p6.createPlanet();
  planetlist.push(p6.body, p6.clouds);

  // Mustafar
  const p7 = new Planet('mustafar', -8, -1, 0, 3, 0xfcc168);
  p7.createPlanet();
  planetlist.push(p7.body, p7.clouds);

  
  //// ADD SCENE OBJECTS ////////////
  for (var i = 0; i < planetlist.length; i++) {
    scene.add(planetlist[i]);
    planetlist[i].rotation.z += 0.3;
  }

  window.addEventListener('resize', resizeFunction);
  
}


/////////// MAIN LOOP //////////////
var moveup = true;
var bounce = 0;

let animate = function() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  
  for (var i = 0; i < planetlist.length; i++) {
    planetlist[i].rotation.y += 0.003;
    planetlist[i].rotation.z += 0.001;
  }
  
  // camera controls
  document.onkeydown = function (e) {
    switch (e.key) {
        case 'ArrowUp':
            camera.position.z -= 0.2;
            break;
        case 'ArrowDown':
            camera.position.z += 0.2;
            break;
        case 'ArrowLeft':
            camera.position.x += 0.2;
            break;
        case 'ArrowRight':
            camera.position.x -= 0.2;
    }
  };

  /// bounce camera
  if (bounce == 0.2){
    moveup = false;
  } else if (bounce == 0){
    moveup == true;
  }
  if (moveup == true) {
    camera.position.y -= 0.01;
    bounce += 1;
  } else {
    camera.position.y += 0.01;
    bounce -=1;
  }
  
}

init();
animate();