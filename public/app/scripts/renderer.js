app.renderer = (function() {
    // Set up the scene, camera, and renderer as global variables.
    'use strict';
    var scene, camera, renderer, controls, controlsCube, sceneCube, cameraCube;
    var keyboard = new THREEx.KeyboardState();
    var clock = new THREE.Clock();
    var flag = true;
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
        camera.position.set(-25,-16,-9);
        camera.lookAt(new THREE.Vector3(70,-16,-9));
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

        loader.load('hmain.json', function(geometry, materials) {
            var material = new THREE.MeshFaceMaterial(materials);
            var mesh = new THREE.Mesh(geometry, material);
            mesh.scale.set(1, 1, 1);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);
        });

        // Add OrbitControls so that we can pan around with the mouse.
        // controls = new THREE.OrbitControls(camera, renderer.domElement);
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

        var mesh = new THREE.Mesh(new THREE.BoxGeometry(10000, 10000, 10000), material);
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

        addPointLight(38.8, 4.9, 49.5, 0xffffff, 3, 50); //Kitchen Center Light
        addPointLight(20.8, 4.9, 55, 0xffffff, 1, 50); //kitchen 
        addPointLight(5, 30, 19, 0xffffff, 2, 50); //bed (above bed)
        addPointLight(5, 34, -10, 0xffffff, 2, 50); //bed center
        addPointLight(-20, 30, -10, 0xffffff, 2.5, 50); //bed side wall window
        addPointLight(5, 34, -30, 0xffffff, 2, 30); //bed side wall table
        addPointLight(4, -10, -10, 0xffffff, 2.5, 50); // living room center
        addPointLight(-75, -2, -52, 0xffffff, 2, 100); //pool lamp post
        addPointLight(-80, -2, -58, 0xffffff, 2, 50); //pool lamp post
        addPointLight(-30, -10, -10, 0xffffff, 3, 50); //entrance
        addPointLight(70, 0, -28, 0xffffff, 2.5, 50); //starircase lower flight
        addPointLight(50, 15, -28, 0xffffff, 2, 30); //starircase upper flight
        addPointLight(34, -10, 6, 0xffffff, 2.5, 50); //living room kitchen
        addPointLight(60, 2.9, 80, 0xffffff, 1.5, 40); //kitchen shelf
        addPointLight(60, 2.9, 60, 0xffffff, 2, 40); //kitchen cabinets
        addPointLight(74, 3, 28, 0xffffff, 2, 40); //Kitchen staircase border

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
        requestAnimationFrame(animate);
        cameraUpdate();
        ensureBoundaryConditions();
        // Render the scene.
        renderer.clear();
        renderer.render(sceneCube, cameraCube);
        renderer.render(scene, camera);

        // controls.update();
        controlsCube.update();

    }

    function cameraUpdate() {
        var delta = clock.getDelta(); // seconds.
        var moveDistance = 20 * delta; // 200 pixels per second
        var rotateAngle = Math.PI / 2 * delta; // pi/2 radians (90 degrees) per second
        // local transformations
        // move forwards/backwards/left/right
        if (keyboard.pressed('up'))
            camera.translateZ(-moveDistance);
        if (keyboard.pressed('down'))
            camera.translateZ(moveDistance);
        if (keyboard.pressed('Q'))
            camera.translateX(-moveDistance);
        if (keyboard.pressed('E'))
            camera.translateX(moveDistance);
        if (keyboard.pressed('R'))
            camera.translateY(moveDistance);
        if (keyboard.pressed('F'))
            camera.translateY(-moveDistance);

        if (keyboard.pressed('B')) { //bedroom
          flag = true;
            camera.position.set(26,17,-34);
            camera.lookAt(new THREE.Vector3(-34,17,16));
        }
        if (keyboard.pressed('V')) { //Entrance
          flag=true;
            camera.position.set(-25,-16,-9);
            camera.lookAt(new THREE.Vector3(70,-16,-9));
        }

        if (keyboard.pressed('C')) { //Entrance
          flag=false;
            camera.position.set(74,75,-42.6);
            camera.lookAt(new THREE.Vector3(20,13,11));
        }
        // rotate left/right/up/down
        var rotation_matrix = new THREE.Matrix4().identity();
        if (keyboard.pressed('A') || keyboard.pressed('left'))
            camera.rotateOnAxis(new THREE.Vector3(0, 1, 0), rotateAngle);
        if (keyboard.pressed('D') || keyboard.pressed('right'))
            camera.rotateOnAxis(new THREE.Vector3(0, 1, 0), -rotateAngle);
         if (keyboard.pressed("W")){
          if(flag===false){
           camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), rotateAngle);
          }
        }
         if (keyboard.pressed("S")){
          if(flag===false){
           camera.rotateOnAxis(new THREE.Vector3(1, 0, 0), -rotateAngle);
          }
        }
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

    function ensureBoundaryConditions() {
      if(flag === true){
        if (camera.position.x < -106) {
            camera.position.setX(-105);
        } else if (camera.position.x > 75) {
            camera.position.setX(74);
        } else if (camera.position.z < -43) {
            camera.position.setZ(-42);
        } else if (camera.position.z > 89) {
            camera.position.setZ(88);
        } else if (camera.position.y < -24) {
            camera.position.setY(-23);
        } else if (camera.position.y > 75) {
            camera.position.setY(74);
        }
      }
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
