app.renderer = (function() {
  // Set up the scene, camera, and renderer as global variables.
  'use strict';
  var scene, camera, renderer, controls, controlsCube, sceneCube, cameraCube;
  var keyboard = new THREEx.KeyboardState();
  var clock = new THREE.Clock();
  // init();
  // animate();

  // Sets up the scene.
  function init() {

    // Create the scene and set the scene size.
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;


    // Create a renderer and add it to the DOM.
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });

    renderer.setSize(WIDTH, HEIGHT);
    renderer.autoClear = false;
    document.body.appendChild(renderer.domElement);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapType = THREE.PCFSoftShadowMap;



    // Create a camera, zoom it out from the model a bit, and add it to the scene.

    camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 0.1, 100000);
    camera.position.set(-550.4, 1.0, -20.4);
    scene.add(camera);

    //scenecube
    cameraCube = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 100000);
    sceneCube = new THREE.Scene();

    // Create an event listener that resizes the renderer with the browser window.
    window.addEventListener('resize', function() {
      var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    });

    // Set the background color of the scene.
    //renderer.setClearColorHex(0x333F47, 1);

    setLighting();


    var loader = new THREE.JSONLoader();

    loader.load('hfinal.json', function(geometry, materials) {
      var material = new THREE.MeshFaceMaterial(materials);
      var mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(1, 1, 1);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      scene.add(mesh);
    });

    // Add OrbitControls so that we can pan around with the mouse.
    //controls = new THREE.OrbitControls(camera, renderer.domElement);
    controlsCube = new THREE.OrbitControls(cameraCube, renderer.domElement);

    //Adding cubebackground
    var r = '../images/';

    var urls = [r + 'px.jpg', r + 'nx.jpg',
      r + 'py.jpg', r + 'ny.jpg',
      r + 'pz.jpg', r + 'nz.jpg'
    ];

    var textureCube = THREE.ImageUtils.loadTextureCube(urls, THREE.CubeRefractionMapping);
    var shader = THREE.ShaderLib.cube;
    shader.uniforms.tCube.value = textureCube;

    var material = new THREE.ShaderMaterial({

      fragmentShader: shader.fragmentShader,
      vertexShader: shader.vertexShader,
      uniforms: shader.uniforms,
      side: THREE.BackSide

    });

    var mesh = new THREE.Mesh(new THREE.BoxGeometry(100000, 100000, 100000), material);
    sceneCube.add(mesh);

  }

  function addPointLight(x, y, z, color, intensity, penetration) {
    var bedLight = new THREE.PointLight(color, intensity, penetration);
    bedLight.position.set(x, y, z);
    scene.add(bedLight);
    //scene.add(new THREE.PointLightHelper(bedLight, 2.5));
  }

  function setLighting() {
    // var dirLight = new THREE.DirectionalLight(0xffffff, 1);
    // dirLight.position.set(3000, 100, 3000);
    // scene.add(dirLight);

    var bedLight = new THREE.PointLight(0xffffff, 2.5, 11);
    bedLight.position.set(0, 10, 5);
    scene.add(bedLight);
    //scene.add(new THREE.PointLightHelper(bedLight, 2.5));


    addPointLight(0, 0.5, 5, 0xffffff, 2.5, 11);
    addPointLight(-5, 0.5, -1, 0xffffff, 1, 5);
    //addPointLight(-8.4, 0.5, 6 , 0xffffff, 2.5, 11);
    addPointLight(3.2, 0.5, -1.3, 0xffffff, 2.5, 11);
    addPointLight(-17.6, 2.6, -3.15, 0xffffff, 2.5, 10);
    addPointLight(-8.6, 2.0, -0.3, 0xffffff, 2.0, 10);




    var bedLight2 = new THREE.PointLight(0xffffff, 2.5, 11);
    bedLight2.position.set(-5, 10, -1);
    scene.add(bedLight2);
    //scene.add(new THREE.PointLightHelper(bedLight2, 2.5));

    var bedLight3 = new THREE.PointLight(0xffffff, 2.5, 11);
    bedLight3.position.set(-8.4, 10, 6);
    scene.add(bedLight3);
    //scene.add(new THREE.PointLightHelper(bedLight3, 2.5));

    var bedLight4 = new THREE.PointLight(0xffffff, 2.5, 11);
    bedLight4.position.set(3.2, 10.3, -1.3);
    scene.add(bedLight4);
    //scene.add(new THREE.PointLightHelper(bedLight4, 2.5));



    addPointLight(8, 2, 19.5, 0xffffff, 2.5, 11);
    addPointLight(1.1, 2, 14.6, 0xffffff, 2.5, 11);
    addPointLight(10.1, 2, 14.6, 0xffffff, 2.5, 11);
    //addPointLight(-8.4, 0.5, 6 , 0xffffff, 2.5, 11);
    addPointLight(2.4, 7.4, 13, 0xffffff, 1.5, 5);
    addPointLight(-10.06, 1.5, 4.3, 0xffffff, 1.5, 5);
    addPointLight(0.11, 4.8, 18.1, 0xffffff, 1.5, 10);
    addPointLight(6.2, 4.3, 9.8, 0xffffff, 1.5, 10);




    // var lightPoint1 = new THREE.PointLight(0xffffff, 3, 150);
    // lightPoint1.position.set(70, 5, 70);
    // scene.add(lightPoint1);
    // scene.add(new THREE.PointLightHelper(lightPoint1, 3));

    // var lightPoint2 = new THREE.PointLight(0xffffff, 3, 150);
    // lightPoint2.position.set(-60,30,-70);
    // scene.add(lightPoint2);
    // scene.add(new THREE.PointLightHelper(lightPoint2, 3));

    var ambLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambLight);
    var ambLight2 = new THREE.AmbientLight(0xffff);
    scene.add(ambLight);
    var ambLight3 = new THREE.AmbientLight(0xffffff);
    scene.add(ambLight);

    //var spotLight = new THREE.SpotLight()
  }


  // Renders the scene and updates the render as needed.
  function animate() {

    cameraCube.rotation.copy(camera.rotation);

    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(animate);

    // Render the scene.
    renderer.clear();
    renderer.render(sceneCube, cameraCube);
    renderer.render(scene, camera);
    cameraUpdate();
    //controls.update();
    controlsCube.update();

  }

  function cameraUpdate() {
    var delta = clock.getDelta(); // seconds.
    var moveDistance = 20 * delta; // 200 pixels per second
    var rotateAngle = Math.PI / 2 * delta; // pi/2 radians (90 degrees) per second
    // local transformations
    // move forwards/backwards/left/right
    if (keyboard.pressed("W"))
      camera.translateZ(-moveDistance);
    if (keyboard.pressed("S"))
      camera.translateZ(moveDistance);
    if (keyboard.pressed("Q"))
      camera.translateX(-moveDistance);
    if (keyboard.pressed("E"))
      camera.translateX(moveDistance);
    if (keyboard.pressed("R"))
      camera.translateY(moveDistance);
    if (keyboard.pressed("F"))
      camera.translateY(-moveDistance);
    // rotate left/right/up/down
    var rotation_matrix = new THREE.Matrix4().identity();
    if (keyboard.pressed("A"))
      camera.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotateAngle);
    if (keyboard.pressed("D"))
      camera.rotateOnAxis(new THREE.Vector3(0, 1, 0), -rotateAngle);
    // if (keyboard.pressed("R"))
    //   camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), rotateAngle);
    // if (keyboard.pressed("F"))
    //   camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), -rotateAngle);
    // if (keyboard.pressed("Z")) {
    //   camera.position.set(0, 25.1, 0);
    //   camera.rotation.set(0, 0, 0);
    // }
    // var relativeCameraOffset = new THREE.Vector3(0, 50, 200);
    // var cameraOffset = relativeCameraOffset.applyMatrix4(camera.matrixWorld);
    // camera.position.x = cameraOffset.x;
    // camera.position.y = cameraOffset.y;
    // camera.position.z = cameraOffset.z;
  }

  function getCameraPosition() {
    return camera.position;
  }

  function setCameraPosition(x, y, z) {
    camera.position.set(x, y, z);
  }

  return {
    init: init,
    animate: animate,
    getCameraPosition: getCameraPosition,
    setCameraPosition: setCameraPosition
  };
})();
