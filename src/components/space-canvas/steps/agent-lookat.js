import * as THREE from 'three';

export const agentLookAt = (app) => {
  app.agent.lookAt(
    (new THREE.Vector3())
      .setFromSphericalCoords(170, 90 * Math.rad, 115 * Math.rad)
      .add(app.moon_object.position)
  )
}