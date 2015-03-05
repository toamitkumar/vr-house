app.renderer = (function() {
    // Set up the scene, camera, and renderer as global variables.
    'use strict';
    var scene, camera, renderer, controls, controlsCube, sceneCube, cameraCube;

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
        camera.position.set(46, 161.0, 41.4);
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

        var mesh = new THREE.Mesh(new THREE.BoxGeometry(10000, 10000, 10000), material);
        sceneCube.add(mesh);

    }

    function addPointLight(x, y, z, color, intensity, penetration) {
        var bedLight = new THREE.PointLight(color, intensity, penetration);
        bedLight.position.set(x, y, z);
        scene.add(bedLight);
        scene.add(new THREE.PointLightHelper(bedLight, 2.5));
    }

    function setLighting() {
        // var dirLight = new THREE.DirectionalLight(0xffffff, 1);
        // dirLight.position.set(3000, 100, 3000);
        // scene.add(dirLight);

        addPointLight(38.8, 4.9, 49.5, 0xffffff, 3, 50);//Kitchen Center Light
        addPointLight(20.8, 4.9, 55, 0xffffff, 1, 50);//kitchen 
        addPointLight(5, 30, 19, 0xffffff, 2, 50);//bed (above bed)
        addPointLight(5, 34, -10 , 0xffffff, 2, 50);//bed center
        addPointLight(-20, 30, -10, 0xffffff, 2.5, 50);//bed side wall window
        addPointLight(5, 34, -30, 0xffffff, 2, 30);//bed side wall table
        addPointLight(4, -10, -10, 0xffffff, 2.5, 50);// living room center
        addPointLight(-75, -2, -52, 0xffffff, 2, 100);//pool lamp post
        addPointLight(-80, -2, -58, 0xffffff, 2, 50);//pool lamp post
        addPointLight(-30, -10, -10, 0xffffff, 3, 50);//entrance

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

        // Render the scene.
        renderer.clear();
        renderer.render(sceneCube, cameraCube);
        renderer.render(scene, camera);

        controls.update();
        controlsCube.update();

    }

    function getCameraPosition() {
        return camera.position;
    }

    function setCameraPosition(x,y,z){
       camera.position.set(x,y,z);
    }

    return {
        init: init,
        animate: animate,
        getCameraPosition: getCameraPosition,
        setCameraPosition: setCameraPosition
    };
})();
