import getStreetSweepingSchedule from './getStreetSweepingSchedule.js';
import handleSweepScheduleError from './handleSweepScheduleError.js';
import AutocompleteList from './components/autocompleteList.js';
import SearchField from './components/SearchField.js';
import { debounce } from './utils/throttle-debounce.js';

class SearchController {
  constructor(config) {
    this.container = config.container;
    this.searchField = SearchField();
    this.container.appendChild(this.searchField);

    this.searchField.addEventListener(
      'input',
      debounce(300, this.handleInput.bind(this))
    );
  }

  handleInput(e) {
    let query = e.target.value;
    getStreetSweepingSchedule(`$q=${query}`)
      .then(schedule => {
        if (schedule.error) {
          throw schedule;
        } else {
          this.container.appendChild(AutocompleteList(schedule));
        }
      })
      .catch(handleSweepScheduleError);
  }
}
