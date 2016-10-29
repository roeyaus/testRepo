const pp = require('poisson-process')

p = pp.create(30 * 1000, function message() {
	var currentdate = new Date();
var datetime =currentdate.getHours() + ":" 
+ currentdate.getMinutes() + ":" + currentdate.getSeconds();
  console.log(datetime)
  //upon each car arrival we assign a free worker to park it
  
})

p.start()