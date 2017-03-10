var can1,can2,ctx1,ctx2;

var lastTime,deltaTime;
var bgPic=new Image();
var canWidth,canHeight;
var ane;
var fruit;
var mom;
var baby;
var mx,my;
var data;
var babyTail=[];
var wave;
document.body.onload=game;



function game(){
	init();
	lastTime=Date.now();
	deltaTime=0;
	gameloop();
}


function init(){
	can1=document.getElementById("canvas1");
	ctx1=can1.getContext("2d");
	ctx1.fillStyle="white";
	ctx1.font="30px Verdana";
	can2=document.getElementById("canvas2");
	ctx2=can2.getContext("2d");
	bgPic.src="./src/background.jpg";
	canWidth=can1.width;
	canHeight=can1.height;
	can1.addEventListener('mousemove',onMouseMove);
	ane=new aneObj();
	ane.init();
	fruit=new fruitObj();
	fruit.init();
	mom=new momObj();
	mom.init();
	baby=new babyObj();
	baby.init();
	mx=canWidth*0.5;
	my=canHeight*0.5;
	data=new dataObj();
	wave =new waveObj();
	

}

function gameloop(){
	window.requestAnimFrame(gameloop);
	var now=Date.now();
	deltaTime=now-lastTime;
	lastTime=now;
	drawBg();
	ane.draw();
	fruit.draw();
	fruit.fruitListen();
	ctx1.clearRect(0,0,canWidth,canHeight);
	mom.draw();
	baby.draw();
	momFruitTouch();
	monBabytouch();
	data.draw();
}
// 海葵
var aneObj=function(){
	this.x=[];
	this.len=[];

}
aneObj.prototype.num=50;
aneObj.prototype.init=function(){
	for (var i=0; i<this.num; i++) {
		this.x[i]=i*16+Math.random()*20;
		this.len[i]=200+Math.random()*50;
	};

}
aneObj.prototype.draw = function() {
	ctx2.save();
	ctx2.globalAlpha=0.6;
	ctx2.lineWidth=20;
	ctx2.lineCap="round"
	ctx2.strokeStyle="#3b154e";
	for(var i=0;i<this.num;i++){
		ctx2.beginPath();
		ctx2.moveTo(this.x[i],canHeight);
		ctx2.lineTo(this.x[i],canHeight-this.len[i]);
		ctx2.stroke();

	}
	ctx2.restore();
}


//果实
var fruitObj=function(){
	this.alive=[];
	this.orange=new Image();
	this.blue=new Image();
	this.x=[];
	this.y=[];
	this.l=[];
	this.speed=[];
	this.position=[];
	this.fruitType=[];
	

}
fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.alive[i]=false;
		this.x[i]=0;
		this.y[i]=0;
		this.l[i]=0;
		this.speed[i]=Math.random()*0.2+0.2;
		this.born(i);
		

	}
	this.orange.src="./src/fruit.png";
	this.blue.src="./src/blue.png";
}

fruitObj.prototype.draw=function(){
	var num=0;
	for(var i=0;i<this.num;i++){
		if(this.alive[i]==true){
			if(this.l[i]<=15){
			this.l[i]+=this.speed[i]*3;
			}	
			else{
				this.y[i]-=this.speed[i]*10;
			}
			ctx2.drawImage(this.fruitType[i],this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5,this.l[i],this.l[i]);
			if(this.y[i]<10){
				this.alive[i]=false;
			}
		}
	}
}

fruitObj.prototype.born=function(i){
	var aneId =Math.floor(Math.random()*ane.num);
	this.x[i]=ane.x[aneId];
	this.y[i]=canHeight-ane.len[aneId];
	this.l[i]=0;
	this.alive[i]=true;
	var ran=Math.random();
	if(ran<0.1){
		this.fruitType[i]=this.blue;
	}
	else{
		this.fruitType[i]=this.orange;
	}
}


fruitObj.prototype.fruitListen=function(){
	var num=0;
	for(var i=0;i<this.num;i++){
		if(this.alive[i])num++;
	}
	if(num<15){
		this.sendFruit();
		return;

	}
}

fruitObj.prototype.sendFruit=function(){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){
			this.born(i);
			return;
		}
	}
}

fruitObj.prototype.wave=function(i){
	if(!this.r[i])this.r[i]=0;
	this.r[i]+=deltaTime*0.1;
	if(this.r>5)this.r=5;
	this.alpha-=deltaTime*0.01;
	if(this.alpha<0)this.alpha=0;
	ctx1.beginPath();
	ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
	ctx1.closePath();
	ctx1.strokeStyle="rgba(255,255,255,"+this.alpha+")";
	ctx1.stroke();
	console.log(this.r[i]);
}












//  var bigTail=document.getElementById('tail');
// var btn=document.getElementById("btn");
// var count=0;

// function change(){		
// 		bigTail.src="./src/bigTail"+count+".png";
// 		console.log(bigTail.src);
// 		count++;
// 		count%=7;
// }
// var time=setInterval(change,200);
// btn.onclick=function(){
// 	clearInterval(time);
// }