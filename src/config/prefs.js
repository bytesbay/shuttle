import BezierEasing from 'bezier-easing';
import * as THREE from 'three';

Math.UUID = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


Number.prototype.map = function(in_min, in_max, out_min, out_max) {
  return ((this - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};

Number.prototype.fmap = function(out_min, out_max) {
  return ((this - 0) * (out_max - out_min)) / (1 - 0) + out_min;
};

Math.easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

Math.rad = Math.PI / 180;


Math.calcElong = function (k, k_of_elongation, range_min, range_max) {
  if(k_of_elongation) {
    const ease_k = 0.5 * k_of_elongation;
    const ease = BezierEasing(0.5 + ease_k, 0.5 - ease_k, 0.5 + ease_k, 0.5 - ease_k)
    return ease(k).map(0, 1, range_min, range_max);
  } else {
    return k.map(0, 1, range_min, range_max)
  }
}


function moveFromToDirect(params) {

  let { k, vec, from, to, lookAt, ease } = params;

  if(!ease) {
    ease = {};
  }

  const applyVector = (k) => {
    return [
      ease.x ? ease.x(k).map(0, 1, from.x, to.x) : k.map(0, 1, from.x, to.x),
      ease.y ? ease.y(k).map(0, 1, from.y, to.y) : k.map(0, 1, from.y, to.y),
      ease.z ? ease.z(k).map(0, 1, from.z, to.z) : k.map(0, 1, from.z, to.z),
    ];
  }

  vec.set(...applyVector(k));

  if(lookAt) {
    // const next_k = k + (k * 0.005);
    const next_k = 1;
    lookAt.lookAt(
      new THREE.Vector3(...applyVector(next_k))
    );
  }
}

window.moveFromToDirect = moveFromToDirect;


window.doScrolling = function(el, elementY, duration) { 
  var startingY = el.scrollTop;
  var diff = elementY - startingY;
  var start;
  const ease = BezierEasing(0,0,.58,1);

  // Bootstrap our animation - it will get called right before next frame shall be rendered.
  window.requestAnimationFrame(function step(timestamp) {
    if (!start) start = timestamp;
    // Elapsed milliseconds since start of scrolling.
    var time = timestamp - start;
    // Get percent of completion in range [0, 1].
    var percent = ease(Math.min(time / duration, 1));

    el.scrollTo(0, startingY + diff * percent);

    // Proceed with animation as long as we wanted it to.
    if (time < duration) {
      window.requestAnimationFrame(step);
    }
  })
}