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

// TODO:
// high level specification of where the ctrl panel and stats window are

var XAC = XAC || {};

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

$(document).ready(function() {
    //
    // scene and view point
    //
    XAC.scene = new THREE.Scene();
    XAC.objects = new Array();

    XAC.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    XAC.posCam = new THREE.Vector3(-16, 8, 10);
    XAC.camera.position.copy(XAC.posCam.clone().multiplyScalar(50));

    XAC.lookAt = new THREE.Vector3(-25, 0, -0).multiplyScalar(10);
    XAC.mouseCtrls = new THREE.TrackballControls(XAC.camera, undefined, XAC.lookAt);
    XAC.mouseCtrls.rotateSpeed = 5.0;
    XAC.mouseCtrls.zoomSpeed = 0.5;
    XAC.mouseCtrls.panSpeed = 2;

    XAC.mouseCtrls.noZoom = false;

    XAC.mouseCtrls.staticMoving = true;
    XAC.mouseCtrls.dynamicDampingFactor = 0.3;

    XAC.wheelDisabled = false;


    //
    // draw ground
    //
    var yOffset = 1;

    var groundMaterial = new THREE.MeshBasicMaterial({
        color: GROUNDCOLOR,
        transparent: true,
        opacity: 0.5
    });


    var geometryGround = new THREE.CubeGeometry(1000, 1, 1000);
    XAC.ground = new THREE.Mesh(
        geometryGround,
        groundMaterial,
        0 // mass
    );

    XAC.ground.position.y -= yOffset;
    XAC.scene.add(XAC.ground);


    //
    // draw grid
    //
    XAC.drawGrid = function(yOffset) {
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

    XAC.grid = XAC.drawGrid(yOffset);
    XAC.scene.add(XAC.grid);


    //
    // add lights
    //
    XAC.lights = [];
    XAC.lights[0] = new THREE.PointLight(0xffffff, 1, 0);
    XAC.lights[0].position.set(0, 100, -
        100);
    XAC.lights[0].castShadow = true;
    XAC.scene.add(XAC.lights[0]);


    //
    // stats window
    //
    XAC.stats = new Stats();
    XAC.stats.domElement.style.position = 'absolute';
    XAC.stats.domElement.style.top = '0px';
    XAC.stats.domElement.style.right = '0px';
    $(document.body).append(XAC.stats.domElement);


    //
    // renderer
    //
    XAC.renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    XAC.renderer.setSize(window.innerWidth, window.innerHeight);
    $(document.body).append(XAC.renderer.domElement);
    XAC.renderer.setClearColor(BACKGROUNDCOLOR);

    var render = function() {
        requestAnimationFrame(render);
        XAC.mouseCtrls.update();
        XAC.stats.update();
        XAC.lights[0].position.copy(XAC.camera.position);
        XAC.renderer.render(XAC.scene, XAC.camera);
    };

    render();
});
