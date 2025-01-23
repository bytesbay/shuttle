import * as THREE from 'three';
import BezierEasing from 'bezier-easing';

const onOrbitProcess = function(k, diapason) {
  const vec = (new THREE.Vector3())
    .setFromSphericalCoords(
      k.map(0, 1, diapason.from.range, diapason.to.range),
      k.map(0, 1, diapason.from.ze, diapason.to.ze),
      k.map(0, 1, diapason.from.az, diapason.to.az),
    )
    .add(diapason.around)

  return vec;
}

const initDiapasons = app => {

  const diapasons = [];

  diapasons.push({
    step: 'main',
    onProcess(k, diapason) {
      const vec = new THREE.Vector3();
      moveFromToDirect({
        vec,
        k,
        from: (new THREE.Vector3())
          .setFromSphericalCoords(1600, 90 * Math.rad, 70 * Math.rad),
        to: (new THREE.Vector3())
          .setFromSphericalCoords(170, 90 * Math.rad, 115 * Math.rad)
          .add(app.moon_object.position),
        ease: {
          // x: BezierEasing(.61,.36,.61,.36),
        }
      });
      return vec;
    },
    from: (new THREE.Vector3())
      .setFromSphericalCoords(1600, 90 * Math.rad, 143 * Math.rad),
    to: (new THREE.Vector3())
      .setFromSphericalCoords(170, 90 * Math.rad, 143 * Math.rad)
      .add(app.moon_object.position),
  });

  diapasons.push({
    around: app.moon_object.position,
    step: 'orbit',
    onProcess: onOrbitProcess,
    from: {
      range: 200, 
      ze: 90 * Math.rad, 
      az: 143 * Math.rad,
    },
    to: {
      range: 200, 
      ze: 90 * Math.rad, 
      az: 160 * Math.rad,
    }
  });

  return diapasons;

}

/**
 * 
 * @param {*} app 
 * @param {array} attach_items 
 */
const initTracer = (app, attach_items = []) => {

  const diapasons = initDiapasons(app);

  const increment_step = 0.1;

  // const points = [];
  // for (const i in diapasons) {
  //   const diapason = diapasons[i];

  //   for (let j = 0; j < 1; j += increment_step) {
  //     points.push(
  //       diapason.onProcess(j, diapason)
  //     );
  //   }
  // }

  attach_items.forEach(n => {

    app.scene.add(n.item);

    const diapason = diapasons.find(z => z.step === n.step);

    const vec = diapason.onProcess(n.k, diapason)

    n.item.position.copy(vec);

    const prev_k = n.k - increment_step;
    const prev_vec = diapason.onProcess(prev_k, diapason)

    n.item.lookAt(prev_vec);
  })

  // const line = new THREE.Line(
  //   new THREE.BufferGeometry().setFromPoints(points),
  //   new THREE.LineBasicMaterial({
  //     color: 0xFF2A75,
  //     linewidth: 10,
  //     linecap: 'round',
  //     linejoin:  'round'
  //   }),
  // );

  // app.scene.add(line);

  // app.on_render.push(() => {
    
  // })
}

export { initTracer }