  
var socket=io.connect("http://localhost:5000");

var u_name=document.getElementById("u_name");
var save_btn=document.getElementById("save");
var output=document.getElementById("output");
var output2=document.getElementById("output2");

//console.log(output.innerHTML);

 var buttonclickedcount=0;
 var total_buttonclicked=0;
 var difficultymode;

var elapsedTime;


function begintimer()
{
  var startTime = Date.now();
var interval = setInterval(function() {
     elapsedTime = Date.now() - startTime;
    document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(3);
    
}, 100);
}

//console.log(document.getElementById("timer").innerHTML);

let memory_array = [];

function starteasy()
{
  begintimer();
  createarr(20,"EASY");
}
function startmedium()
{
begintimer();
createarr(40,"MEDIUM");
}
function starthard()
{
 begintimer();
 createarr(60,"HARD");
}

function createarr(dimension,typemode)
{
  while(memory_array.length < dimension)
  {
    var r = Math.floor(Math.random() * dimension ) + 1;
    if(memory_array.indexOf(r) === -1) memory_array .push(r);  
}

str1="MEDIUM";
var n = str1.localeCompare(typemode);

if(!n)
{
 
 document.getElementById("memory_board").style.width=" 640px";

}

str2="HARD";
var m = str2.localeCompare(typemode);

if(!m)
{
 
 document.getElementById("memory_board").style.width=" 960px";
   
}
  //console.log(memory_array);

  //console.log(typemode);

 for(var i = 0; i <dimension ; i++)
 {    
                  let btn =document.createElement("button");
                      btn.classList.add("abcd");
                      var t = document.createTextNode(memory_array[i]);

                      var num=memory_array[i];

                          if(num <10)
                      {
                        var col="#39e60"+num;
                      }
                      else
                      {
                        var col="#39e6"+ num;
                      }                      
                      btn.style.background=col;
                       btn.appendChild(t);
                       var abc= document.getElementById('memory_board');
                       abc.appendChild(btn);

btn.onclick=function change()
 {

//console.log(btn.innerHTML);

var sound = new Audio("ping.mp3");

sound.play();
                         
                    var a =btn.innerHTML; // changing the content of the button
                    

                    if(a-dimension +2*dimension <= 2*dimension)
                      {
                    a=a.replace(a,a-dimension +2*dimension);

                    btn.innerHTML=a;
                    total_buttonclicked++;
                    add_count(total_buttonclicked);
                    }

                    else
                    {
                      a=a.replace(a,"_");

                    btn.innerHTML=a;

                      buttonclickedcount++;
                      total_buttonclicked++;
                      add_count(total_buttonclicked);
                      //console.log(buttonclickedcount);

                  }
console.log(total_buttonclicked+"hahah");
 
if(buttonclickedcount==5)
{

 var t= document.getElementById("disptime").innerHTML = (elapsedTime / 1000).toFixed(3);//recent score is updated under the disptime tag and stored in local storage

localStorage.setItem('score', t);
//document.getElementById("timer").innerHTML=" DONE";


const arrscore = {
    arrscore: t,
    mode:typemode
  
  };

    
    //console.log(document.getElementById("timer").innerHTML);

  
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];//creating an empty array

  highScores.push(arrscore);//pushing the objects in the array


  highScores.sort((a,b)=> a.arrscore - b.arrscore);
  highScores.splice(5);

  
  

  localStorage.setItem("highScores", JSON.stringify(highScores));



alert("Game Over\n"+"Completed In Time:"+t);


var myobj = document.getElementById("timer");
//myobj.remove();


}
 }


 }
}


function refresh()
{
  window.location.reload();  
}


function DisplayScoresList()
{
const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML = highScores
  .map(arrscore => {

    return `<li>${arrscore.arrscore} - ${arrscore.mode}</li>`;
  })
  .join("");
}



 save_btn.addEventListener("click",function()
 {

   socket.emit('user_name', {
      user_name:u_name.value
      
  });
 });


 function add_count(count_score)
 {
  console.log(count_score+"deiii");
  socket.emit('user_score', {
      user_score:count_score
      
  });

}
 
 
 



 socket.on("user_name",function(data)
 {
output.innerHTML+="<p>"+"username  "+data.user_name+"</p>";
 });



  socket.on("user_score",function(data)
 {
//output2.innerHTML+="<p>"+data.user_score+"</p>";
var f_score=output2.innerHTML;
f_score++;
output2.innerHTML=data.user_score;

 });

