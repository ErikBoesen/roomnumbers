const number = document.getElementById('number'),
      explanation = document.getElementById('explanation');

const BUILDINGS = {
    'W': 'Welch Hall',
    'F': 'Farnam Hall',
    'D': 'Durfee Hall',
    'L': 'Lawrance Hall',
    'V': 'Vanderbilt Hall',
    'LW': 'Lanman-Wright Hall',
    'BK': 'Berkeley College',
    'BR': 'Branford College',
    'DC': 'Davenport College',
    'ES': 'Ezra Stiles College',
    'JE': 'Jonathan Edwards College',
    'BF': 'Benjamin Franklin College',
    'GH': 'Grace Hopper College',
    'MC': 'Morse College',
    'MY': 'Pauli Murray College',
    'PC': 'Pierson College',
    'SY': 'Saybrook College',
    'SM': 'Silliman College',
    'TD': 'Timothy Dwight College',
    'TC': 'Trumbull College',
    'BM': 'Bingham Hall',
}


function instruct() {
    explanation.textContent = '[Type a valid suite/room number to see an explanation.]';
}
instruct();
number.focus();


const expression = /^([A-Z]{1,2}-)?([A-Z]+)(\d+)(\d)([A-Z]+)?$/;
number.oninput = function() {
    result = this.value.toUpperCase().match(expression);
    console.log(result);
    if (result) {
        let building_code = result[1],
            entryways = result[2],
            floor = result[3],
            suite = result[4],
            room = result[5];
        response = '';
        let building = undefined;
        if (building_code) {
            // Remove trailing hyphen
            // TODO: figure out a way to do this with regex
            building_code = building_code.substring(0, building_code.length - 1);
            building = BUILDINGS[building_code] || 'an unknown building';
            response += 'You live in ' + building + ' (' + building_code + '). ';
        }
        response += ('Your suite can be accessed through entryway' + (entryways.length > 1 ? 's' : '')
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
