var momObj=function(){
	this.x;
	this.y;
	this.bigEye=[];
	this.bigTail=[];
	this.bigBody1=[];
	this.bigBody2=[];
	this.bigBody=new Image();
	this.angle;
	this.tailTime=0;
	this.tailCount=0;
	this.eyeCount=0;
	this.bodyCount=0;
	this.bodyTime=0;
	this.eyeTime=0;
	this.eyeIntevrval=1000;

}
momObj.prototype.init=function(){
	this.x=canWidth*0.5;
	this.y=canHeight*0.5;
	this.angle=0;
	this.bigBody.src="./src/bigSwim7.png";
	for(var i=0;i<8;i++){
		this.bigTail[i]=new Image();
		this.bigTail[i].src="./src/bigTail"+i+".png"
	}
	for(var i=0;i<2;i++){
		this.bigEye[i]=new Image();
		this.bigEye[i].src="./src/bigEye"+i+".png";
	}
	for(var i=0;i<8;i++){
		this.bigBody1[i]=new Image();
		this.bigBody1[i].src="./src/bigSwim"+i+".png";
	}
	for(var i=0;i<8;i++){
		this.bigBody2[i]=new Image();
		this.bigBody2[i].src="./src/bigSwimBlue"+i+".png";
	}
}


momObj.prototype.draw=function(){
	this.x=lerpDistance(mx,this.x,0.9);
	this.y=lerpDistance(my,this.y,0.9);
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
	// this.bodyTime+=deltaTime;
	// if(this.bodyTime>100){
	// 	this.bodyCount+=1;
	// 	this.bodyTime%=100;
	// 	if(this.bodyCount>7){
	// 		this.bodyCount=7;
	// 	}

	// }
	ctx1.save();
	ctx1.translate(this.x,this.y);
	ctx1.rotate(this.angle);
	if(data.double1==1){
		ctx1.drawImage(this.bigBody1[this.bodyCount],-this.bigBody1[this.bodyCount].width*0.5,-this.bigBody1[this.bodyCount].height*0.5);
	}
	else{
		ctx1.drawImage(this.bigBody2[this.bodyCount],-this.bigBody2[this.bodyCount].width*0.5,-this.bigBody2[this.bodyCount].height*0.5);
	}
	ctx1.drawImage(this.bigEye[this.eyeCount],-this.bigEye[this.eyeCount].width*0.5,-this.bigEye[this.eyeCount].height*0.5);
	ctx1.drawImage(this.bigTail[this.tailCount],-this.bigTail[this.tailCount].width*0.5+30,-this.bigTail[this.tailCount].height*0.5);
	
	ctx1.restore();
}