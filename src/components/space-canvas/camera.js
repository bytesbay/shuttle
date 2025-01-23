import * as THREE from 'three';

const initCamera = app => {

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  const onDestroy = () => {
    window.removeEventListener('resize', onResize)
  }

  const camera = new THREE.PerspectiveCamera(
    !app.$is_mobile ? 50 : 65, 
    window.innerWidth / window.innerHeight, 
    0.1, 
    15000
  );
  camera.rotation.z = -90 * Math.rad;

  const jak = new THREE.Group();
  const rot_wrapper = new THREE.Group();
  const parallax_wrapper = new THREE.Group();

  jak.position.copy(
    (new THREE.Vector3())
      .setFromSphericalCoords(1010, 90, 90)
  )

  jak.add(rot_wrapper);
  rot_wrapper.add(parallax_wrapper);
  parallax_wrapper.add(camera);

  camera.jak = jak;
  camera.rot_wrapper = rot_wrapper;
  camera.parallax_wrapper = parallax_wrapper;
  camera._trans = {};
  
  camera.setPos = function(dist, pos, rot_az, rot_ze, rot_z, smooth_k) {
    this._trans.dist = dist;
    this._trans.jak = pos;
    this._trans.rot_az = rot_az;
    this._trans.rot_ze = rot_ze;
    this._trans.rot_z = rot_z;
    this._trans.smooth_k = smooth_k;
  }

  // const light = new THREE.PointLight(0xffffff, 1, 5);
  // camera.add(light);

  window.addEventListener('resize', onResize)
  app.camera = camera;
  app.scene.add(jak);
  app.on_destroy.push(onDestroy);

  
  app.on_render.push(() => {
    // this.current_scroll += (this.getScroll() - this.current_scroll) * 0.05;

    const sk = camera._trans.smooth_k;

    camera.position.z += (camera._trans.dist - camera.position.z) * sk;
    camera.rot_wrapper.rotation.z += (camera._trans.rot_z - camera.rot_wrapper.rotation.z) * sk;
    jak.rotation.z += (camera._trans.rot_az - jak.rotation.z) * sk;
    jak.rotation.y += (camera._trans.rot_ze - jak.rotation.y) * sk;
    jak.position.x += (camera._trans.jak.x - jak.position.x) * sk;
    jak.position.y += (camera._trans.jak.y - jak.position.y) * sk;
    jak.position.z += (camera._trans.jak.z - jak.position.z) * sk;
  })
}

export { initCamera }