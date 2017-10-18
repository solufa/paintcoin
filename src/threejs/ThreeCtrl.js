const THREE = require('three');
const OrbitControls = require('three-orbitcontrols');

export default class {
  constructor(container, imageData, radius) {
    this.container = container;
    this.imageData = imageData;
    this.radius = radius;

    this.renderer = null;
    this.scene = null;
    this.camera = null;
    this.cameraCtrl = null;
    this.reqID = null;

    this.init();
  }

  init() {
    this.initRenderer();
    this.initScene();
    this.initCamera();
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer();
    this.container.appendChild(this.renderer.domElement);

    this.resize = () => {
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    };
    window.addEventListener('resize', this.resize, false);
    this.resize();
    this.reqID = requestAnimationFrame(this.render.bind(this));
  }

  initScene() {
    const scene = new THREE.Scene();
    this.scene = scene;

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
  }

  initCamera() {
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    camera.position.z = 3;
    camera.lookAt(new THREE.Vector3());

    const controls = new OrbitControls(camera, this.renderer.domElement);

    this.camera = camera;
    this.cameraCtrl = controls;
  }

  render() {
    this.renderer.render(this.scene, this.camera);
    this.reqID = requestAnimationFrame(this.render.bind(this));
  }

  destroy() {
    window.removeEventListener('resize', this.resize, false);
    cancelAnimationFrame(this.reqID);
  }
}
