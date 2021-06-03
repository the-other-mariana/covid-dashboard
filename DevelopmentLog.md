## 05-09-2021

The repository was created on Github with the covid.py file that exported a sample dataframe.

## 05-16-2021

A jupyter notebook was added as a playground code for testing our pandas processing queries.
We started to think about some queries to have in our visualizations.

## 05-21-2021

The Django web application was built and structured.
Dataframe excel file that covid.py exported was now imported to Django Admin to be represented as a database.

## 05-25-2021

The index endpoint was developed so that through a form, the backend redirects you to the visualization html you want to see, using a GET request.
Then after some trial and errors, we could define how and where to place our pandas processing of the database. We started to develop the first two visualizations:

- Visualization 1: 

This one consists of showing the Health Pre-conditions that hospitalized Covid patients had. At first, we made it as a bar chart that only showed who smoked (tabaquism).
But then, we modified the backend so that pandas gave a json of all the different conditions and made an array of json objects to send to the frontend.
This was the most challenging part, because the map of json objects had to be converted into a 'safe string' differently that how it would be had we done it just with a single json.
After some research and trials, we found a way to send this array of json objects and make the bar chart dynamic, in the sense that you can now choose the Health Condition.
We also added some transitions to the bars so that it looked better. This visualization was challenging in the backend part.

## 05-26-2021

- Visualization 2:

This one consisted of showing now the evolution through time of Covid cases, during the first week. This one was now a circle chart, where the circle's radius represented how many cases appeared on that day.
The circles moved through the days and changed its radius and y position, so that the user could see how the increase and decrease of cases looked like everyday, with a dynamic slider and play button.
We added some transitions to the circles so that it looked as though they were floating through time. But, we felt that they would look better if they had also the number of cases in the center of every circle.
This was with the purpose of making the circles more concrete in what they were representing. This took more time than expected, because the text labels where overlapping each other.
The axes were a big challenge as well as the scales, because we had to adjust them to the kind of value we wanted to see in the chart. We stopped working because we were tired. 

## 05-27-2021

We had some trouble setting up the django app for all teammates, so we created a README file with the instructions to make it work, so that we did not forget them everytime we wanted to run the app.

## 05-29-2021

- Visualization 3:
Added the initial files that would be used for this visualization. Also, the first attempt to add the queries to get the data of the death rates of COVID-19 and parse them into json.


## 05-30-2021

- Visualization 2:

Finally, we figured out how to fix the overlapping of labels in the circles, and it was quite simple!, we just had to append the text of the number of the current circles, instead of appending a text label for each one.
Then, also we needed to select them by class only and remove them at every update, so that the numbers on screen where just the ones of the current circles. This visualization was finished finally!
Unlike the first visualization, this one was challenging in the frontend side.

## 05-30-2021 

 - Visualization 3:

Added the data needed as a json for visualization 3. Created a basic pie chart for the data that updates according to the current gender choice with the death rates of the selected gender group. 
   
## 06-2-2021

 - Visualization 3:

Added the labels of the pie chart detailing what the slice represents and the real value of it.

- Visualization 4:

Passing the data for this chart was quite challenging also, also due to the fact that the data would be summarized, instead of mainly extracted. The purpose of the graph is to be a stacked chart showing the cumulative of cases through time, but we are running out of time and probably won't look as we would like it to.