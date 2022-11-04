import moment from 'moment';
import type { Component } from 'solid-js';

// import { DateTimePicker } from './component';
import { DateTimePickerVersion2 } from './component/version2.0';

const App: Component = () => {
  return (
    <div class='parent'>
      {/* <DateTimePicker
        currentDate={moment().toDate()}
        enableCalendarViewType
        enableTimeView
        enableTodayNavigator
      /> */}
      <DateTimePickerVersion2
        currentDate={moment().toDate()}
        enableCalendarViewType
        enableTimeView
        enableTodayNavigator
      />
    </div>
  );
};

export default App;