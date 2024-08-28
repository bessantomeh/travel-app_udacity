import { mainFunction, updateCountdown } from './js/app';
import './styles/main.scss';

mainFunction();

document.getElementById('trip-date').addEventListener('change', updateCountdown);

document.getElementById('end-date').addEventListener('change', updateCountdown);
