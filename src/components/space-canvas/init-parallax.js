const initParallax = app => {

  const destroyParallax = () => {
    // gyro.stop()
    // gyro.removeEventListener('reading', onGyroMove);
    window.removeEventListener('mousemove', onMouseMove);
  }
  
  const onMouseMove = e => {
    const div = 2000;
    app.mouse_deviation = {
      az: (((window.innerHeight / 2) - e.clientY) / div),
      ze: (((window.innerWidth / 2) - e.clientX) / div),
    };
  }

  // const onGyroMove = function(e) {
  //   console.log(e);
  // }
  if(!app.$is_mobile) {
    window.addEventListener('mousemove', onMouseMove, true);
  }
  app.mouse_deviation = {
    az: 0,
    ze: 0,
  };
  app.base_mouse_deviation = {
    az: 0,
    ze: 0,
  };
  // window.addEventListener('deviceorientation', onGyroMove);

  app.on_render.push(() => {
    app.camera.parallax_wrapper.rotation.y += 
      ((-app.mouse_deviation.az + -app.base_mouse_deviation.az) - app.camera.parallax_wrapper.rotation.y) * 0.1;
    app.camera.parallax_wrapper.rotation.x += 
      ((app.mouse_deviation.ze + -app.base_mouse_deviation.ze) - app.camera.parallax_wrapper.rotation.x) * 0.1;
  })
  
  app.on_destroy.push(destroyParallax);
}

export { initParallax }