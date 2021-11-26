// Put your application javascript here
//menu
window.onload = function(){
  const breakpoint = 769;
  const elm =  document.querySelector( ".js-menu" );
  let resizedWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  window.addEventListener( "resize", () => {
    let resizedWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    console.log( resizedWidth );
    if( resizedWidth > breakpoint ) {
      document.querySelector( ".js-menu__sub" ).style.display = "none";
      elm.addEventListener(
        "mouseover",
        () => {
          document.querySelector( ".js-menu__sub" ).style.display = "block";
        },
        false
      );
      elm.addEventListener(
        "mouseout",
        () => {
          document.querySelector( ".js-menu__sub" ).style.display = "none";
        },
        false
      )
    } else {
      document.querySelector( ".js-menu__sub" ).style.display = "block";
    }
  } );
};
