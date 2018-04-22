$(document).ready(function(){
  $('.button-collapse').sideNav({
	      menuWidth: 240, // Default is 240
	      edge: 'left', // Choose the horizontal origin
	      closeOnClick: false // Closes side-nav on <a> clicks, useful for Angular/Meteor
	    }
	  ); 
	$(".dropdown-button").dropdown();
	$('.tooltipped').tooltip({delay: 10});
	$('select').material_select();
	$('.modal-trigger').leanModal();
  
	var is_pc = false;

  if( $('#ispc').css('display')=='none') {
      is_pc = true;
  }
  if (is_pc == true) {
  	//$('#tabPedido').children().addClass('popout');
  }

  setAcordion(false);

  $('.showDetail').on('click',function(){
    setAcordion(true);
  });

  function setAcordion(val){
    /*$('.collapsible').collapsible({
        accordion : val // A setting that changes the collapsible behavior to expandable instead of the default accordion style
      });*/
  }
  $('.parallax').parallax();

  $(".card-reveal").css({
  "display":"block" ,
  "transform": "translateY(-100%)"});

  $(".playYoutube").on('click',function(){
    var span=this.getAttribute('data-idnote');
    if($("#"+span)[0].src=="about:blank"){
      $("#"+span)[0].src =this.getAttribute('data-youtube');
    }
/*
    var span=this.getAttribute('data-idnote');
    if($("#"+span)[0].src.indexOf("autoplay")==-1)
    {
      $("#"+span)[0].src += "&autoplay=1";
    }*/
});
  



});

function loadPage(index){
    localStorage.setItem('_index', index);
    window.location = './view/zamponia.html';      
};
function loadPagefromView(index){
    localStorage.setItem('_index', index);
    window.location = './zamponia.html';      
};

function setSRC(e){
  val=prompt("link imagen")
  if(val){
    $(e).attr("src",val);
    localStorage.setItem('_foto', val);
  }
};

function setCancion(e){
  val=prompt("ingrese el nombre de la canción")
  if(val){    
    $(e).text(val);
    localStorage.setItem('_cancion', val);
  }
};

function setArtista(e){
  val=prompt("ingrese el nombre del artista")
  if(val){
    $(e).text(val);
    localStorage.setItem('_artista', val);
  }
};
