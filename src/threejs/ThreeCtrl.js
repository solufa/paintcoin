require('canvas-toBlob');
const THREE = require('three');
const OrbitControls = require('three-orbitcontrols');

const RADIUS = 1;
const SEGMENTS = 128;
const THICKNESS = RADIUS / 5;

function formatImageData(imageData) {
  const data = new Uint8Array(imageData.data.buffer);
  for (let i = 0; i < imageData.width ** 2; i += 1) {
    if (data[(i * 4) + 3] === 255) data[(i * 4) + 3] = data[i * 4] === 0 ? 120 : 0;
  }
  return data;
}

export default class {
  constructor(container, imageData) {
    this.container = container;
    this.imageData = imageData;

    this.renderer = null;
    this.scene = null;
    this.material = null;
    this.camera = null;
    this.cameraCtrl = null;
    this.reqID = null;

    this.initRenderer();
    this.initScene();
    this.initMaterial();
    this.initCoinRing();
    this.initCoinPattern();
    this.initLight();
    this.initCamera();

    this.resize = () => {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    };
    window.addEventListener('resize', this.resize, false);
    this.resize();
  }

  initRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      preserveDrawingBuffer: true, antialias: true, alpha: true,
    });
    this.container.appendChild(this.renderer.domElement);
    this.renderer.setClearColor(0xffffff, 0);
    this.play();
  }

  initScene() {
    this.scene = new THREE.Scene();
    // this.scene.add(new THREE.AxisHelper(RADIUS * 3));
  }

  initMaterial() {
    const loader = new THREE.CubeTextureLoader();
    loader.setPath('./envMap/');
    const textureCube = loader.load([
      'posx.jpg',
      'negx.jpg',
      'posy.jpg',
      'negy.jpg',
      'posz.jpg',
      'negz.jpg',
    ]);
    textureCube.minFilter = THREE.LinearFilter;

    this.material = new THREE.MeshStandardMaterial({
      roughness: 0.8,
      metalness: 1,
      color: 16761685,
      envMap: textureCube,
    });
  }

  initCoinRing() {
    const scene = this.scene;

    const ringGeometry = new THREE.RingBufferGeometry(
      RADIUS,
      RADIUS + (THICKNESS / 2),
      SEGMENTS,
      1,
    );

    const frontRing = new THREE.Mesh(ringGeometry, this.material);
    frontRing.position.z = THICKNESS / 2;
    scene.add(frontRing);

    const backRing = frontRing.clone();
    backRing.position.z = -THICKNESS / 2;
    backRing.rotateY(Math.PI);
    scene.add(backRing);

    const outerCylinderGeometry = new THREE.CylinderBufferGeometry(
      RADIUS + (THICKNESS / 2),
      RADIUS + (THICKNESS / 2),
      THICKNESS,
      SEGMENTS,
      1,
      true,
    );

    const outerCylinder = new THREE.Mesh(outerCylinderGeometry, this.material);
    outerCylinder.rotateX(Math.PI / 2);
    scene.add(outerCylinder);

    const innerCylinderGeometry = new THREE.CylinderBufferGeometry(
      RADIUS,
      RADIUS,
      THICKNESS,
      SEGMENTS,
      1,
      true,
    );

    const innerCylinder = new THREE.Mesh(innerCylinderGeometry, this.material);
    innerCylinder.scale.x = -1;
    innerCylinder.rotateX(Math.PI / 2);
    scene.add(innerCylinder);
  }

  initCoinPattern() {
    const scene = this.scene;

    const texture = new THREE.DataTexture(formatImageData(this.imageData),
      this.imageData.width, this.imageData.height, THREE.RGBAFormat, THREE.UnsignedByteType);
    texture.needsUpdate = true;
    texture.flipY = true;

    const circleGeometry = new THREE.CircleBufferGeometry(RADIUS + (THICKNESS / 4), SEGMENTS);

    const circleMaterial = this.material.clone();
    Object.assign(circleMaterial, {
      bumpMap: texture,
      bumpScale: 0.05,
    });

    const front0 = new THREE.Mesh(circleGeometry, circleMaterial);
    front0.position.z = THICKNESS / 4;
    scene.add(front0);

    const back0 = front0.clone();
    back0.position.z = -THICKNESS / 4;
    back0.rotateY(Math.PI);
    scene.add(back0);

    const geometry = new THREE.PlaneBufferGeometry((RADIUS * 2) + (THICKNESS / 2),
      (RADIUS * 2) + (THICKNESS / 2),
      this.imageData.width, this.imageData.height);

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      blending: THREE.NormalBlending,
      transparent: true,
    });

    const front = new THREE.Mesh(geometry, material);
    front.position.z = (THICKNESS / 4) + 0.001;
    scene.add(front);

    const back = front.clone();
    back.position.z = -(THICKNESS / 4) - 0.001;
    back.rotateY(Math.PI);
    scene.add(back);
  }

  initLight() {
    const frontLight = new THREE.DirectionalLight(0xffffff, 1.25);
    frontLight.position.set(0, 0.5, 2);
    this.scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 1.25);
    backLight.position.set(0, 0.5, -2);
    this.scene.add(backLight);
  }

  initCamera() {
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 1000);
    camera.position.z = RADIUS * 5;

    const controls = new OrbitControls(camera, this.renderer.domElement);
    controls.autoRotate = true;
    controls.minDistance = RADIUS * 1.3;

    this.camera = camera;
    this.cameraCtrl = controls;
  }

  render() {
    this.cameraCtrl.update();
    this.renderer.render(this.scene, this.camera);
    this.play();
  }

  destroy() {
    window.removeEventListener('resize', this.resize, false);
    this.pause();
    this.renderer.dispose();
  }

  play() {
    this.reqID = requestAnimationFrame(this.render.bind(this));
  }

  pause() {
    cancelAnimationFrame(this.reqID);
  }

  resize4Save() {
    this.camera.aspect = 1;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.imageData.width, this.imageData.height);
  }

  getPngBlob(callback) {
    this.resize4Save();
    this.pause();
    this.cameraCtrl.saveState();
    this.cameraCtrl.enabled = false;
    this.camera.position.set(0, 0, RADIUS * 3.2);
    this.camera.lookAt(this.cameraCtrl.target);
    this.renderer.render(this.scene, this.camera);

    setTimeout(() => { // for low spec devices
      this.renderer.domElement.toBlob((blob) => {
        callback(blob);
        this.cameraCtrl.reset();
        this.cameraCtrl.enabled = true;
        this.resize();
        this.play();
      });
    });
  }

  getGifBlob(callback) {
    this.resize4Save();

    /* global GIF */
    const gif = new GIF({
      workers: 4,
      quality: 10,
      workerScript: './libs/gif.worker.js',
      width: this.imageData.width,
      height: this.imageData.height,
      transparent: 0,
    });

    gif.on('finished', (blob) => {
      callback(blob);
      this.cameraCtrl.reset();
      this.resize();
      this.cameraCtrl.enabled = true;
      this.play();
    });

    this.cameraCtrl.saveState();
    this.cameraCtrl.enabled = false;
    this.pause();

    const frame = 20;
    const duration = 2;
    let index = 0;
    const addFrame = () => {
      if (index === frame) gif.render();
      else {
        this.camera.position.set(
          Math.cos(((index * Math.PI) / frame) - (Math.PI / 2)) * RADIUS * 3.4,
          0,
          Math.sin(((index * Math.PI) / frame) - (Math.PI / 2)) * RADIUS * 3.4,
        );
        this.camera.lookAt(this.cameraCtrl.target);
        this.renderer.render(this.scene, this.camera);

        setTimeout(() => { // for low spec devices
          index += 1;
          gif.addFrame(this.renderer.domElement, { delay: (duration * 1000) / frame, copy: true });
          addFrame();
        });
      }
    };

    addFrame();
  }
}
