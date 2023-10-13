import { Component } from '@angular/core';
import { TextToSpeechService } from '../services/text-to-speech.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
})
export class DateTimePickerComponent {
  minuteStep: number = 5;
  meridian = true;
  selectedDateTime: any;
  localStoredSelectedTime: string = '';
  timeDifference: string = '';
  hasAnnounced: boolean = false;
  timeInLocalStorage: any;
  dateInLocalStorage: any;
  time: { hour: number; minute: number } = { hour: 12, minute: 0 };
  currentTime: Date = new Date();

  constructor(
    private ttsService: TextToSpeechService,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    const storedDate = localStorage.getItem('selectedDates');
    if (!storedDate) {
      const currentDate = new Date();
      this.selectedDateTime =
        this.datePipe.transform(currentDate, 'MMM dd, yyyy') || '';
      localStorage.setItem('selectedDates', this.selectedDateTime);
    } else {
      // If a date is already in localStorage, load it into the component
      this.selectedDateTime = storedDate;
    }

    this.getLocalStorageData();
    this.updateTimeDifference();
    // console.log(this.localStoredSelectedTime);
    setInterval(() => {
      this.getLocalStorageData();
    }, 1000); // Update every second
  }

  onDateChange(): void {
    let selectedDates =
      this.datePipe
        .transform(this.selectedDateTime, 'MMM dd, yyyy')
        ?.toString() || '';
    console.log('selectedDates', selectedDates);

    localStorage.setItem('selectedDates', selectedDates);
  }

  onTimeChange(): void {
    const selectedTime = this.time;
    // Round the selected time to the nearest 5-minute interval using Math.ceil
    const minutes = selectedTime.minute;
    const roundedMinutes = Math.min(
      59,
      Math.ceil(minutes / this.minuteStep) * this.minuteStep
    );
    selectedTime.minute = roundedMinutes;

    // Update the selected time
    this.time = selectedTime;

    // Increase the minuteStep to 5 minutes
    this.minuteStep = 5;

    // console.log('this.time', this.time);
    let times = this.convertTimeToAMPM(this.time);
    // console.log('times', times);
    localStorage.setItem('selectedTime', times);
  }

  convertTimeToAMPM(timeObj: any) {
    // Extract hour and minute from the time object
    const { hour, minute } = timeObj;

    // Determine AM or PM based on the hour
    const period = hour >= 12 ? 'PM' : 'AM';

    // Convert the hour to 12-hour format and pad the minute with leading zeros
    const formattedHour = (hour % 12 === 0 ? 12 : hour % 12)
      .toString()
      .padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');

    // Create a formatted string
    const formattedTime = `${formattedHour}:${formattedMinute} ${period}`;

    return formattedTime;
  }

  parseTime(timeString: string): { hour: number; minute: number } | null {
    // Implement your logic to parse time from the stored string
    // For example, split the string and extract the hour and minute
    const parts = timeString.split(':');
    if (parts.length === 2) {
      const [hourStr, minuteStr] = parts;
      const hour = parseInt(hourStr, 10);
      const minute = parseInt(minuteStr, 10);
      return { hour, minute };
    } else {
      return null;
    }
  }

  getLocalStorageData() {
    this.timeInLocalStorage = localStorage.getItem('selectedTime') || '';
    if (this.timeInLocalStorage) {
      // Parse the stored time and meridian
      const [timePart, meridian] = this.timeInLocalStorage.split(' ');
      const [hour, minute] = timePart.split(':');
      const isAM = meridian === 'AM';

      const parsedTime = {
        hour: parseInt(hour, 10),
        minute: parseInt(minute, 10),
      };

      // Adjust the hour if it's PM
      if (!isAM && parsedTime.hour < 12) {
        parsedTime.hour += 12;
      }

      this.time = parsedTime;
      // console.log('this.time', this.time);
    }
    this.dateInLocalStorage = localStorage.getItem('selectedDates') || '';
    // Combine date and time into a single string
    this.localStoredSelectedTime =
      this.dateInLocalStorage + ' ' + this.timeInLocalStorage;
    // console.log('localStoredSelectedTime', this.localStoredSelectedTime);
    this.updateTimeDifference();
  }

  updateTimeDifference() {
    // Get the current time in the user's timezone
    const currentTime = new Date();
    let countdownInterval;

    const localStoredSelectedTimeDate = new Date(this.localStoredSelectedTime);
    const timeDiffMillis =
      localStoredSelectedTimeDate.getTime() - currentTime.getTime();

    if (timeDiffMillis <= 0) {
      clearInterval(countdownInterval);
      this.timeDifference = '00:00:00';
      return;
    }

    // Calculate the time difference in hours and minutes
    const hoursDiff = Math.floor(timeDiffMillis / (1000 * 60 * 60));
    const minutesDiff = Math.floor(
      (timeDiffMillis % (1000 * 60 * 60)) / (1000 * 60)
    );
    const secondsDiff = Math.floor((timeDiffMillis % (1000 * 60)) / 1000);
    const remainingSeconds = hoursDiff * 3600 + minutesDiff * 60 + secondsDiff;

    if (remainingSeconds % 3600 === 0) {
      let message = `${minutesDiff} minutes until the next race, ${minutesDiff} minutes`;

      if (hoursDiff !== 0) {
        message = `${hoursDiff} hour until the next race, ${hoursDiff} hour`;
      }

      if (hoursDiff === 0 && minutesDiff === 0 && secondsDiff === 0) {
        message = 'The next RACE is NOW ready to start';
      }
      this.ttsService.speak(message);
    }
    if (remainingSeconds === 1800) {
      // console.log('Announcing 30 minutes remaining');
      this.ttsService.speak('30 minutes until the next race, 30 minutes ');
      this.hasAnnounced = true;
    } else if (remainingSeconds === 900) {
      this.ttsService.speak('15 minute until the next race, 15 minutes ');
      this.hasAnnounced = true;
    } else if (remainingSeconds === 600) {
      this.ttsService.speak('10 minute until the next race, 10 minutes ');
      this.hasAnnounced = true;
    } else if (remainingSeconds === 300) {
      this.ttsService.speak('5 minute until the next race, 5 minutes ');
      this.hasAnnounced = true;
    } else if (remainingSeconds === 240) {
      this.ttsService.speak('4 minute until the next race, 4 minutes ');
      this.hasAnnounced = true;
    } else if (remainingSeconds === 180) {
      this.ttsService.speak('3 minute until the next race, 3 minutes ');
      this.hasAnnounced = true;
    } else if (remainingSeconds === 120) {
      this.ttsService.speak('2 minute until the next race, 2 minutes ');
      this.hasAnnounced = true;
    } else if (remainingSeconds === 60) {
      this.ttsService.speak('1 minute until the next race, 1 minute ');
      this.hasAnnounced = true;
    }

    // -------------------------------
    // Check if timeDifference contains NaN
    if (isNaN(hoursDiff) || isNaN(minutesDiff) || isNaN(secondsDiff)) {
      this.timeDifference = '00:00:00'; // Display "Set time" for NaN values
    } else {
      // Update the timeDifference variable with the formatted string
      this.timeDifference = `${this.formatValue(hoursDiff)}:${this.formatValue(
        minutesDiff
      )}:${this.formatValue(secondsDiff)}`;
    }
  }

  formatValue(params: any) {
    return params < 10 ? '0' + params : params;
  }
}
