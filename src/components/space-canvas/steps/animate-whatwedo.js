import Anime from 'animejs';

const animateWhatWeDo = (app, k) => {

  const min_k_dist = 0.1;

  let item = app.what_we_do.find(n => k < n.k);
  let index = app.what_we_do.findIndex(n => k < n.k);

  if(k > app.what_we_do[app.what_we_do.length - 1].k) {
    index = app.what_we_do.length - 1;
    item = app.what_we_do[app.what_we_do.length - 1];
  }

  app.what_we_do.forEach((n, i) => {
    
    // n.item._base_rotator._plate.pos
    // n.item.position.set(0, 0, -90 * Math.rad);
    // n.item._text.material.opacity = 1;

    if(i > 0) {
      const pos = (i * 50) * Math.E;
      n.item._base_rotator.position.x = k.map(0, n.k, pos, 0);
    }

    if(i > index) {
      n.item._text.position.y = 0;
      n.item._plate.position.y = 0;
      // n.item._plate.rotation.x = 0;
    }

    if(index !== i) {
      
      const plate = n.item._plate;
      if(plate._is_popped) {
        plate.traverse(n => {
          if(n.isMesh) {
            if(n._anim) {
              n._anim.remove(n.material)
            }
            n._anim = Anime({
              targets: n.material,
              opacity: 0,
              duration: 500,
              easing: 'easeOutQuad',
            })
          }
        })
  
        plate._is_popped = false;
      }
    }
  })

  if(!item) {
    
  } else {
    const from_k = item.k - min_k_dist;
    const local_k = k.map(from_k, item.k, 0, 1);

    if(local_k > 0) {
      item.item._text.position.y = local_k.map(0, 1, 0, 50);
      item.item._plate.position.y = local_k.map(0, 1, 0, -50);
    } else {
      item.item._text.position.y = 0;
      item.item._plate.position.y = 0;
    }

    if(local_k > -1) {
      item.item._plate.rotation.x = local_k.map(0, 1, 0, -20 * Math.rad);
    } else {
      item.item._plate.rotation.x = 20 * Math.rad
    }
    

    if(local_k > 0.7) {
      const plate = item.item._plate;
      if(plate._is_popped) {

        plate.traverse(n => {
          if(n.isMesh) {
            if(n._anim) {
              n._anim.remove(n.material)
            }
            n._anim = Anime({
              targets: n.material,
              opacity: 0,
              duration: 500,
              easing: 'easeOutQuad',
            })
          }
        })
  
        plate._is_popped = false;
      }
    } else {
      const plate = item.item._plate;
      if(!plate._is_popped) {
  
        plate.traverse(n => {
          if(n.isMesh) {
            if(n._anim) {
              n._anim.remove(n.material)
            }
            n._anim = Anime({
              targets: n.material,
              opacity: 1,
              duration: 500,
              easing: 'easeInQuad',
            })
          }
        })
  
        plate._is_popped = true;
      }
    }
  }
}

const toggleAllWhatWeDo = (app, flag) => {

  if(!flag) {
    if(!app.what_we_do_is_popped) {
      app.what_we_do.forEach((n, i) => {
        if(!n._is_popped) {
        
          if(n._anim) {
            n._anim.remove(n.item._rotator.position)
          }
          n._anim = Anime({
            targets: n.item._rotator.position,
            x: 500,
            duration: 500,
            easing: 'easeInQuad',
          })
          
          n._is_popped = true;
        }
      })
      app.what_we_do_is_popped = true;
    }
  } else {
    if(app.what_we_do_is_popped) {
      app.what_we_do.forEach((n, i) => {
        if(n._is_popped) {
        
          if(n._anim) {
            n._anim.remove(n.item._rotator.position)
          }
          n._anim = Anime({
            targets: n.item._rotator.position,
            x: 0,
            duration: 500,
            delay: i * 200,
            easing: 'easeOutQuad',
          })
          
          n._is_popped = false;
        }
      })
      app.what_we_do_is_popped = false;
    }
  }
  
  
}

export { toggleAllWhatWeDo, animateWhatWeDo }