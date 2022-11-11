# Development In-Progress..

![dtps-logo 1 (1)](https://user-images.githubusercontent.com/117165113/199227886-15adf39f-829f-4268-afcf-36315cb1bee6.svg)


[![License: Aximsoft(MIT)](https://img.shields.io/badge/License-MIT-orange.svg)](https://opensource.org/licenses/MIT)  


An interactive `Date and Time Picker` for SolidJS.

# Installation

__npm:__
```sh![dtps-logo 1](https://user-images.githubusercontent.com/117165113/199227572-f05f9b19-5d69-4414-8827-f22bcb5ab425.svg)
npm install date-time-picker-solid
```
__yarn:__

```sh
yarn add date-time-picker-solid
```

## Example
Here is an example of a basic app using DateTimePicker component:

```sh
import { DateTimePicker } from 'date-time-picker-solid'

function App() {
  return <DateTimePicker currentDate={moment().toDate()} />;
}
```

## What's new
UI / Theme Update

# Preview
![Group 4602](https://user-images.githubusercontent.com/94821587/199963039-71bdae5f-915d-4a4b-aa1d-20afdfa027d9.png)


# Properties
| Props | Type | Default Value | Discription |
|------ | ------| ------ | ------ |
| currentDate | `Date/string` | | Mandatory Field, default date for the calendar.|
|dateFormat|`string`| `DD MMM, YYYY` | Displayed date format. |
|enableDateRangeSelector|`boolean`| `False`| Enables date Range Selection. |
|prevDate|`Date` |`moment().startOf('weeks')`| Start Date of range selection.|
|minDate|`Date` |`undefined`| Start Date. |
|maxDate|`Date` |`undefined`| End Date. |
|customizeRangeSelectedDates|`string`|`''`| Add a class name to customize the selected date range. |
| __HEADER SECTION__ |
|headerMonthFormat|`string`|`MMM`| Desired month format displayed in the header. |
|headerYearFormat|`string`|`YYYY`| Header year view. |
|enableArrowNavigation|`boolean`|`True`| Enables/Disables the navigation. |
|customizeLeftArrow|`string`|`''`| Add a class name to customize left arrow. |
|customizeRightArrow|`string`|`''`| Add a class name to customize right arrow. |
|customizeActiveMonth|`string`|`''`| Add a class name to customize calendar view. |
|__SECTION 1__|
|enableSelectedDate|`boolean`|`True`| Display selected date.|
|enableSelectedDateEditor|`boolean`|`True`| Makes selected date editable. |
|customizeSelectedDate|`string`|`''`| Add a class name to customize selected date view. |
|enableTodayNavigator|`boolean`|`False`| Enables today navigating button.|
|customizeTodayNavigator|`string`|`''`| Add a class name to customize today button. |
|__VIEW SECTION__|
|enableCalendarViewType|`boolean`|`False`| Enables Calendar type switching button.|
|activeCalendarView|`day/month/year` |`day`| Active view |
|cutomizeCalendarViewButtons|`string`|`''`| Add a class name to customize view type buttons. |
|__PICKER SECTION__|
|customizeListView|`string`|`''`| Add a class name to customize the list. |
|customizeListHeader|`string`|`''`| Add a class name to customize the list header. |
|customizeYearLeftNavigationArrow|`string`|`''`| Add a class name to customize the year view left arrow navigator. |
|customizeYearRightNavigationArrow|`string`|`''`| Add a class name to customize the year view right arrow  navigator. |
|__TIME VIEW SECTION__|
|enableTimeView|`boolean`|`False`| Enables Time view in calendar.|
|enableTimeEditing|`boolean`|`False`| Enables Time editing option in calendar.|
|customizeTimeViewSwitch|`string`|`''`| Add a class name to customize the time view toggle button. |
|customizeTimeInputField|`string`|`''`| Add a class name to customize the time input field. |
|customizeTimeUpdateButton|`string`|`''`| Add a class name to customize the time update button. |
|customizeConsolidateTimeView|`string`|`''`| Add a class name to customize the time day and view element. |
|customizeTimeDownArrow|`string`|`''`| Add a class name to customize the time increase buttons. |
|customizeTimeUpArrow|`string`|`''`| Add a class name to customize the time decrease buttons. . |
|renameTimeUpdateButton|`string`|`''`| To rename the update button. |
|__OUTPUT__|
|calendarResponse|`(props: type)=>void`|||Callback to get the values|

# Dependencies
[<img src="https://user-images.githubusercontent.com/94821587/199000964-80e84838-7f3f-49f9-9a91-6bcf32f9c87f.svg" alt="typescript" width="40" height="40" />](https://www.solidjs.com/)
[<img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg" alt="typescript" width="40" height="40"/>](https://www.typescriptlang.org/)
[<img src="https://user-images.githubusercontent.com/94821587/199001054-6d046033-4914-4b52-9fde-081e749618d4.svg" alt="typescript" width="40" height="40"/>](https://momentjs.com/)
[<img src="https://user-images.githubusercontent.com/94821587/199011459-d948644b-d0c5-4a14-8809-96bf5508edc9.png" alt="typescript" width="40" height="40"/>](https://www.w3.org/Style/CSS/Overview.en.html)

# License
`MIT`
