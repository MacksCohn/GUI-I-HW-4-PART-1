// Max Cohn
// function to generate the table using simple logic
const MAX_ELEMENTS = 200 * 200;
function Generate(id) {
    const table = document.getElementById(id);
    table.innerHTML = "";
    // get values from the inputs
    const minCol = parseInt(document.getElementById('minCol').value);
    const maxCol = parseInt(document.getElementById('maxCol').value);
    const minRow = parseInt(document.getElementById('minRow').value);
    const maxRow = parseInt(document.getElementById('maxRow').value);
    // validate input
    if (isNaN(minCol) || isNaN(maxCol) || isNaN(minRow) || isNaN(maxRow)) {
        table.insertRow().insertCell().textContent = 'Invalid input';
        return;
    }
    // avoid freezing by limiting max number of elements
    if (((maxRow - minRow) * (maxCol - minCol)) > MAX_ELEMENTS) {
        table.insertRow().insertCell().textContent = 'Table would be too large, must have less than ' + MAX_ELEMENTS + ' cells.';
        return;
    }
    const firstRow = table.insertRow();
    // top corner element
    firstRow.insertCell();
    // add top row header
    for (let i = minCol; i <= maxCol; i++) {
        const heading = document.createElement('th');
        heading.textContent = i;
        heading.className = 'header-top';
        firstRow.appendChild(heading);
    }
    for (let i = minRow; i <= maxRow; i++) {
        const row = table.insertRow();
        // add left side header
        const heading = document.createElement('th');
        heading.textContent = i;
        heading.className = 'header-side';
        row.appendChild(heading);
        // add cells
        for (let j = minCol; j <= maxCol; j++) {
            const cell = row.insertCell();
            cell.textContent = i * j;
        }
    }
    $('#input-form').valid();
}

$.validator.addMethod('IsValidSize', function InRange() {
    const minCol = document.getElementById('minCol').value;
    const maxCol = document.getElementById('maxCol').value;
    const minRow = document.getElementById('minRow').value;
    const maxRow = document.getElementById('maxRow').value;
    return ((maxRow - minRow) * (maxCol - minCol)) <= MAX_ELEMENTS;
}, 'Value would produce a table too large.');

$(function () {
    $('#input-form').validate({
        // found online to validate even on first pass
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        },
        onkeyup: function(element) {
            this.element(element);
            Generate('results');
        },
        rules: {
            minCol: {
                required: true,
                number: true,
                IsValidSize: true,
            },
            maxCol: {
                required: true,
                number: true,
                IsValidSize: true,
            },
            minRow: {
                required: true,
                number: true,
                IsValidSize: true,
            },
            maxRow: {
                required: true,
                number: true,
                IsValidSize: true,
            },
        },
        messages: {
            minCol: {
                IsValidSize: 'Column range would result in a table too large',
                number: 'Input must be a number',
            },
            maxCol: {
                IsValidSize: 'Column range would result in a table too large',
                number: 'Input must be a number',
            },
            minRow: {
                IsValidSize: 'Row range would result in a table too large',
                number: 'Input must be a number',
            },
            maxRow: {
                IsValidSize: 'Row range would result in a table too large',
                number: 'Input must be a number',
            },
        },
    });
    Generate('results');
});
