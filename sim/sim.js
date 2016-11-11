const pp = require('poisson-process')

const hoursInShift = 9
const speedupFactor = 400
const hourMS = 3600 * 1000 / speedupFactor
const totalShiftTimeMS = hoursInShift * hourMS
const totalParksInShift = 50
const avgTimeBetweenArrivalsMS = totalShiftTimeMS / totalParksInShift
const avgParkingTimeMS = 3 * hourMS
const numEmployeesInShift = 4
const numParkEmployees = 1
const avgTimeForParkingOrReturningMS =  22 * 60 * 1000 / speedupFactor
const timeBetweenChecksMS = 60 * 1000 / speedupFactor

var elapsedTimeMS = 0
var carNumber = 0
var freeParkWorkersArray = []
var freeReturnWorkersArray = []
var waitingCarsArray = []
var parkedCarsArray = []
var waitingToReturnCarsArray = []
var totalParkingTimeMS = 0
var carsTurnedAway = 0
var carsParked = 0

var numCarsReturned = 0
var totalReturnWaitTimeMS = 0

var employeeCostPerShift = 35 * 9
var totalEmployeeCost = employeeCostPerShift * numEmployeesInShift
var hourlyParkingRate = 30
var parkRatePerMinute = hourlyParkingRate / 60
//var parkRatePerMS = hourlyParkingRate
var hourlyParkingCost = 10
var parkCostPerMinute = hourlyParkingCost / 60
//var parkCostPerMS = hourlyParkingCost / 3600 / 1000

function parkCar() {
	if (waitingCarsArray.length > 0) {
		if (freeParkWorkersArray.length > 0)
		{
		  	console.log("we have free workers. assign a worker to park it")
		  	freeParkWorkersArray.pop()
		  	let car = waitingCarsArray.pop()
			setTimeout(function() {
		  		parkedCarsArray.push(car)
		  		freeParkWorkersArray.push(1)
		  		console.log("worker has parked the car. parkedCarsArray size : ", parkedCarsArray.length)
		  		carsParked++
		  		let s = avgParkingTimeMS
		  		setTimeout(function () {
		  			console.log("car ", car.id, " requested")
		  			let pt = parkedCarsArray.find((c) => c.id == car.id ).parkingTimeMS
		  			totalParkingTimeMS += (pt < hourMS ? hourMS : pt)
		  			parkedCarsArray.splice(parkedCarsArray.indexOf(car), 1)
		  			waitingToReturnCarsArray.push({id : car.id, returnWaitTimeMS : 0})
		  			returnCar()
		  		}, s)	
		  	}, avgTimeForParkingOrReturningMS) 
		  }
		  else
		  {	
		  	//console.log("no workers, car waits. waitingCarsArray size : ", waitingCarsArray.length)
		  	//console.log("no park workers, car turned away...")
		  	waitingCarsArray.pop()
		  	carsTurnedAway++
		  }
	}
	else 
	{
		//console.log("no cars to park")
	}
	
}

function returnCar() {
	if (waitingToReturnCarsArray.length > 0) {
		console.log("we have a parked car, do we have anyone to return it?")
		if (freeReturnWorkersArray.length > 0) {
		
			freeReturnWorkersArray.pop()
			totalReturnWaitTimeMS += waitingToReturnCarsArray[0].returnWaitTimeMS
			console.log("totalReturnWaitTimeMS", totalReturnWaitTimeMS)
			waitingToReturnCarsArray.shift()
			numCarsReturned++
			setTimeout(function() {
		  		freeReturnWorkersArray.push(1)
	  			console.log("worker has returned the car. waitingToReturnCarsArray size : ", waitingToReturnCarsArray.length)
  	}, avgTimeForParkingOrReturningMS) 
		}
		else
		{
			//console.log("noone to return the car!")

		}
	}
	else
	{
		//console.log("no cars waiting to be returned")
	}
}

const arrivalProcess = pp.create(avgTimeBetweenArrivalsMS, function message() {
  console.log('A car wants to be parked!')
  waitingCarsArray.push({ id : carNumber++ ,parkingTimeMS : 0})
  parkCar()
  //upon each car arrival we assign a free worker to park it
  
})


//init free workers array
for (var i =0; i < (numParkEmployees); i++) {
	freeParkWorkersArray.push(1)
}
for (var i =0; i < (numEmployeesInShift - numParkEmployees); i++) {
	freeReturnWorkersArray.push(1)
}

console.log("starting simulation, total run time (MS): ", totalShiftTimeMS)
arrivalProcess.start()

setInterval(function () {
	elapsedTimeMS += timeBetweenChecksMS
	if (elapsedTimeMS >= totalShiftTimeMS) 
	{
		//shift has ended
		parkedCarsArray.forEach((car) => {
		totalParkingTimeMS += car.parkingTimeMS
	})
	var totalParkingTimeInMinutes = totalParkingTimeMS * speedupFactor / 60 / 1000
		console.log("cars parked : ", carsParked)
		console.log("cars turned away : ", carsTurnedAway)
		console.log("average return car wait time in minutes", (totalReturnWaitTimeMS / numCarsReturned) * speedupFactor / 60 / 1000)
		console.log("******** Finance ********")
		console.log("totalParkingTimeInMinutes : ", totalParkingTimeInMinutes)
		console.log("total Revenue : ", totalParkingTimeInMinutes * parkRatePerMinute)
		console.log("total cost (parking cost + salary) : ", ((totalParkingTimeInMinutes * parkCostPerMinute  ) + totalEmployeeCost))	
		process.exit(0)
	}
	//console.log("CHECK. freeParkWorkersArray : ", freeParkWorkersArray.length, ", freeReturnWorkersArray : ", freeReturnWorkersArray.length )
	//console.log(" waitingCarsArray : ", waitingCarsArray.length, ", parkedCarsArray : ", parkedCarsArray.length)
	//console.log(" waitingToReturnCarsArray : ", waitingToReturnCarsArray.length)
	console.log("elapsed time : " , elapsedTimeMS, ", totalParkingTimeMS : ", totalParkingTimeMS)
	//console.log(parkedCarsArray)
	//update all parked cars clocks
	parkedCarsArray.forEach((car) => {
		car.parkingTimeMS += timeBetweenChecksMS
	})
	waitingToReturnCarsArray.forEach((car) => {
		car.returnWaitTimeMS += timeBetweenChecksMS
	})
	console.log(waitingToReturnCarsArray)

	parkCar()
	returnCar()
}, timeBetweenChecksMS)
