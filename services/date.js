const string = '~`!1@2#3$4%5^6&7*8(9)0_-+=|QqWwEeRrTtYyUuIiOoPp{[}]AaSsDdFfGgHhJjKkLl:;ZzCcVvBbNnMm<,>.?/';

let token = '';

for (let i = 0; i < 300; i ++) {
    token += string[Math.floor(Math.random() * string.length)];
}

console.log(token);