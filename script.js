var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var loader = new THREE.OBJLoader();
var mtlLoader = new THREE.MTLLoader();
var controls = new THREE.PointerLockControls( camera, document.body );


var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );


//var geometry = new THREE.BoxGeometry( 1, 1, 1 );
//var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
//var cube = new THREE.Mesh( geometry, material );
////scene.add( cube );

var light = new THREE.AmbientLight( 0x404040 ); // soft white light
scene.add( light );

var pointLight = new THREE.PointLight( 0xffffff, 0.8 );
camera.add( pointLight );
scene.add( camera );

var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('assets/');
mtlLoader.load('town1.mtl', function(materials) {
    materials.preload();
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('assets/');
    objLoader.load('town1.obj', function(object) {
    object.rotation.y += 1; 
    object.position.set(0,-5,0);
        scene.add(object);
    },	
                   function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
                   // called when loading has errors
                   function ( error ) {

        console.log( 'An error happened' );

    });
});


loader.load(
    // resource URL
    'assets/town1.obj',
    // called when resource is loaded
    function ( object ) {
        object.position.set(15,-5,-20);
        //        object.rotation.x += 1;
        object.rotation.y += 1;
        //		scene.add( object );

    },
    // called when loading is in progresses
    function ( xhr ) {

        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

    },
    // called when loading has errors
    function ( error ) {

        console.log( 'An error happened' );

    }
);

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );
    //  cube.rotation.x += 0.01;
    //  cube.rotation.y += 0.01;
    renderer.render( scene, camera );
}
animate();
