const number = document.getElementById('number'),
      explanation = document.getElementById('explanation');

const expression = /^([A-Z]+)(\d)(\d+)([A-Z]+)?$/;
number.onchange = function() {
    result = this.value.match(expression);
    if (result) {
        let _, entryways, floor, suite, room = result;
        response = 'Your suite can be accessed through entryway' + (entryways.length > 1 ? 's' : '') +
                ' ' + verbalize_list(entryways) + ', '
                'is on floor ' + floor + ', and is suite #' + suite + ' on that floor.';
        if (room) {
            response += ' Your own room is room ' + room + ' within your suite.';
        }
        explanation.textContent = response;
    }
}

function verbalize_list(items) {
    items = items.split()
    if (items.length > 1) {
        last = items.pop();
        items[items.length - 1] += ' and ' + last;
    }
    return ', '.join(items);
}
