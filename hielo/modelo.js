import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.116.1/build/three.module.js';
      import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.116.1/examples/jsm/controls/OrbitControls.js';
      import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.116.1/examples/jsm/loaders/GLTFLoader.js';
      var l1;
      var camera;
      var scene;
      var renderer;

      function push_ambiental_ligth(color, intensity) {
        const light = new THREE.AmbientLight(color, intensity);
        scene.add(light);
      }

      function push_directional_light(
        px,
        py,
        pz,
        tx,
        ty,
        tz,
        color,
        intensity
      ) {
        //Luz direccional
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(px, py, pz);
        light.target.position.set(tx, ty, tz);
        scene.add(light);
        scene.add(light.target);
      }

      function push_point_light(color, intensity, px, py, pz) {
        const lightP = new THREE.PointLight(color, intensity);
        lightP.position.set(px, py, pz);
        scene.add(lightP);

        const pointLightHelper = new THREE.PointLightHelper(lightP, 1.5);
        scene.add(pointLightHelper);
      }
      function push_modelGLB_not_animed(
        url,
        posx = 0,
        posy = 0,
        posz = 0,
        sizeX = 1,
        sizeY = 1,
        sizeZ = 1,
        rotx = 0,
        roty = 0,
        rotz = 0
      ) {                
        const gltfLoader = new GLTFLoader();
          
        gltfLoader.load(url, (gltf) => {
          const model = gltf.scene;
          model.scale.set(sizeX, sizeY, sizeZ);
          model.rotation.set(rotx, roty, rotz);
          model.position.set(posx, posy, posz);
          //Para cambiar el material
          gltf.scene.traverse(function (child) {
            if (child.isMesh) {
              child.material.color = new THREE.Color(0xF9F7F2);
            }
          });
          scene.add(model);
        });
      }
      function init() {
        
        scene = new THREE.Scene();
        
        camera = new THREE.PerspectiveCamera(
          75,
          window.innerWidth  / window.innerHeight, 0.1, 1000
        );
        camera.position.set( -150, 0, 1 );
        camera.position.z = 15 ;
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);        
        document.body.appendChild(renderer.domElement);
        
        const controls = new OrbitControls( camera, renderer.domElement );
        controls.update();
        
        push_ambiental_ligth("#FDFDFD", 0.5);

        //Luz direccional
        push_directional_light(0, 10, 20, 0, -10, 0, "#FDFDFD", 0.3);
        push_directional_light(0, -30, 0, 0, 30, 0, "#FDFDFD", 0.3);

        //Luz puntual
        push_point_light("#FDFDFD", 0.5, 1, 5, -13);
        push_point_light("#FDFDFD", 1, -1, 5, -13);
        push_point_light("#FF0000",1.7, 13, 5, 0);
           push_modelGLB_not_animed("https://cdn.glitch.global/a412104d-0482-48b2-a4e0-2b3170e89fea/edificio%20llallagua.glb?v=1695947666343",290,-25,-50,0.1,0.1,0.1,0,85,0);
      }
      function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
      }
      //Esta funcion se llama cuando cambia de tamaño
      function onWindowResize()
      {
      camera.aspect = CANVAS_WIDTH / CANVAS_HEIGHT;
      camera.updateProjectionMatrix();
      renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
      }
      init();
      animate();    