/*------------------------------------------------------------------------------------*
 *
 * variable declaration and program initialization
 * 
 * by xiang 'anthony' chen, xiangchen@acm.org
 *
 *------------------------------------------------------------------------------------*/

//
// visual properties
//
var BACKGROUNDCOLOR = 0xF2F0F0;
var GROUNDCOLOR = 0xF2F0F0;
var GRIDCOLOR = 0x888888;

var COLORNORMAL = 0xDB5B8A; // the normal color
var COLORCONTRAST = 0xD1D6E7; // is the contrast of the COLORNORMAL

var WIDTHPANEL = 388;

var MATERIALNORMAL = new THREE.MeshPhongMaterial({
     color: COLORNORMAL,
     transparent: true,
     opacity: 0.75
});


//
// rendering and viewport
//
var renderer = new THREE.WebGLRenderer({
     antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var scene = new THREE.Scene();
var objects = new Array();

var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
var gPosCam = new THREE.Vector3(-16, 8, 10);
camera.position.copy(gPosCam.clone().multiplyScalar(50));

var gLookAt = new THREE.Vector3(-25, 0, -0).multiplyScalar(10);
var gMouseCtrls = new THREE.TrackballControls(camera, undefined, gLookAt);
var gWheelDisabled = false;


//
// draw floor
//
function drawGround(yOffset) {
     var groundMaterial = new THREE.MeshBasicMaterial({
          color: GROUNDCOLOR,
          transparent: true,
          opacity: 0.5
     });


     var geometryGround = new THREE.CubeGeometry(1000, 1, 1000);
     var ground = new THREE.Mesh(
          geometryGround,
          groundMaterial,
          0 // mass
     );

     ground.position.y -= yOffset;
     return ground;
}
var gGround = drawGround(0);
scene.add(gGround);

//
// draw grid
//
function drawGrid(yOffset) {
     var lineMaterial = new THREE.LineBasicMaterial({
          color: GRIDCOLOR
     });
     var lineGeometry = new THREE.Geometry();
     var floor = 0.5 - yOffset;
     var step = 25;

     for (var i = 0; i <= 40; i++) {

          lineGeometry.vertices.push(new THREE.Vector3(-500, floor, i * step - 500));
          lineGeometry.vertices.push(new THREE.Vector3(500, floor, i * step - 500));

          lineGeometry.vertices.push(new THREE.Vector3(i * step - 500, floor, -500));
          lineGeometry.vertices.push(new THREE.Vector3(i * step - 500, floor, 500));

     }

     return new THREE.Line(lineGeometry, lineMaterial, THREE.LinePieces);
}
var gGrid = drawGrid(0);
scene.add(gGrid);

//
// add lights
//
var lights = [];
lights[0] = new THREE.PointLight(0xffffff, 1, 0);
lights[0].position.set(0, 100, -100);
lights[0].castShadow = true;
scene.add(lights[0]);