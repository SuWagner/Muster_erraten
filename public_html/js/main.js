//Die Views
var views = ["#Player1Setzen","#Player2Setzen","#GameOver", "#Congratulations"];
 

// in diesem Array werden die gesetzten Divs von Player 1 gespeichert um sie später mit den Versuchen von Player2 zu vergleichen und gegebenenfalls grün oder rot einzufärben
var isSet =[];


$(document).ready(function() {
    window.addEventListener("load", function() {
        setTimeout(loaded, 100); }, false);  
    function loaded() {
        window.scrollTo(0, 1); // Adressleiste verstecke
    }
    changeView("#Player1Setzen");
    $("#Start").hide();
   
  
   
   // aus dem Speicher holen und schauen ob etwas im Array ist
    var isSetChanged = localStorage.getItem('isSet'); 
               
                if(isSetChanged != null){
                    isSet = JSON.parse(isSetChanged);
                    }
    
   
    
    //// erstellt ein Grid von 11 x 7 divs für mein Board --> jedes Tile hat eine ID von links oben bis rechts unten aufsteigend tile+i
   
    
    var tileID=0;
    for(var x = 0; x < 11; x++) {
        for(var y = 0; y < 7; y++) {
            tileID ++;
            var code = "tile"+tileID;
            var tiles = $('<div class="tiles" id="'+code+'"></div>"');
            tiles.appendTo('.board');
        }
    }
    
    for(var i =0; i<isSet.length; i++){
      // die im speicher gefundenen Divs einfärben
      var tileSet = isSet[i];
      $("#"+tileSet).css('background-color', '#ffffff');
    }
    //OverlayTExt verschwindet nach einmal draufclicken
    $("#TapToPlay").click(function(){
       hideOverlay(); 
            
            
            if(isSet.length == 0){
            var ships = 10;
            if($("#toSetCounter").val()>1 && $("#toSetCounter").val()<31){
                ships =$("#toSetCounter").val();
            }
        }
        var index = 0;
        $("#toSetCounter").val(ships);
   // wenn ich auf irgendein tile clicke, dann ändert sich die HGFarbe der ersten 3 Tiles
        $(".tiles").click(function(){
     //       alert(this);
     //       alert(this.id);
           // solang 
            if(ships > 0){
               
                // wieder ein schiff setzten --> HG Farbe eines Tiles ändern
                $(this).css('background-color', '#ffffff');
                isSet[index]= this.id;
                index++;
                ships=ships-1;
                $("#toSetCounter").val(ships);

              } else{ //nach 30 Zügen wird die View geändert --> Player Zwei ist dran
                  //Wenn alle elemente gesetzt wurden, dann kann man per klick auf den zweiten Spieler kommen    
                  changeView("#Player2Setzen");
                  window.localStorage.setItem("isSet",JSON.stringify(isSet));   
                   
                //  $("#Start").show();
              }        
               
        }); 

   });
   
    
    
  // der zweite Spieler startet mit dem clicken auf das Start Overlay und kann danach nach den gesetzten divs suchen  
  
  $("#Player2Setzen").click(function(){
    // $("#Start").hide();
     var tries = 0;
     var correct = 0; // hier wird die Anzahl der bereits richtig gefunden tiles gespeichert
     var target = isSet.length;
     $("#tryCounter").val(tries); // hier wäre der counter , falls ich ihn implementiere

     $(".tiles").click(function(){
        
            if(tries < 70){
                var set = false;
                   for(var i =0; i<isSet.length; i++){
                       if(isSet[i]== this.id){
                           set = true;
                       }
                   }
                if(set != false){
                   $(this).css('background-color', 'green');
                   correct ++;
                }else{
                   $(this).css('background-color', 'red');
                }
               tries ++;
               $("#tryCounter").val(tries);  // Hier wird angezeigt wieviele Versuche der Player2 schon angesammelt hat. 
               if(correct == target){  // wenn alle gesetzten Divs gefunden wurden, so ist das Spiel vorbei
                    changeView("#Congratulations");
                     isSet.length=0;
                     window.localStorage.setItem("isSet",JSON.stringify(isSet));
                     $("#CongratulationsType").click(function(){
                         location.reload()
                     });



               }
           } else{   
                    changeView("#GameOver");
                    isSet.length=0;
                     window.localStorage.setItem("isSet",JSON.stringify(isSet));
                     $("#GameoverType").click(function(){
                         location.reload()
                     });
                   //$("#GameoverOverlay").show;
           }
                  
                
     });
     
     
     
  });
    
    
 /*   
    
    $("#GameoverType").click(function(){
        isSet.length = 0;
        alert(isSet);
        
        $("'TapToPlay").show;
        changeView("#Player1Setzen");
       // $(".tiles").css('background-color', '#73B1B7');
      //  tries = 0;
        
        
    });    
   */ 
});
// wenn möglich über Tiles mit dem Finger ziehen --> oder auf ein Tile clicken --> horizental , 2tes mal clicken vertikal, 3tes mal wieder weg
// wenn board zu klein, wird alert angezeigt
// solang healten wird, sieht man künftige platzierung mit highlight



function showOverlay(){
     $("#TapToPlay").show();
}

function hideOverlay(){
     $("#TapToPlay").hide();
}


function changeView(visibleView){
    
    //Array durchiterieren und jedes item toggeln ob hide(), oder Show(),
    // abfragen ob Parameter gleich dem aktuellen Item, wenn ja anzeigen, wenn nein verbergen.
    for(i=0; i<views.length; i++){
            if(views[i] === visibleView){
                $(views[i]).show();
            }else{
                $(views[i]).hide();
                }
        
        }
    }


