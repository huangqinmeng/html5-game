function onMouseMove(e){
	if(!data.gameOver){
		if(e.offSetX||e.layerX){
			mx=e.offSetX?e.offSetX:e.layerX;
			my=e.offSetY?e.offSetY:e.layerY;
			
		}
	}	
	// console.log(my);
}
function momFruitTouch(){
	if(!data.gameOver){
		for(var i=0;i<fruit.num;i++){
			if(fruit.alive[i]){
				var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
				if(l<900){
					fruit.alive[i]=false;
					data.fruitNum++;
					if(fruit.fruitType[i]==fruit.orange){
						
						data.double1=1;

					}
					else{
						
						data.double1=2;
					}
					mom.bodyCount++;
				    if(mom.bodyCount>7)mom.bodyCount=7;
					
				}
				

			}
		}
	}
}


function monBabytouch(){
	var l=calLength2(mom.x,mom.y,baby.x,baby.y);
	if(mom.bodyCount&&!data.gameOver){
		if(l<100){
			baby.bodyCount=0;
			data.reset();
			mom.bodyCount=0;
		}
	}
}
