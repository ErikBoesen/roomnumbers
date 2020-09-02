const number = document.getElementById('number'),
      explanation = document.getElementById('explanation');

function instruct() {
    explanation.textContent = '[Type a valid suite/room number to see an explanation.]';
}
instruct();
number.focus();


const expression = /^([A-Z]+)(\d+)(\d)([A-Z]+)?$/;
number.oninput = function() {
    result = this.value.toUpperCase().match(expression);
    if (result) {
        let entryways = result[1],
            floor = result[2],
            suite = result[3],
            room = result[4];
        response = ('Your suite can be accessed through entryway' + (entryways.length > 1 ? 's' : '')
                    + ' ' + verbalize_list(entryways) + ', '
                    + 'is on floor ' + floor + ', and is suite #' + suite + ' on that floor.');
        if (room) {
            response += ' Your own room is room ' + room + ' within your suite.';
        }
        explanation.textContent = response;
    } else {
        instruct();
    }
}

function verbalize_list(items) {
    items = items.split('');
    if (items.length > 1) {
        last = items.pop();
        if (items.length > 1) {
            items[items.length - 1] += ',';
        }
        items[items.length - 1] += ' and ' + last;
    }
    return items.join(', ');
}
