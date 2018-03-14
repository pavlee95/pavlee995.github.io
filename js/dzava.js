//Drop Down meni
$(document).ready(function(){
  $('#meni li ul').css({
    display:"none",
    left:"auto"
  });
  $('#meni li').hover(function(){
    $(this).find('ul').stop(true,true).fadeIn('slow');
    }, function(){
      $(this).find('ul').stop(true,true).fadeOut('fast');
  });

//slajder

  slideShow();
  prikaztabele();
});

function slideShow(){
  var trenutni = $('#slajder .aktivna');
  var sledeci = trenutni.next().length ? trenutni.next() : trenutni.parent().children(':first');
  trenutni.removeClass('aktivna');
  sledeci.addClass('aktivna');
  setTimeout(slideShow, 3500);
}

//google mapa

function initMap() {
var pozicija = {lat: 44.81131644258444, lng: 20.477941202147804};
var map = new google.maps.Map(document.getElementById('map'), {
zoom: 17,
center: pozicija
});
var marker = new google.maps.Marker({
position: pozicija,
map: map
});
}

//Dinamičko ispisivanje sadržaja unutar strane pomoću objekata

function prikaztabele(){
    var nizkoraci = [
			{
				korak: "KORAK 1:",
				opis: "Prvo što treba uraditi pri prijavljivanju na Work and Travel program je zakazivanje razgovora i dolazak u agenciju."
			},
      {
				korak: "KORAK 2:",
				opis: "Nakon odabira pozicije potpisuje se ugovor sa Work and Travel agencijom i plaća se prva rata u iznosu od 200 USD i 9000 dinara"
			},
      {
				korak: "KORAK 3:",
				opis: "Nakon potpisivanja ugovora sa Work and Travel agencijom, popunjava se aplikacija i vrši se prikupljanje dokumentacije koja je potrebna za uključenje na Work and Travel program."
			},
      {
				korak: "KORAK 4:",
				opis: "Sledeći korak je intervju sa poslodavcem ili sponzorskom agencijom u SAD-u. Intervju će se obaviti preko skajpa."
			},
      {
				korak: "KORAK 5:",
				opis: "Posle potpisivanja “ Job offer-a” i potvrde da ste dobili željenu poziciju, čeka se određeni period da stigne “DS-Formular”, koji će Vam biti jedan od neohodnih dokumenata za intervju u ambasadi."
			},
			{
				korak: "KORAK 6:",
				opis: "Kada uspešno prođete i Korak 5, očekuje Vas kupovina karte i orijentacija pred odlazak u Ameriku."
			}
		];
    var prikazkoraci = "<table id='tabela' border='1'><tr><th>PROCEDURA</th><th>UPUTSTVO</th></tr>";
    for(var i=0; i<nizkoraci.length; i++) {
        prikazkoraci +="<tr><td>"+nizkoraci[i].korak +"</td><td>"+nizkoraci[i].opis +"</td></tr>";
    }
    prikazkoraci += "</table>";
    $('#tabelajson').html(prikazkoraci);
}

//scrollovanje na odredjeni deo strane

$(document).ready(function(){
  $('#spustanje').on('click', function(e){
    var x = $('#spustanje');
    $('html, body').stop().animate({
      scrollTop: $(x.attr('href')).offset().top
    }, 3000);
    e.preventDefault();
  });


ispi4meseca();


$("#posalji").on('click', proveriFormular);

});

//Regularni izrazi

var reIme = /^[A-ZŠĐČĆŽ][a-zšđčćž]{2,11}(\s[A-ZŠĐČĆŽ][a-zšđčćž]{2,11})+$/;
var reEmail = /^[\w]+[\.\w\d]*\@[\w]+([\.][\w]+)+$/;
var reBrojMobilnog = /^\+3816[01234569][0-9]{6,7}$/;
var reGrad= /^(([A-Z][a-z]{2,11}\s*)+)$/;

//Formulari provera

 function proveriFormular(){

  var ime = document.getElementById("tbIme").value;
  if(!reIme.test(ime)){
    document.getElementById("tbIme").classList.add("nijeDobro");
  } else {
    document.getElementById("tbIme").classList.remove("nijeDobro");
  }

  var email = document.getElementById("tbEmail").value;
  if(!reEmail.test(email)){
    document.getElementById("tbEmail").classList.add("nijeDobro");
  } else {
    document.getElementById("tbEmail").classList.remove("nijeDobro");
  }

  var br = document.getElementById("tbBrojMobilnog").value;
  if(!reBrojMobilnog.test(br)){
    document.getElementById("tbBrojMobilnog").classList.add("nijeDobro");
  } else {
    document.getElementById("tbBrojMobilnog").classList.remove("nijeDobro");
  }

  var gr = document.getElementById("tbGrad").value;
  if(!reGrad.test(gr)){
    document.getElementById("tbGrad").classList.add("nijeDobro");
  } else {
    document.getElementById("tbGrad").classList.remove("nijeDobro");
  }

  var pol = document.getElementsByName('rbPol');
  var postojiCekiran = false;
  for(let i=0; i<pol.length; i++){
    if(pol[i].checked)
      break;
    else postojiCekiran = true;
  }
    if(postojiCekiran)
    document.getElementById('pol').classList.add("crvena");
    else document.getElementById('pol').classList.remove("crvena");
 }

//dinamicko ispisivanje meseci iz niza
  function ispi4meseca(){
	var meseci, ispis, broj;
	meseci	= new Array("April", "Maj", "Jun", "Jul");
	ispis = "<select id='ddlMesec'>";
	ispis += "<option value='0'>Izaberite</option>";
	for(var i = 0; i < meseci.length; i++)
	{
		broj = i + 1;
		ispis += "<option value='"+broj+"'>" + meseci[i] + "</option>";
	}
	ispis += "</select>";
	  $('#mesec').html(ispis);
}

//Dinamičko ispisivanje sadržaja JSON fajla unutar strane putem AJAX-a

$.ajax({
		type: 'GET',
		url: 'ponuda.json',
		success: function(podaci){
			var ispis = "";
			$.each(podaci, function(index, podatak){
				ispis += '<div class="boxponuda">' +
							'<h3 class="opisArtikla">' + podatak.grad + '</h3>' +
							'<img src="' + podatak.src + '" alt="' + podatak.alt + '"/>' +
							'<p class="boxponuda-opis">' +
							'<span class="pozicija">Pozicija: ' + podatak.pozicija + '</span></br>' +
							 '<span class="satnica">Satnica: ' + podatak.satnica + '$</span>'+
						'</p>' +
					'</div>';
			});

			$('#ponude').append(ispis);
		}
	});

  $.ajax({
  		type: 'GET',
  		url: 'superPonuda.json',
  		success: function(podaci){
  			var ispis = "";
  			$.each(podaci, function(index, podatak){
  				ispis += '<div class="boxponuda">' +
  							'<h3 class="opisArtikla">' + podatak.grad + '</h3>' +
  							'<img src="' + podatak.src + '" alt="' + podatak.alt + '"/>' +
  							'<p class="boxponuda-opis">' +
  							'<span class="pozicija">Pozicija: ' + podatak.pozicija + '</span></br>' +
  							 '<span class="satnica">Satnica: ' + podatak.satnica + '$</span>'+
  						'</p>' +
  					'</div>';
  			});
  			$('#izdvajamo').append(ispis);
  		}
  	});


//redjanje sadrzaja po kolonama

$(document).on('click','#jedna',function(e){
  e.preventDefault();
  $('.boxponuda').css('width','100%');
});

$(document).on('click','#dve',function(e){
  e.preventDefault();
  $('.boxponuda').css('width','47%');
});

$(document).on('click','#tri',function(e){
  e.preventDefault();
  $('.boxponuda').css('width','30%');
});

//sortiranje a-z

$(document).ready(function(){
  $('#a-z').click(function(e){
    e.preventDefault();
    var nizArtikli3=$('.boxponuda');
    nizArtikli3.sort(function(a,b){
      a=$(a).find('.opisArtikla').text();
      b=$(b).find('.opisArtikla').text();
      if(a>b){return 1}
      else if(a<b){return -1}
      else{return 0}
    })
    $('#ponude').append(nizArtikli3)
  });
});

//sortiranje a-z

$(document).ready(function(){
  $('#z-a').click(function(e){
    e.preventDefault();
    var nizArtikli4=$('.boxponuda');
    nizArtikli4.sort(function(a,b){
      a=$(a).find('.opisArtikla').text();
      b=$(b).find('.opisArtikla').text();
      if(a>b){return -1}
      else if(a<b){return 1}
      else{return 0}
    })
    $('#ponude').append(nizArtikli4)
  });
});

//filtriranje po delu stringa

$(document).ready(function(){
  $('#deo').keyup(function(){
    var nizArtikli123=$('.boxponuda');
    var uneto1=$(this).val();

    $.each(nizArtikli123,function(index,boxponuda){
      var naslov=$(boxponuda).find('.opisArtikla').text();
      if(uneto1==''){$(boxponuda).show()}
      else if(naslov.toLowerCase().indexOf(uneto1.toLowerCase())!=-1){$(boxponuda).show()}
      else{$(boxponuda).hide()}
    });
  });
});

//jQuery Galerija

$(document).ready(function () {
  $('#divSlike img').on({click: function () {
            var imageURL = $(this).attr('src');
            $('#glavnaSlika').fadeOut(500, function () {
            $(this).attr('src', imageURL);
          }).fadeIn(500);
            }
          });
        });
