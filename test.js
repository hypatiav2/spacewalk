var planetlist = [];

var audio = new Audio('spacemusic.mp3');
audio.play();

///////PLANETS//////////
function addStar () {
  const geometry = new THREE.SphereGeometry (0.15, 24, 24);
  const material =   new THREE.MeshStandardMaterial( { color: 0xffffff, emissive : 0xffffff, emissiveIntensity: 0.3 });
  const star = new THREE.Mesh( geometry, material );
  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
  star.position.set(x, y, z);
  scene.add(star);
}

function init() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000);
  document.body.appendChild(renderer.domElement);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 4;

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
  var planet = new THREE.Mesh(
    // The geometry: the shape & size of the object
    new THREE.SphereGeometry(2,40,40),
    // The material: the appearance (color, texture) of the object
    new THREE.MeshStandardMaterial({
      map:  new THREE.TextureLoader().load('coruscant/diffuse.png'),
      normalMap: new THREE.TextureLoader().load('coruscant/normal.png'),
      specularMap: new THREE.TextureLoader().load('coruscant/specular.png'),
      shininess: 0,
      metalness: 0,
      emissiveMap:  new THREE.TextureLoader().load('coruscant/lights.png'),
      emissive : 0xfcc168,
      emissiveIntensity: 1.4
    })
  );
  
  var clouds = new THREE.Mesh(
    //geometry
    new THREE.SphereGeometry(2.03,36,36),
    //texture mapping
    new THREE.MeshPhongMaterial({
      map:  new THREE.TextureLoader().load('coruscant/cloudsmap.png'),
      //normalMap: new THREE.TextureLoader().load('coruscant/cloudsbump.png'),
      transparent: true
      
    })
  );
  
  var haze = new THREE.Mesh(
    // The geometry: the shape & size of the object
    new THREE.SphereGeometry(2.05,36,36),
    // The material: the appearance (color, texture) of the object
    new THREE.MeshPhongMaterial({
      color: 0x463fcc,
      transparent: true,
      opacity: 0.3
    })
  );
  planet.position.set(10,3,-5);
  clouds.position.set(10,3,-5);
  haze.position.set(10,3,-5);
  
  planetlist.push(planet, clouds, haze)
  
  
  // Shaddaa
  var planet = new THREE.Mesh(
    // The geometry: the shape & size of the object
    new THREE.SphereGeometry(2,36,36),
    // The material: the appearance (color, texture) of the object
    new THREE.MeshStandardMaterial({
      map:  new THREE.TextureLoader().load('shaddaa/diffuse.png'),
      normalMap: new THREE.TextureLoader().load('shaddaa/normal.png'),
      roughnessMap: new THREE.TextureLoader().load('shaddaa/roughness.png'),
      displacementMap: new THREE.TextureLoader().load('shaddaa/displacement.png'),
      displacementScale: 0.07,
      shininess: 0,
      metalness: 0,
      emissiveMap:  new THREE.TextureLoader().load('shaddaa/lights.png'),
      emissive : 0xfcc168,
      emissiveIntensity: 2
    })
  );
  
  var clouds = new THREE.Mesh(
    //geometry
    new THREE.SphereGeometry(2.03,36,36),
    //texture mapping
    new THREE.MeshPhongMaterial({
      map:  new THREE.TextureLoader().load('shaddaa/clouds2.png'),
      //normalMap: new THREE.TextureLoader().load('coruscant/cloudsbump.png'),
      transparent: true
      
    })
  );
  planet.position.set(-10,5,-10);
  clouds.position.set(-10,5,-10);
  planetlist.push(planet, clouds)
  
  // Csilla
  var planet = new THREE.Mesh(
    // The geometry: the shape & size of the object
    new THREE.SphereGeometry(2,40,40),
    // The material: the appearance (color, texture) of the object
    new THREE.MeshStandardMaterial({
      map:  new THREE.TextureLoader().load('csilla/diffuse.png'),
      normalMap: new THREE.TextureLoader().load('csilla/normal.png'),
      roughnessMap: new THREE.TextureLoader().load('csilla/roughness.png'),
      displacementMap: new THREE.TextureLoader().load('csilla/displacement.png'),
      displacementScale: 0.07,
      shininess: 0,
      metalness: 0,
      emissiveMap:  new THREE.TextureLoader().load('csilla/lights.png'),
      emissive : 0x2dccfc,
      emissiveIntensity: 2
    })
  );
  
  var clouds = new THREE.Mesh(
    //geometry
    new THREE.SphereGeometry(2.03,36,36),
    //texture mapping
    new THREE.MeshPhongMaterial({
      map:  new THREE.TextureLoader().load('csilla/clouds.png'),
      //normalMap: new THREE.TextureLoader().load('coruscant/cloudsbump.png'),
      transparent: true
    })
  );
  planet.position.set(-7,-10,-10);
  clouds.position.set(-7,-10,-10);
  planetlist.push(planet, clouds)

  // TARIS
  var planet = new THREE.Mesh(
    // The geometry: the shape & size of the object
    new THREE.SphereGeometry(2,40,40),
    // The material: the appearance (color, texture) of the object
    new THREE.MeshStandardMaterial({
      map:  new THREE.TextureLoader().load('taris/diffuse.png'),
      normalMap: new THREE.TextureLoader().load('taris/normal.png'),
      specularMap: new THREE.TextureLoader().load('taris/specular.png'),
      shininess: 0,
      metalness: 0,
      emissiveMap:  new THREE.TextureLoader().load('taris/lights.png'),
      emissive : 0xfff1b0,
      emissiveIntensity: 0.6
    })
  );
  
  var clouds = new THREE.Mesh(
    //geometry
    new THREE.SphereGeometry(2.03,36,36),
    //texture mapping
    new THREE.MeshPhongMaterial({
      map:  new THREE.TextureLoader().load('taris/clouds.png'),
      normalMap: new THREE.TextureLoader().load('taris/cloudsbump.png'),
      transparent: true
    })
  );
  
  planetlist.push(planet, clouds)

  
//// ADD SCENE OBJECTS ////////////
  // Add the planets into the scene
  for (var i = 0; i < planetlist.length; i++) {
    scene.add(planetlist[i]);
    planetlist[i].rotation.z += 0.3;
  }

  window.addEventListener('resize', resizeFunction);
}

let resizeFunction = function() {
    let width = window.innerWidth;
    let height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
}


var moveup = true;
var bounce = 0;

let animate = function() {
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);

  
  for (var i = 0; i < planetlist.length; i++) {
    planetlist[i].rotation.y += 0.001;
    planetlist[i].rotation.z += 0.001;
  }
  
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

  
  if (bounce == 2){
    moveup = false;
  } else if (bounce == 0){
    moveup == true;
  }

  if (moveup == true) {
    camera.position.y -= 0.01;
    bounce -= 1;
  } else {
    camera.position.y += 0.01;
    bounce +=1
  }
  
}
init();
animate();