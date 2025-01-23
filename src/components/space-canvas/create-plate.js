import * as THREE from 'three';

export const genPlate = (width, height, radius, mat_opts = {}) => {

  const wrapper = new THREE.Group();

  const shape = new THREE.Shape();
  shape.moveTo( 0, radius );
  shape.lineTo( 0, height - radius );
  shape.quadraticCurveTo( 0, height, radius, height );
  shape.lineTo( width - radius, height) ;
  shape.quadraticCurveTo( width, height, width, height - radius );
  shape.lineTo( width, radius );
  shape.quadraticCurveTo( width, 0, width - radius, 0 );
  shape.lineTo( radius, 0 );
  shape.quadraticCurveTo( 0, 0, 0, radius );
  const mesh = new THREE.Mesh(
    new THREE.ShapeGeometry(shape),
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      ...mat_opts,
    })
  );
  mesh.position.x = -width/2;
  mesh.position.y = -height/2;
  wrapper.add(mesh);
  wrapper._model = mesh;

  return wrapper;
}