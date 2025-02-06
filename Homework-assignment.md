# Frontend Homework Assignment

## Tech stack

We recommend using React, but you can use any (or none) framework or library that you are comfortable with.
You can use UI component library, however visual design is not the main focus of this assignment.

Besides given flexibility please do use <b>TypeScript</b> (if you opt out of this, you can substitute it with JSDocs typings).

## Task

### Task Description

Display list of data from SpaceX API. You can use the following endpoint to get the data: `https://api.spacexdata.com/v3/launches`.

> Do not use pagination for this exercise.

> You can display data in any way you see fit, as long as it is readable and understandable.

Within that list you should display following data:

- Name of the mission
  > (mission_name);
- Flight number
  > (flight_number);
- Launch date
  > (launch_date_utc);
- Payload count. Calculate how many of the were with a type of 'Satellite';
  > (rocket.second_stage.payloads[].f
- Time elapsed since last launch;
  > in hours
- Cost per launch;
  > Based on rocket.rocket_id. query https://api.spacexdata.com/v3/rockets/{{rocket_id}} to get the cost_per_launch

At the very top of the list, display a number that displays how much launches have costed in total.

First item in the list should be the one with the latest launch date.

### Allowing changes

Now, since this is public facing API with data that cannot be changes by us, let's pretend that our WEB application is capable of that!

Now, imagine that you're able to make changes:

- add ability to change cost of the launch;

```
API to change cost of the launch:

PATCH https://api.spacexdata.com/v3/rockets/{{rocket_id}}

{
    "cost_per_launch": 1000000
}
```

- add ability to change payload_type;

```
API to change payload_type:

PATCH https://api.spacexdata.com/v3/payloads/{{payload_id}}

{
  "payload_type": "Satellite"
}
```

When making API calls intended for updating data, do implement optimistic update strategy. When and if API call fails, make sure that data is roll-backed
only after user confirms such action (you can use [prompt](https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt) here);

> You can either Mock API call or handle API call with a delay (5 seconds). In any case, make sure that UI changes are visible. Also, make sure that after failure, data is rolled back only after user is prompted about it.

> Tip: No need to implement form functionality

### Bonus task #1

Now, let's say for one reason or another, you have multiple browser tabs opened (of same WEB App). Implement feature that would notify all browser tabs about changes in
the cost of a launch and would allow them to update their pricing model as well.

> You may use [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API);

### Bonus task #2

Implement feature that would allow user to maintain previous changes even after page refresh.

> You may use [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API);

## Sources for assignment

Relevant information in order to complete the assignment can be found in the following links:

- [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API);
- [Broadcast Channel API](https://developer.mozilla.org/en-US/docs/Web/API/Broadcast_Channel_API);
- [SpaceX API](https://docs.spacexdata.com/).
