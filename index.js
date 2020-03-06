
//col/row
var table = [
    "Jm", "JonathanMiller", "1.7BC", 1, 1,
    "A", "<a href='https://jonmiller.me/about.html'>About</a>", "38.2DF5B4", 7, 1,
    "Bg", "<a href='https://blog.jonmiller.me'>Blog</a>", "3.7D14", 6, 1,
    "E", "Engineering", "4.7D8", 1, 2,
    "It", "InfoTech", "5.7D04", 2, 2,
    "Cs", "Consulting", "6.7DA", 7, 2,
    "In", "Integrations", "7.7D8", 6, 2,
    "Af", "AirForce", "8.7D04", 1, 3,
    "Ct", "Contracting", "9.1326D5E", 2, 3,
    "Dd", "DoD", "10.131D11A", 3, 3,
    "Dj", "DoJ", "11.1326D5E", 4, 3,
    "Ft", "FinTech", "12.CB2E", 5, 3,
    "Id", "IAM", "13.1326D64", 6, 3,
    "Is", "InfoSec", "14.13357C4", 7, 3,
    "Do", "DevOps", "15.13309A4", 2, 5,
    "L", "Linux", "16.7D6", 1, 4,
    "U", "Unix", "17.7D2", 2, 4,
    "Sh", "Shell", "18.7D2", 3, 4,
    "Py", "Python", "19.7DB", 4, 4,
    "Js", "JavaScript", "20.50C", 5, 4,
    "J", "Java", "21.7D9", 6, 4,
    "J2", "J2EE", "22.7D9", 7, 4,
    "Sq", "SQL", "23.7DD", 3, 5,
    "O", "Oracle", "24.7D9", 1, 5,
    "Mw", "Middleware", "25.7D8", 4, 5,
    "Wh", "WebHosting", "26.7DA", 5, 5,
    "Pf", "PerfTuning", "27.7DA", 6, 5,
    "Ux", "UserExperience", "28.7DA", 7, 5,
 //   "Dg", "Design", "29.7D9", 8, 5,
    "Wf", "Wife", "30.1B588", 1, 6,
    "Dg", "Daughter", "31.7D8", 2, 6,
    "Ct", "Eva", "32.A82EBF", 3, 6,
    "Gt", "Guitar", "33.7C7", 4, 6,
    "Ex", "Exercise", "34.7D2", 5, 6,
    "Bk", "Biking", "35.7E0", 6, 6,
    "Rt", "RetroGames", "36.7C5", 7, 6,
    "Mc", "<a href='https://open.spotify.com/user/jmiller36' target='_blank'>Music</a>", "37.7C2", 1, 7,
    "Vl", "<a href='https://www.discogs.com/user/stuckthread/collection' target='_blank'>Vinyl</a>", "38.7E0", 2, 7,
    "Sc", "Social", "39.00001", 7, 7,
];

var camera, scene, renderer;
var controls;

var objects = [];
var targets = { table: [], sphere: [], helix: [], grid: [] };

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 2000;
    //camera.position.x = 0;
    //camera.position.y = -1100;

    scene = new THREE.Scene();

    // table

    for (var i = 0; i < table.length; i += 5) {

        var element = document.createElement('div');
        element.className = 'element';
        element.style.backgroundColor = 'rgba(0,127,127,' + (Math.random() * 0.5 + 0.25) + ')';

        var number = document.createElement('div');
        number.className = 'number';
        number.textContent = i + 1;
        element.appendChild(number);

        var symbol = document.createElement('div');
        symbol.className = 'symbol';
        symbol.textContent = table[i];
        element.appendChild(symbol);

        var details = document.createElement('div');
        details.className = 'details';
        details.innerHTML = table[i + 1] + '<br>' + table[i + 2];
        element.appendChild(details);

        var object = new THREE.CSS3DObject(element);
        //var object = new THREE.Object3D();
        object.position.x = Math.random() * 4000 - 2000;
        object.position.y = Math.random() * 4000 - 2000;
        object.position.z = Math.random() * 4000 - 2000;
        scene.add(object);

        objects.push(object);

        //

        var object = new THREE.Object3D();
        object.position.x = (table[i + 3] * 140) - 1330 / 2;
        //object.position.y = - ( table[ i + 4 ] * 180 ) + 990/3;
        object.position.y = - (table[i + 4] * 180) + 800;

        targets.table.push(object);

    }

    // sphere

    var vector = new THREE.Vector3();

    for (var i = 0, l = objects.length; i < l; i++) {

        var phi = Math.acos(-1 + (2 * i) / l);
        var theta = Math.sqrt(l * Math.PI) * phi;

        var object = new THREE.Object3D();

        object.position.x = 800 * Math.cos(theta) * Math.sin(phi);
        object.position.y = 800 * Math.sin(theta) * Math.sin(phi);
        object.position.z = 800 * Math.cos(phi);

        vector.copy(object.position).multiplyScalar(2);

        object.lookAt(vector);

        targets.sphere.push(object);

    }

    // helix

    var vector = new THREE.Vector3();

    for (var i = 0, l = objects.length; i < l; i++) {

        var phi = i * 0.175 + Math.PI;

        var object = new THREE.Object3D();

        object.position.x = 900 * Math.sin(phi);
        object.position.y = - (i * 8) + 450;
        object.position.z = 900 * Math.cos(phi);

        vector.x = object.position.x * 2;
        vector.y = object.position.y;
        vector.z = object.position.z * 2;

        object.lookAt(vector);

        targets.helix.push(object);

    }

    // grid

    for (var i = 0; i < objects.length; i++) {

        var object = new THREE.Object3D();

        object.position.x = ((i % 5) * 400) - 800;
        object.position.y = (- (Math.floor(i / 5) % 5) * 400) + 800;
        object.position.z = (Math.floor(i / 25)) * 1000 - 2000;

        targets.grid.push(object);

    }

    //

    renderer = new THREE.CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'absolute';
    document.getElementById('container').appendChild(renderer.domElement);

    //

    controls = new THREE.TrackballControls(camera, renderer.domElement);
    controls.rotateSpeed = 0.1;
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.rotateSpeed = 1.0 / 2;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.3;

    controls.noRotate = false;
    controls.noZoom = false;
    controls.noPan = false;
    controls.noRoll = true;
    controls.dynamicDampingFactor = .5;
    controls.staticMoving = false;

    controls.addEventListener('change', render);

    //controls = new THREE.FirstPersonControls( camera ,renderer.domElement);
    //controls.movementSpeed = 25;
    //controls.lookSpeed = 0.05;
    //controls.lookVertical = true;
    //controls.lon = -90;
    //controls.addEventListener( 'change', render );

    var button = document.getElementById('table');
    button.addEventListener('click', function (event) {

        transform(targets.table, 1000);
        //camera.position.z = 20000;
        //camera.position.x = 0;
        //camera.position.y = 0;
        ////camera.position.set(0,0,0)
        //targets.table.y=0;
        //targets.table.x=0;
        //targets.table.z=0;
        ////targets.rotation.set(0,0,0)
        //console.log(targets.table.x,targets.table.y,targets.table.z,targets.table.rotation)
        //camera.fov=40;
        controls.reset();

    }, false);

    var button = document.getElementById('sphere');
    button.addEventListener('click', function (event) {

        transform(targets.sphere, 1000);

    }, false);

    var button = document.getElementById('helix');
    button.addEventListener('click', function (event) {

        transform(targets.helix, 1000);

    }, false);

    var button = document.getElementById('grid');
    button.addEventListener('click', function (event) {

        transform(targets.grid, 750);

    }, false);

    transform(targets.table, 1500);

    //

    window.addEventListener('resize', onWindowResize, false);

}

function transform(targets, duration) {

    TWEEN.removeAll();

    for (var i = 0; i < objects.length; i++) {

        var object = objects[i];
        var target = targets[i];

        new TWEEN.Tween(object.position)
            .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

        new TWEEN.Tween(object.rotation)
            .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
            .easing(TWEEN.Easing.Exponential.InOut)
            .start();

    }

    new TWEEN.Tween(this)
        .to({}, duration * 2)
        .onUpdate(render)
        .start();

}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

    render();

}

function animate() {

    requestAnimationFrame(animate);

    TWEEN.update();

    controls.update();

}

function render() {

    renderer.render(scene, camera);

}

