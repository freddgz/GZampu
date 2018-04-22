$(document).ready(function(){
	var matriz_begin=[1,3,7,3,1];

	var g_beginColor=matriz_begin[gindex];
	var g_lenght=7;
	var arrayNUMBERNOTE=["SI","LA#","LA","SOL#","SOL","FA#","FA","MI","RE#","RE","DO#","DO"];
	var _titulo=["mi menor","re menor","si menor","fa# menor","la menor"];
	var _colores=["yellow","orange","red","purple"];
	var _notas=[
				[["SI","SOL","MI","DO","LA","FA#","RE"],
				["LA","FA#","RE","SI","SOL","MI"]],//MI MENOR

				[["DO","LA","FA","RE","LA#","SOL","MI","DO","LA"],
				["LA#","SOL","MI","DO","LA","FA","RE","LA#"]],//RE MENOR

				[["MI","DO#","LA","FA#","RE","SI","SOL","MI","DO#"],
				["RE","SI","SOL","MI","DO#","LA","FA#","RE"]],//SI MENOR

				[["MI","DO#","LA","FA#","RE","SI","SOL#","MI","DO#"],
				["RE","SI","SOL#","MI","DO#","LA","FA#","RE"]],//FA# MENOR

				[["SI","SOL","MI","DO","LA","FA","RE"],
				["LA","FA","RE","SI","SOL","MI"]],//LA MENOR
				];
	var _tonalidad=[
				"(mi, fa#, sol, la, si, do, re, mi)",
				"(re, mi fa, sol, la, la#, do, re)",
				"(si, do#, re, mi, fa#, sol, la, si)",
				"(fa#, sol#, la, si, do#, re, mi, fa#)",
				"(la, si, do, re, mi, fa, sol, la)",
				];	
	var cantTonalidades=_notas.length;
	var _arcas=new Array(cantTonalidades),_iras = new Array(cantTonalidades);
	var idarca=0;
	var idira=1;
	var g_beginTone=getBeginTone();
	for (var j = 0; j < cantTonalidades; j++) {
		if(j==gindex){
			__nota= _notas[j];
			__arca='';__ira='';
			__posicion=0;
			for (var i = 0; i < __nota[idarca].length; i++) {
				__posicion++;
				__idcolor=getColor(__posicion,idarca);
				__numTone=getNumberScale(__posicion,idarca);
				__arca+=getButton(__nota[idarca][i],__idcolor,__numTone,i+1,0);
				if (i < __nota[idira].length) {
					__posicion++;

					__idcolor=getColor(__posicion,idira);
					__numTone=getNumberScale(__posicion,idira);
					__ira+=getButton(__nota[idira][i],__idcolor,__numTone,i+1,1);
				};
			};
			_arcas[j]=__arca;
			_iras[j]=__ira;
		}
	};
	mostrarZamponia(gindex);
	
	var synth = new Tone.MonoSynth({
			"portamento" : 0.01,
			"oscillator" : {
				"type" : "square"
			},
			"envelope" : {
				"attack" : 0.005,
				"decay" : 0.2,
				"sustain" : 0.4,
				"release" : 1.4,
			},
			"filterEnvelope" : {
				"attack" : 0.005,
				"decay" : 0.1,
				"sustain" : 0.05,
				"release" : 0.8,
				"baseFrequency" : 300,
				"octaves" : 4
			}
		}).toMaster();
	/*var synth = new Tone.MembraneSynth({
			"pitchDecay" : 0.008,
			"octaves" : 2,
			"envelope" : {
				"attack" : 0.0001,
				"decay" : 0.5,
				"sustain" : 0
			}
			}).toMaster();*/


	function getBeginTone(){
		var __posicion=1;
		__nota= _notas[gindex];				
		for (var i = 0; i < __nota[idarca].length; i++) {
			__posicion++;
			numnoteArca=arrayNUMBERNOTE.indexOf(__nota[idarca][i]);
			numnoteIra=arrayNUMBERNOTE.indexOf(__nota[idira][i]);
			if(numnoteIra<numnoteArca)
				break;
			__posicion++;
			numnoteArca=arrayNUMBERNOTE.indexOf(__nota[idarca][i+1]);
			numnoteIra=arrayNUMBERNOTE.indexOf(__nota[idira][i]);
			if(numnoteArca<numnoteIra)
				break;
		};
		if(__posicion==(g_lenght+1))
			__posicion=1;
		return __posicion;
	}
	function getColor(posicion,idtipo){
		if(posicion<g_beginColor)
			return 0;
		newposicion=posicion-g_beginColor;
		idcolor=parseInt(newposicion/(g_lenght+(isLenght(newposicion+1)?1:0)))+1;
		return idcolor;
	}
	function getNumberScale(posicion,idtipo){
		if(posicion<g_beginTone)
			return 0;
		newposicion=posicion-g_beginTone;
		idcolor=parseInt(newposicion/(g_lenght+(isLenght(newposicion+1)?1:0)))+1;
		return idcolor;
	}
	function isLenght(posicion){
		return (posicion%g_lenght==0);
	}

	function getButton(nota,j,idtone,i,arcaira){
		escala=5-idtone;
		return '<button data-numero="'+i+'" data-idcolor="'+j+'" data-scale="'+escala+'" data-arcaira="'+arcaira+'"'
				+ ' class="cbutton cbutton--effect-ivana '+_colores[j]+'">'
				+nota+'</button>';
	};
	function mostrarZamponia(index){
		$('#pipe .title').append("<h5>"+_titulo[index]+"</h5>");
		$('#pipe .title').append("<h6>"+_tonalidad[index]+"</h6>");		
		$('.box.arca').html(_arcas[index]);
		$('.box.ira').html(_iras[index]);
	};

	$('button.cbutton').on('mousedown',function(){
		printNote(this);
	});

	$('button.cbutton').on('mouseup',function(){
		synth.triggerRelease();
		$(this).removeClass("bordado");
	});

	$('#fab-space').on('click',function(){
      fabSpace();
    });
	$('#fab-breakline').on('click',function(){
      fabBreakline();
    });
    $('#fab-clear').on('click',function(){
      fabClear();
    });
    $('#fab-back').on('click',function(){
      fabBack();
    });
    function fabSpace(){
		tag= $( "#notas-letras").children().last().get(0).tagName.toLowerCase();//span o hr
		$("#notas-letras "+tag).last().css({'margin-right':"1em"});
		if($('.fixed-action-btn').hasClass("active"))
      		$('.fixed-action-btn').closeFAB();	
    }
    function fabBreakline(){
		$( "#notas-letras").append('<hr/>');
      	if($('.fixed-action-btn').hasClass("active"))
      		$('.fixed-action-btn').closeFAB();
    }
    function fabClear(){
	//if(!confirm("¿seguro se borrar todo?"))return;
      $( "#notas-letras").html("");
      if($('.fixed-action-btn').hasClass("active"))
      		$('.fixed-action-btn').closeFAB();	
    }
    function fabBack(){
    	tag=$( "#notas-letras").children().last().get(0);
    	if(tag!='undefined'){
			tagName= tag.tagName.toLowerCase();//span o hr
      		$("#notas-letras "+tagName).last().remove();
      		//$('.fixed-action-btn').closeFAB();
  		}
    }
    
	function printNote(tagbtn){
		
		btn=$(tagbtn);
		number=btn.data("numero");
		idcolor=btn.data("idcolor");
		note=btn.text();
		escala=btn.data("scale");
		arcaira=btn.data("arcaira");

		if(document.getElementById('switchNotas').checked){
			isnumerial = document.getElementById('switchNumero').checked;
			if(isnumerial){
				estiloNumeral="line-height: 60px;";
				if(arcaira==0)
					estiloNumeral+="vertical-align: 20px;";
				$("#notas-letras").append(getNota(number,idcolor,estiloNumeral));
			}
			else{
				$("#notas-letras").append(getNota(note,idcolor,''));
			}
			
		}
		AmericanNote=changeNoteFormat(note);
		//synth.triggerAttackRelease(AmericanNote+escala, '8n')
		synth.triggerAttack(AmericanNote+escala);

		$(tagbtn).addClass("bordado");
		updateScroll();
		//$(tagbtn).delay(1000).queue(function(){
		//    $(this).removeClass("bordado");
		//});
	}
	function updateScroll(){
	    var element = document.getElementById("notas-letras");
	    element.scrollTop = element.scrollHeight;
	}
	function getNota(note,j,estilo){
		return '<span class="'+_colores[j]+'-text" style="'+estilo+'"><strong>'+note+' </strong></span>'
	}

	var keys = {};
	var g_iskeydown=false;
	$(document).on('keydown', function(e) {	
		if(keys[e.which]) return;
		keys[e.which] = true;
		//if(g_iskeydown) return;
		g_iskeydown=true;
		key=e.which;

		if(key==8){
			fabBack();
		}else if(key==32){
			fabSpace();
		}else if(key==13 || key==9){
			fabBreakline();
		}else if(key==27){
			fabClear();
		}else{			
			nivel_number=getNumber(key);
			if(nivel_number==null)return;

			idnivel=nivel_number[0];
			number=nivel_number[1];
			nivel=(idnivel==idarca)?"arca":"ira";

			if(isbelongNote(idnivel,number)){
				printNote("."+nivel+" button.cbutton[data-numero="+number+"]");
			}
		}
    //alert($(".arca button.cbutton[data-numero=1]").text());
        
/*
        var tag = e.target.tagName.toLowerCase();
        if ( e.which === 119 && tag != 'input' && tag != 'textarea') 
            alert(e.which);
          */
    });
    $(document).on('keyup', function(e) {
    	delete keys[e.which];
    	g_iskeydown=false;
    	synth.triggerRelease();


    	key=e.which;
    	nivel_number=getNumber(key);
		if(nivel_number==null)return;

		idnivel=nivel_number[0];
		number=nivel_number[1];
		nivel=(idnivel==idarca)?"arca":"ira";

		if(isbelongNote(idnivel,number)){
			$("."+nivel+" button.cbutton[data-numero="+number+"]").removeClass("bordado");
		}
    });
    function isbelongNote(nivel,number){
    	return (number<=_notas[gindex][nivel].length);
    }
    function getNumber(key){
    	number=0;
    	nivel=0;
    	switch(key){
			case 49: number=1;nivel=idarca; break;
			case 50: number=2;nivel=idarca; break;
			case 51: number=3;nivel=idarca; break;
			case 52: number=4;nivel=idarca; break;
			case 53: number=5;nivel=idarca; break;
			case 54: number=6;nivel=idarca; break;
			case 55: number=7;nivel=idarca; break;
			case 56: number=8;nivel=idarca; break;
			case 57: number=9;nivel=idarca; break;
			case 48: number=10;nivel=idarca; break;

			case 81: number=1;nivel=idira;break;
			case 87: number=2;nivel=idira;break;
			case 69: number=3;nivel=idira;break;
			case 82: number=4;nivel=idira;break;
			case 84: number=5;nivel=idira;break;
			case 89: number=6;nivel=idira;break;
			case 85: number=7;nivel=idira;break;
			case 73: number=8;nivel=idira;break;
			case 79: number=9;nivel=idira;break;
			default: return null;
		}
		return [nivel,number];
    }
    function changeNoteFormat(note){
    	noteOut="";
    	alteracion=(note.indexOf("#")>=0)?"#":((note.indexOf("b")>=0)?"b":"");
    	noteNatural=note.replace("#","").replace("b","");

    	switch(noteNatural){
    		case "SI":noteOut="B";break;
    		case "LA":noteOut="A";break;
    		case "SOL":noteOut="G";break;
    		case "FA":noteOut="F";break;
    		case "MI":noteOut="E";break;
    		case "RE":noteOut="D";break;
    		case "DO":noteOut="C";break;

    		case "B":noteOut="SI";break;
    		case "A":noteOut="LA";break;
    		case "G":noteOut="SOL";break;
    		case "F":noteOut="FA";break;
    		case "E":noteOut="MI";break;
    		case "D":noteOut="RE";break;
    		case "C":noteOut="DO";break;
    		default: return "";
    	}
    	return noteOut+alteracion;
    }
	// http://stackoverflow.com/a/11381730/989439
	//$( "#notas-letras > span").each(function() {
	//  $( this ).addClass( "red-text" );
	//});
});

