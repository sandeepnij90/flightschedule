# Flight Scheduling Webapp

**Running the project**

* Install the dependencies`npm install`
* Run the code `npm run dev`
* Test the code `npm run test`

## Assumptions

* Api will not be down (didn't add error handling for API)
* Ident number is unique for each aircraft
* Id is unique for each flight
* Turn around time is not considered for utilisation 

## Things I would have done (ran out of time)

* If there was a series of aircrafts clicking the aircraft will reset the schedule and flights
* More extensive tests
* Clean up code (could use a bit more tidy up)
* Clicking the last item in the rotation will remove it and add it back to flights
* Having a button to clear the schedule
* Nicer loading state (rather than just one big block)
* Add in pagination
