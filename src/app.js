import { fromEvent } from 'rxjs';
import { debounceTime, tap, switchMap } from 'rxjs/operators';

/* Boring, no RX! */

var input = document.getElementById('name');
var output = document.getElementById('output');
var update = () => setTimeout(() => output.innerText = input.value, 0);

input.addEventListener("keydown", update);

/* Cool, use RX debounce! */

var input_debounce = document.getElementById('name_debounce');
var output_debounce = document.getElementById('output_debounce');

fromEvent(input_debounce, 'keydown').pipe(
    tap(() => {
        output_debounce.innerText = "";  
        input_debounce.style = 'background-color: lightgray';
    }),
    debounceTime(1000),
    switchMap(async () => await CheckPassword(input_debounce.value))
).subscribe(() => output_debounce.innerText = input_debounce.value);

/* Simulate a web service */

async function CheckPassword(password) {

    console.log(password);

    var result = password.endsWith('a');
    var time = Math.floor((Math.random() * 2 + 1) * 1000);

    await new Promise(resolve => setTimeout(resolve, time));

    if(result)
        input_debounce.style = 'background-color: #dfd';
    else
        input_debounce.style = 'background-color: #fdd';

    console.log(result);

    return result;
}