import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

/* Boring, no RX! */

var input = document.getElementById('name');
var output = document.getElementById('output');
var update = () => setTimeout(() => output.innerText = input.value, 0);

input.addEventListener("keydown", update);

/* Cool, use RX debounce! */

var input_debounce = document.getElementById('name_debounce');
var output_debounce = document.getElementById('output_debounce');

fromEvent(input_debounce, 'keydown').pipe(
    debounceTime(1000)
).subscribe(() => output_debounce.innerText = input_debounce.value);