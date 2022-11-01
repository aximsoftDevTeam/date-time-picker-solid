import moment from 'moment';
import type { Component } from 'solid-js';

import { DateTimePicker } from './component';

const App: Component = () => {
  return (
    <div class='parent'>
      <DateTimePicker
        currentDate={moment().toDate()}
      />
    </div>
  );
};

export default App;