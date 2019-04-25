
(function($) {
  "use strict"; // Start of use strict
  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 57)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });
  // Closes responsive menu when a scroll trigger link is clicked
  $('.js-scroll-trigger').click(function() {
    $('.navbar-collapse').collapse('hide');
  });
  // Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 57
  });
  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
  // Scroll reveal calls
  window.sr = ScrollReveal();
  sr.reveal('.sr-icons', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 200);
  sr.reveal('.sr-button', {
    duration: 1000,
    delay: 200
  });
  sr.reveal('.sr-contact', {
    duration: 600,
    scale: 0.3,
    distance: '0px'
  }, 300);
  // Magnific popup calls
  $('.popup-gallery').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });
})(jQuery); // End of use strict
var walidacja=true;
function sprawdzPole(pole_id,obiektRegex) {
  var obiektPole = document.getElementById(pole_id);
  if(!obiektRegex.test(obiektPole.value)) return (false);
  else return (true);
}
function sprawdzDate(pole_id,obiektRegex) {
  var obiektPole = document.getElementById(pole_id);
  curDate =  new Date().toJSON();;//aktualna data
  if(obiektPole.value<curDate) return (false);
  else return (true);
}
function sprawdzGodzine(pole_id,pole_id2) {
  var obiektPole2 = document.getElementById(pole_id);
  var obiektPole = document.getElementById(pole_id2);
  if ((obiektPole2.value)<=(obiektPole.value)) return (false);
  else return (true);
}
function sprawdz_radio(nazwa_radio){
  //Funkcja sprawdza czy wybrano przycisk radio
  //z grupy przyciskĂłw o nazwie nazwa_radio
  //---------------------------------------
  var obiekt=document.getElementsByName(nazwa_radio);
  for (i=0;i<obiekt.length;i++){
    wybrany=obiekt[i].checked;
    if (wybrany) return true;
  }
  return false;
}
function sprawdz(){
  //Funkcja realizujaca sprawdzanie caĹ‚ego fomularza
  //wykorzystujÄ…c funkcje pomocnicze
  //--------------------------------
  //zmienna informujÄ…ca o poprawnym wypeĹ‚nieniu formularza
  //Definicje odpowiednich wyraĹĽeĹ„ regularnych dla sprawdzenia
  //poprawnoĹ›ci danych wprowadzonych do pĂłl tekstowych
  obiektNazwa = /^[a-zA-Z0-9ąĄćĆęĘłŁńŃóÓśŚżŻźŹ ]{2,20}$/;
  obiektIloscMiejsc = /^[1-9][0-9]{0,20}$/;
  obiektOpis=/^[a-zA-Z0-9ąĄćĆęĘłŁńŃóÓśŚżŻźŹ ]{2,120}$/;
  obiektPunkt = /^[a-zA-Z0-9ąĄćĆęĘłŁńŃóÓśŚżŻźŹ ]{2,20}$/;
  if (!sprawdzPole("nazwaWydarzenia",obiektNazwa)){
    document.getElementById("nazwa_error").innerHTML=
    "Wpisz poprawnie nazwe!";
    walidacja=false;
  }
  else {
    document.getElementById("nazwa_error").innerHTML="";
    walidacja=true;
  }
  if (!sprawdzPole("iloscMiejsc",obiektIloscMiejsc)){
    document.getElementById("iloscMiejsc_error").innerHTML=
    "Wpisz tylko dodatnie liczby !";
    walidacja=false;
  }
  else {document.getElementById("iloscMiejsc_error").innerHTML="";
    walidacja=true;
  }
  if (!sprawdzDate("dataWydarzenia",obiektIloscMiejsc)){
    document.getElementById("data_error").innerHTML=
    "Data musi być z przyszłości";
    walidacja=false;
  }
  else {document.getElementById("data_error").innerHTML="";
    walidacja=true;
  }
  if (!sprawdzPole("opisWydarzenia",obiektOpis)){
    document.getElementById("opis_error").innerHTML=
    "Opis minimum 2 znaki, maksymalnie 120!";
    walidacja=false;
  }
  else {document.getElementById("opis_error").innerHTML="";
    walidacja=true;
  }
  if (!sprawdzGodzine("czasZak","czasRozp")){
    document.getElementById("czas_error").innerHTML=
    "Godzina zakończenia nie może być wcześniej niż godzina rozpoczęcia";
    walidacja=false;
  }
  else {document.getElementById("czas_error").innerHTML="";
    walidacja=true;
  }
  return walidacja;
}
var latitude=0;
var longitude=0;
function showLocation(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  var output = document.getElementById("geo");
  output.innerHTML = "<p>Szerokość geograficzna: " + latitude + " Długość geograficzna: "+longitude+"</p>";
}
function errorHandler(error) {
  var output = document.getElementById("geo");
  var output_error = document.getElementById("lokalizacja_error");
  switch (error.code) {
    case error.PERMISSION_DENIED:
      output_error.innerHTML = "Użytkownik nie udostępnił danych.";
      break;
    case error.POSITION_UNAVAILABLE:
     output_error.innerHTML = "Dane lokalizacyjne niedostępne.";
      break;
    case error.TIMEOUT:
      output_error.innerHTML = "Przekroczono czas żądania.";
      break;
    case error.UNKNOWN_ERROR:
      output_error.innerHTML = "Wystąpił nieznany błąd.";
      break;
  }
}
function getLocation() {
  if (navigator.geolocation) {
    var options = {timeout: 60000};
    navigator.geolocation.getCurrentPosition(
    showLocation,
    errorHandler,
    options);
  }
  else{
    alert("Twoja przeglądarka nie wspiera geolokalizacji!");}
}
//pokazuje dodane wydarzenia na stronie
function pokazWydarzenia(){
  $('.wydarzenie-slidedown').hide();
  $('.pokazWydarzenie').click(
    function() {
      var $action = $(this);
      var $content = $action.next('.wydarzenie-slidedown');
      $('.wydarzenie-slidedown').not($content).slideUp();
      $content.slideDown();
      $(this).toggleClass('active');
    }
  );
}
let x=0;
liczbaPunktowWydarzenia=1;
let n=x+1;//numer dodanego punktu wydarzenia
$(document).on('click', '#dodajpunktWydarzenia', function() {
  liczbaPunktowWydarzenia=document.getElementsByClassName('punktWydarzenia').length;
  var newRow = $('div.poczatekWydarzenia:first').clone();
  newRow.find('#punktWydarzenia0').val('');
  newRow.find('#czasPunktuWydarzenia0').val(document.getElementById('czasPunktuWydarzenia'+(liczbaPunktowWydarzenia-1)).value);
  newRow.insertBefore($('.dodajpunktWydarzenia'));
  newRow.find('.punktWydarzenia').attr('name', 'punktWydarzenia'+liczbaPunktowWydarzenia);
  newRow.find('.punktWydarzenia').attr('id', 'punktWydarzenia'+liczbaPunktowWydarzenia);
  console.log(liczbaPunktowWydarzenia-1);
  newRow.find('.czasPunktuWydarzenia').attr('name', 'czasPunktuWydarzenia'+liczbaPunktowWydarzenia);
  newRow.find('.czasPunktuWydarzenia').attr('id', 'czasPunktuWydarzenia'+liczbaPunktowWydarzenia);
  if(n<=1){
    newRow.find('.czasPunktuWydarzenia').value=document.getElementById('czasRozp').value;
  }
  else{
    newRow.find('.czasPunktuWydarzenia').value=document.getElementById('punktWydarzenia'+liczbaPunktowWydarzenia).value;
  }
  newRow.find('.punktWydarzenia0').removeClass( "poczatekWydarzenia" );
  newRow.removeClass( "poczatekWydarzenia" );
  newRow.find('label').html( "kolejny punkt" );
  newRow.find('label').attr('for', 'punktWydarzenia'+n);
  x++;
});
$('form').submit(function() {
  var wydarzenie={};//tworzę obiekt
  var punktyWydarzenia={};//obiekty punktów
  var x=localStorage.length;//ilość elementów w local storage
  if (localStorage.getItem("wydarzenie["+x+"]")){  //sprawdza ilo�� obiekt�w w localstorage je�li istnieje to zwi�ksza x
    x++;
  }
  else{
    var iloscPosrednichPunktow=$('input[name^=punktWydarzenia]').length;
    wydarzenie.nazwa=$('input[name=nazwaWydarzenia]').val();
    wydarzenie.iloscMiejsc=$('input[name=iloscMiejsc]').val();
    wydarzenie.data=$('input[name=dataWydarzenia]').val();
    wydarzenie.czasRozp=$('input[name=czasRozp]').val();
    wydarzenie.czasZak=$('input[name=czasZak]').val();
    wydarzenie.opis=$('textarea[name=opisWydarzenia]').val();
    wydarzenie.latitude=latitude;
    wydarzenie.longitude=longitude;
    wydarzenie.numerWydarzenia=x;
    function Punkt(nr,time,desc){
      this.nr=nr;
      this.time=time;
      this.desc=desc;
    }
    const punkty2=[];
    for(i=0;i<iloscPosrednichPunktow;i++){
      punktyWydarzenia[i]=$('input[name=punktWydarzenia'+i+']').val();
      punkty2[i] = new Punkt(i, $('input[name=czasPunktuWydarzenia' + i + ']').val(), $('input[name=punktWydarzenia' + i + ']').val());
    }
    wydarzenie.punkty=punktyWydarzenia;
    wydarzenie.punkty2=punkty2;
    if(  walidacja===true){
      localStorage.setItem("wydarzenie["+x+"]" ,JSON.stringify(wydarzenie));
      alert(localStorage.getItem("wydarzenie["+x+"]"));
      window.location.reload();
    }
    else {
      alert("Wprowadzono niepoprawne dane!");
    }
  }
  pokazWydarzenia();
});
//odtwarza wydarzenia z localstorage po zaladowaniu dokumentu
$(document ).ready(function() {
  var x=localStorage.length;
  if(x===0){
    $('.wszystkieWydarzenia').append("<h4>Brak Wydarzeń</h4>");
  }
  for(i=0;i<x;i++){
    var key = localStorage.key(i);
    if (localStorage.getItem(key)){  //sprawdza ilo�� obiekt�w w localstorage je�li istnieje to zwi�ksza x
      var odczytWydarzenia= JSON.parse(localStorage.getItem(key));
      var newWydarzenie = $('<div class="wydarzenie">'+
                            '<a class="btn btn-light btn-xl pokazWydarzenie">'+odczytWydarzenia.nazwa+'</a>'+
                                '<div class="wydarzenie-slidedown">'+
                                    '<div class="container "><!-- opis -->'+
                                            '<div >'+
                                            '<img src=http://maps.googleapis.com/maps/api/staticmap?center='+odczytWydarzenia.latitude+','+odczytWydarzenia.longitude+'&zoom=14&size=300x300&sensor=false"" alt="W tym miejscu powinna być mapka">'+
                                              '<h5 class="iloscMiejsc">Liczba Miejsc: '+odczytWydarzenia.iloscMiejsc+'</h5>'+
                                                '<h5>Opis: </h5><p class="text-faded mb-4 opisWydarzenia">'+odczytWydarzenia.opis+'</p>'+
                                                '<h5 class="dataWydarzenia">Data: </h5><h4>'+odczytWydarzenia.data+'</h4>'+
                                              '<h5 class="czasRozp">Godzina Rozpoczęcia: </h5><h4>'+odczytWydarzenia.czasRozp+'</h4>'+
                                            '</div>'+
                                    '</div>'+
                                    '<div class="timeline"></div>'+
                                '<div>'+
                                '<h5 class="czasZak">Godzina Zakończenia: </h5><h4>'+odczytWydarzenia.czasZak+'</h4>'+
                                    '<input type="button" id="'+i+'" class="deleteWydarzenie refresh" name="deleteWydarzenie" value="usu&#324; wydarzenie"/>'+
                                '</div></div>'+
                          '</div>');
      $('.wszystkieWydarzenia').append(newWydarzenie);
      //for(punkt in odczytWydarzenia.punkty2){
      for(let punkt=0;punkt<odczytWydarzenia.punkty2.length;punkt++){
        var divZPunktemWydarzenia='<div class="container right punktWydarzeniadiv">'+
                                '<div class="content ">'+
                                  '<h4 class="czasPunktuWydarzenia"></h4>'+
                                  '<p></p>'+
                                '</div>'+
                              '</div>';
      var divZPunktemWydarzeniaCzas ='<div class="left timeContent">'+
                                '<div class="content timeContent">'+
                                  '<h4 class="opisPunktWydarzenia"></h4>'+
                                  '<p></p>'+
                                '</div>'+
                              '</div>';
      if (punkt < odczytWydarzenia.punkty2.length&&punkt>=1){
        if (odczytWydarzenia.punkty2[punkt].time == odczytWydarzenia.punkty2[punkt - 1].time) {
        }
        else {
          $('.timeline:last').append(divZPunktemWydarzeniaCzas);
        }
      }
      else if(punkt<=1){
        $('.timeline:last').append(divZPunktemWydarzeniaCzas);
      }
      $('.timeline:last').append(divZPunktemWydarzenia);
      newWydarzenie.find('.czasPunktuWydarzenia:last').text(odczytWydarzenia.punkty2[punkt].desc);
      newWydarzenie.find('.opisPunktWydarzenia:last').text(odczytWydarzenia.punkty2[punkt].time);
      }
    }
  };
  $('.deleteWydarzenie').click(
    function(){
      var a=$('.deleteWydarzenie').attr('id');
      localStorage.removeItem(localStorage.key(a));
    }
  );
  $('input[type=button].refresh').click(
    function(){
      window.location.reload(); pokazWydarzenia();
    }
  );
  pokazWydarzenia();
  x++;
});

