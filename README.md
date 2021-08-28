# My Self Affirmations

My Self Affirmation is a vs code extension that displays a self affirmation from a configurable list of self affirmations on a set time interval

## Features

- Provides a set of 90 default self affirmations.
- Displays a random self affirmaiton on a default interval of 30 minutes.

## Extension Settings

- Frequency of self affirmations can be configured with `my-self-affirmations.value` and `my-self-affirmations.unit` settings. The unit is an enum type of `s`, `m`, `h` for seconds, minutes and hours. E.g. for displaying affirmations every hour:



This extension contributes the following settings:

* `my-self-affirmations.affirmations`: Overrides the default self affirmations. Expects a json array of strings.
* `my-self-affirmations.timeInterval.unit`: Sets the time interval unit for displaying self affirmations. `s`, `m`, `h`, for seconds, minutes, and hours. Default is `m` 
* `my-self-affirmations.timeInterval.value`: Sets the value of the time interval. Default is 30.

Examle custom 2 hour interval:
```
"my-self-affirmations.timeInterval.unit": "h",
"my-self-affirmations.timeInterval.value": 2
```