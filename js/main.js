var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xffe921, 1);
document.body.appendChild( renderer.domElement );

$(window).on('resize', function(){
	camera.aspect = window.innerWidth / window.innerHeight;
	 camera.updateProjectionMatrix();

	 renderer.setSize( window.innerWidth, window.innerHeight );
 });

var frogMesh;

var loader = new THREE.JSONLoader();
var params = {
  meshPath: 'frogMesh.json',
  texPath: 'frogTexture.png'
};

loader.load("../models/frog/"+params.meshPath, function(geom,materials) {
    var texture = new THREE.TextureLoader().load( "../models/frog/"+params.texPath , function(texture){

			var material = new THREE.MeshPhongMaterial( {
			        color: 0xfffffff,
			        shininess: 10,
			        map:texture,
			        shading: THREE.FlatShading
			});
			frogMesh = new THREE.Mesh(geom,material);
					frogMesh.scale.set(.25,.25,.25);
					frogMesh.rotation.y += 3;
					frogMesh.rotation.x += .3;
			    scene.add(frogMesh);
		});
});

var light = new THREE.DirectionalLight('white',1);
light.position.set(-75,200,20000).normalize();
scene.add(light);

camera.position.z = 5;

function render() {
	requestAnimationFrame( render );
  //
	if (frogMesh) {
		frogMesh.rotation.x += 0.001;
		frogMesh.rotation.y += 0.0009;
		frogMesh.rotation.z += 0.00009;
	}

	renderer.render( scene, camera );
}

$('button').on('click', function() {
	console.log('mesh: ', frogMesh);
	frogMesh.material.map = THREE.ImageUtils.loadTexture("../models/frog/wood_texture.jpg");
	frogMesh.material.needsUpdate = true;
});

render();

