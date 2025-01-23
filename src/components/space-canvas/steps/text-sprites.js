import Anime from 'animejs';

export const animateSpritesText = (app, k) => {

  const text = app.technologies_text.text

  if(k > 0.3 && k < 0.9) {
    if(!text._popped) {
      if(text._anims) {
        text._anims.scale.remove(text.scale)
        text._anims.opacity.remove(text.material)
      }
      text._anims = {
        scale: Anime({
          targets: text.scale,
          x: 1,
          y: 1,
          z: 1,
          duration: 500,
          easing: 'spring(1, 80, 10, 0)',
        }),
        opacity: Anime({
          targets: text.material,
          opacity: 1,
          duration: 500,
          easing: 'spring(1, 80, 10, 0)',
        }),
      }
      text._popped = true
    }
  } else {
    if(text._popped) {
      if(text._anims) {
        text._anims.scale.remove(text.scale)
        text._anims.opacity.remove(text.material)
      }
      text._anims = {
        scale: Anime({
          targets: text.scale,
          x: 0.8,
          y: 0.8,
          z: 0.8,
          duration: 500,
          easing: 'cubicBezier(.5, .05, .1, .3)',
        }),
        opacity: Anime({
          targets: text.material,
          opacity: 0,
          duration: 500,
          easing: 'cubicBezier(.5, .05, .1, .3)',
        }),
      };
      text._popped = false
    }
  }

  text.position.x = k.map(0, 1, 30, -30);
}