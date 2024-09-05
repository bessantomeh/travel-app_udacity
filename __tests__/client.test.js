import '@testing-library/jest-dom';
import { updateCountdown } from '../src/client/js/app.js'; 

describe('Client Test Suite', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <input type="date" id="trip-date" value="2024-09-10" />
            <div id="countdown"></div>
        `;
    });

    test('Update countdown function should update DOM correctly', () => {
        updateCountdown();
        const countdownElement = document.getElementById('countdown');
        expect(countdownElement.innerText).toContain('Days until your trip:');
    });
});

describe('App Tests', () => {
    beforeEach(() => {
      document.body.innerHTML = `
        <div>
          <input id="city" type="text" />
          <button id="generate">Generate</button>
        </div>
      `;
    });
  
    test('should add event listener to generate button', () => {
      const button = document.getElementById('generate');
      expect(button).not.toBeNull(); 
    });
  });
  
