var dataObj=function(){
	this.score=0;
	this.double1=0;
	this.num=0;
	this.fruitNum=0;
	this.gameOver=false;
	this.alpha=0;
}

dataObj.prototype.reset=function(){
	this.score+=this.fruitNum*100*this.double1;
	this.fruitNum=0;
	this.double1=0;
}
dataObj.prototype.draw = function() {
	var w=can1.width;
	var h=can1.height;

	ctx1.fillText("fruit number: "+this.fruitNum,w*0.5-100,h-80);
	ctx1.fillText("score: "+this.score,w*0.5-50,h-30);
	if(this.gameOver){
		ctx1.save();
		ctx1.shadowBlur=10;
		ctx1.shadowColor="white";
		this.alpha+=deltaTime*0.0005;
		if(this.alpha>1)this.alpha=1;
		ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
		ctx1.font="50px Verdana";
		ctx1.fillText("Game Over",w*0.5-100,h*0.5);
		ctx1.restore();
		
	}
};
