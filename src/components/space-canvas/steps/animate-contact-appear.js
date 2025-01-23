import Anime from 'animejs';

export const animateContactAppear = (app, k) => {

  const contact_us = app.contact_us

  if(k > 0.9) {
    if(!contact_us._popped) {
      contact_us.traverse(n => {
        if(n.isMesh) {
          if(n._anim) {
            n._anim.remove(n.material)
          }

          n._anim = Anime({
            targets: n.material,
            opacity: 1,
            duration: 500,
            easing: 'spring(1, 80, 10, 0)',
          })
        }
      })
      
      contact_us._anim = Anime({
        targets: contact_us.scale,
        x: 1,
        y: 1,
        z: 1,
        duration: 500,
        easing: 'spring(1, 80, 10, 0)',
      })
      
      contact_us._popped = true
    }
  } else {
    if(contact_us._popped) {
      
      contact_us.traverse(n => {
        if(n.isMesh) {
          if(n._anim) {
            n._anim.remove(n.material)
          }

          n._anim = Anime({
            targets: n.material,
            opacity: 0,
            duration: 500,
            easing: 'spring(1, 80, 10, 0)',
          })
        }
      })
      
      contact_us._anim = Anime({
        targets: contact_us.scale,
        x: 0.8,
        y: 0.8,
        z: 0.8,
        duration: 500,
        easing: 'spring(1, 80, 10, 0)',
      })

      contact_us._popped = false
    }
  }
}