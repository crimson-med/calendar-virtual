# Calendar Virtual

Should be named virtual-calendar but someone already owns that package :(

This package was made to easily manage virtual calendars.
This came from the need that in a game i'm building there are events that can run for any length in the real world but would always translate to 1 year in game.

**Example:**

```
Event 1:
 - length: 1 week
 - game length: 1 year
 - half of the week would translate to 6 months in game

 ----------------------------------------

 Event 2:
 - length: 1 month
 - game length: 1 year
 - 15 days would translate to 6 months in game

 ----------------------------------------
 ```

 ---

 ## Installation

 Simply add the package to your project:

 ```bash
 yarn add calendar-virtual
 ```

 Or through npm: 

 ```bash
npm add calendar-virtual
 ```

 ## Usage

 First you need to create a virtual calendar

 ```ts
import { CalendarVirtual } from 'calendar-virtual'

const now = new Date()

const virtualCalendar = new CalendarVirtual({
    realLength: 15
    virtualLength: 365
    genesisDate: now
})
 ```

 ### Configuration

 When creating a new `CalendarVirtual` you will have to specify the following elements in the configuration:

 - `realLength`: This reprensents the number of days the real event will take
 - `virtualLength`: This reprensents the number of days the virtual event will take
 - `genesisDate`: This reprensents date at which the virtual calendar will be initiated

 ### Utilities

 Here are the various utilities you can use with the virtual calendar.

`virtualGenesisDate`

> This will get the first date of the virtual calendar.

```
returns Date
```

---

`virtualEndDate`

> This will get the end date of the virtual calendar (genesisDate + virtualLength).

```
returns Date
```
---

`distanceToEnd(dateFrom?: Date)`

> Will give a readable string of how far the date given as parameter or the current date (if no param passed) is from the end date.

```
returns string
```

Example:

```
12 months
5 days
```

---

`daysToEnd(dateFrom?: Date)`

> Will give the number of days from the date given as parameter or the current date (if no param passed) to the end date.

```
returns number
```

---

`isPastEnd(dateFrom?: Date)`

> Will tell if the date given as parameter or the current date (if no param passed) is past the end of the virtual calendar.

```
returns boolean
```

---

`isPastGenesis(dateFrom?: Date)`

> Will tell if the date given as parameter or the current date (if no param passed) is past the genesis of the virtual calendar.

```
returns boolean
```

---

`isBeforeEnd(dateFrom?: Date)`

> Will tell if the date given as parameter or the current date (if no param passed) is before the end of the virtual calendar.

```
returns boolean
```

---

`isBeforeGenesis(dateFrom?: Date)`

> Will tell if the date given as parameter or the current date (if no param passed) is before the genesis of the virtual calendar.

```
returns boolean
```

---

`virtualDate(realDate: Date)`

> Will translate the given real date to its equivalent in the virtual calendar.

```
returns Date
```

---

`realDate(virtualDate: Date)`

> Will translate the given virtual date to its equivalent in the real calendar.

```
returns Date
```

---

## Issues

Please follow the templates when creating an issue at:

https://github.com/crimson-med/calendar-virtual/issues

---

## Author

Burlet Mederic

https://github.com/crimson-med

https://medericburlet.com