import Anime from 'animejs';

const toggleContactUs = (app, flag) => {

  const item = app.contact_us;

  if(flag) {
    if(!item._popped) {
      console.log('SHOW');
      item.visible = true;
      if(item._anim) {
        item._anim.remove(item.scale)
      }
      item._anim = Anime({
        targets: item.scale,
        x: 1,
        y: 1,
        z: 1,
        duration: 200,
        easing: 'easeOutQuad',
      })
      item._popped = true;
    }
  } else {
    if(item._popped) {
      console.log('HIDE');
      if(item._anim) {
        item._anim.remove(item.scale)
      }
      item._anim = Anime({
        targets: item.scale,
        x: 0,
        y: 0,
        z: 0,
        duration: 200,
        easing: 'easeInQuad',
        completed() {
          item.visible = false;
        }
      })
      item._popped = false;
    }
  }
}


const animateContactUs = (app, k) => {

  if(k > 0.98) {
    toggleContactUs(app, true)
  } else {
    toggleContactUs(app, false)
  }
}

export { toggleContactUs, animateContactUs }