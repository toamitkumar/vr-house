app.renderer = (function() {
  // Set up the scene, camera, and renderer as global variables.
  'use strict';
  var scene, camera, renderer, controls,controlsCube, sceneCube, cameraCube;

  // init();
  // animate();

  // Sets up the scene.
  function init() {

    // Create the scene and set the scene size.
    scene = new THREE.Scene();
    var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;

    // Create a renderer and add it to the DOM.
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(WIDTH, HEIGHT);
    renderer.autoClear = false;
    document.body.appendChild(renderer.domElement);

    // Create a camera, zoom it out from the model a bit, and add it to the scene.
    camera = new THREE.PerspectiveCamera(90, WIDTH / HEIGHT, 1, 100000);
    camera.position.set(5, 9, 0);
    scene.add(camera);

    //scenecube
    cameraCube = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 100000);
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

    var dirLight = new THREE.DirectionalLight(0xffffff, 1);
    dirLight.position.set(100, 100, 50);
    scene.add(dirLight);

    // Load in the mesh and add it to the scene.
    var loader = new THREE.JSONLoader();

    loader.load('3dmodel.json', function(geometry, materials) {
      var material = new THREE.MeshFaceMaterial(materials);
      var mesh = new THREE.Mesh(geometry, material);
      mesh.scale.set(1, 1, 1);
      scene.add(mesh);
    });

    // Add OrbitControls so that we can pan around with the mouse.
    controls = new THREE.OrbitControls(camera, renderer.domElement);
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


  // Renders the scene and updates the render as needed.
  function animate() {

    cameraCube.rotation.copy(camera.rotation);

    // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
    requestAnimationFrame(animate);

    // Render the scene.
    renderer.clear();
    renderer.render(sceneCube, cameraCube);
    renderer.render(scene, camera);
    

    controls.update();
    controlsCube.update();

  }

  return {
    init: init,
    animate: animate
  };
})();
