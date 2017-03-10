var babyObj=function(){
	this.x;
	this.y;
	this.angle;
	this.babyEye=[];
	this.babyTail=[];
	this.babyBody=[];
	this.tailTime=0;
	this.tailCount=0;
	this.eyeTime=0;
	this.eyeCount=0;
	this.eyeIntevrval=1000;
	this.bodyTime=0;
	this.bodyCount=0;
}

babyObj.prototype.init = function() {
	this.x=canWidth*0.5+100;
	this.y=canHeight*0.5+100;
	this.angle=0;
	this.babyEye.src="./src/babyEye0.png"
	// this.babyTail[0].src="./src/babyTail0.png"
	this.babyBody.src="./src/babyFade0.png"
	for(var i=0;i<8;i++){
		this.babyTail[i]=new Image();
		this.babyTail[i].src="./src/babyTail"+i+".png"
	}
	for(var i=0;i<2;i++){
		this.babyEye[i]=new Image();
		this.babyEye[i].src="./src/babyEye"+i+".png";
	}
	for(var i=0;i<20;i++){
		this.babyBody[i]=new Image();
		this.babyBody[i].src="./src/babyFade"+i+".png";
	}
};

babyObj.prototype.draw=function(){
	this.x=lerpDistance(mx,this.x,0.99);
	this.y=lerpDistance(my,this.y,0.99);
	var deltaX=mx-this.x;
	var deltaY=my-this.y;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;
	this.angle=lerpAngle(beta,this.angle,0.91);

	this.tailTime+=deltaTime;
	if(this.tailTime>50){
		this.tailCount=this.tailCount+1;
		this.tailCount%=8;
		this.tailTime%=50;
	}

	this.eyeTime+=deltaTime;
	if(this.eyeTime>this.eyeIntevrval){
		this.eyeCount+=1;
		this.eyeCount%=2;
		this.eyeTime%=this.eyeIntevrval;
		if(this.eyeCount==0){
			this.eyeIntevrval=Math.random()*1500+200;
		}else{
			this.eyeIntevrval=100;
		}
		// console.log(this.eyeCount);
	}
	this.bodyTime+=deltaTime;
	if(this.bodyTime>300){
		this.bodyCount+=1;
		this.bodyTime%=300;
		if(this.bodyCount>19){
			this.bodyCount=19;
			data.gameOver=true;
		}
	}
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	ctx1.drawImage(this.babyBody[this.bodyCount],-this.babyBody[this.bodyCount].width*0.5,-this.babyBody[this.bodyCount].height*0.5);
	var tailCount=this.tailCount;
	ctx1.drawImage(this.babyTail[tailCount],-this.babyTail[tailCount].width*0.5+26,-this.babyTail[tailCount].height*0.5);

	ctx1.drawImage(this.babyEye[this.eyeCount],-this.babyEye[this.eyeCount].width*0.5+1,-this.babyEye[this.eyeCount].height*0.5);
	
	
	ctx1.restore();
}