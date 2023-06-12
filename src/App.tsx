import type { Component } from 'solid-js';

import { DateTimePicker } from './component';

const App: Component = () => {
  return (
      <div class='parent'>
        <DateTimePicker
          currentDate={new Date()}
          enableCalendarViewType
          enableDateInputFieldEditor
          enableTimeView
          enableTodayNavigator
          ednableTimeEditing 
          enableDateInputField
        />
      </div>

  );
};

export default App;