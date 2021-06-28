function Snake(x, y){
	this.color=[random(100, 255), (random(100, 255)), random(200, 255)]
	this.x=x
	this.y=y
	this.xspeed=1
	this.yspeed=0
	this.total=0
	this.tail = []

	this.update = function(){
		if(this.total===this.tail.length){
			for (var i =0; i<this.tail.length-1; i++){
				this.tail[i]=this.tail[i+1]
			}
		}
		this.tail[this.total-1]=createVector(this.x, this.y);

		this.x+=(this.xspeed)*scl
		this.y+=(this.yspeed)*scl

		if(this.x>width-scl){
			this.x=0
		}else if(this.x<0){
			this.x=width-scl
		}
		if(this.y>height-scl){
			this.y=0
		}else if(this.y<0){
			this.y=height-scl
		}

	}

	this.death = function(s){
		for (var i = 0; i < this.tail.length; i++){
			d = dist(this.tail[i].x, this.tail[i].y, this.x, this.y)
			if(d<10){
				for (var k = 0; k<Math.ceil(this.total/2); k++){
					pickLocation()
				}
				this.total=Math.floor(this.total/2)
				this.tail=this.tail.splice(Math.ceil(this.total/2), Math.floor(this.tail.length / 2))
				return true
			}
		}

		for (var i = 0; i < s.tail.length; i++){
			d = dist(s.tail[i].x, s.tail[i].y, this.x, this.y)
			if(d<10){
				for (var k = 0; k<Math.ceil(this.total/2); k++){
					pickLocation()
				}
				this.total=Math.floor(this.total/2)
				this.tail=this.tail.splice(Math.floor(this.total/2), Math.floor(this.tail.length / 2))
				return true
			}
		}

		return false
	}

	this.eat = function(poses){
		eaten=false
		for (var i = 0; i<poses.length; i++){
			pos=poses[i]
			d=dist(this.x, this.y, pos.x, pos.y)
			if(d<scl){
				this.total++
				poses.splice(i, 1)
				eaten = true
			}
		}
		return eaten
	}



	this.dir = function(x, y){
		this.xspeed=x
		this.yspeed=y
	}

	this.show = function(){
		noStroke()
		fill(255, 255, 255)
		rect(this.x, this.y, scl, scl)
		for (var i = 0; i<this.tail.length; i++){
			fill(this.color[0], this.color[1], this.color[2])
			rect(this.tail[i].x, this.tail[i].y, scl, scl)
		}
	}
}
