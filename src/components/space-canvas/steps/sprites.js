import Anime from 'animejs';

export const animateSprites = (app, k) => {

  const rots = [
    k.map(0, 1, -5 * Math.rad, -10 * Math.rad),
    k.map(0, 1, -15 * Math.rad, -5 * Math.rad),
    k.map(0, 1, 0 * Math.rad, -7 * Math.rad)
  ];

  app.technologies.children.forEach((n, i) => {
    n.rotation.y = rots[i];

    if(k > 0.3 && k < 0.95) {
      if(!n._popped) {
        const anims = [];
        n.children.forEach((n, j) => {
          if(n._anim) {
            n._anim.remove(n.scale)
          }
          n._anim = Anime({
            targets: n.scale,
            x: 1,
            y: 1,
            z: 1,
            duration: 100,
            delay: j * 100,
            easing: 'spring(1, 80, 10, 0)',
          })
        });
        n._anims = anims
        n._popped = true
      }
    } else {
      if(n._popped) {
        const anims = [];
        n.children.forEach((n, j) => {
          if(n._anim) {
            n._anim.remove(n.scale)
          }
          n._anim = Anime({
            targets: n.scale,
            x: 0,
            y: 0,
            z: 0,
            delay: j * 100,
            duration: 200,
            easing: 'cubicBezier(.5, .05, .1, .3)',
          });
        });
        n._popped = false
      }
    }
  })
}