// Put your application javascript here
//menu
window.onload = function(){
  const breakpoint = 769;
  const elm =  document.querySelector( ".js-menu" );
  let resizedWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  window.addEventListener( "load",   event( breakpoint ) );
  window.addEventListener( "resize", event( breakpoint ) );
  function event( breakpoint ) {
    let resizedWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    if ( window.matchMedia( "(min-width: 769px)" ).matches ) {
    // if( resizedWidth >= breakpoint ) {
      console.log( "true" );
      document.querySelector( ".js-menu__sub" ).classList.remove( "is-active" );
      elm.addEventListener(
        "mouseover",
        () => {
          document.querySelector( ".js-menu__sub" ).classList.add( "is-active" );
        },
        false
      );
      elm.addEventListener(
        "mouseout",
        () => {
          document.querySelector( ".js-menu__sub" ).classList.remove( "is-active" );
        },
        false
      );
    } else {
      console.log( "false" );
    }
  }
};
