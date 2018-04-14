var XLSX = require('xlsx');
var path = require('path');

function to_json(workbook) {
    var result = {};
    workbook.SheetNames.forEach(function (sheetName) {
        var roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
        if (roa.length > 0) {
            result[sheetName] = roa;
        }
    });
    return result;
}


function test() {
    filePath = path.join(__dirname, 'test.xls');
    var workbook = XLSX.readFile(filePath);
    console.log('workbook : ' + workbook.SheetNames);
    var first_sheet_name = workbook.SheetNames[0];
    var translate_data = to_json(workbook)[first_sheet_name];
    // console.log(translate_data);
    var result = {};
    var maximum_number = 0;
    translate_data.forEach(function (translate) {
        var number = translate['__EMPTY'];
        var item = translate['__EMPTY_1'];
        var item_desc = translate['__EMPTY_2'];
        if (!isNaN(number)) {
            number *= 1;
            result[number] = {item : item, item_desc : item_desc};
            if (number > maximum_number) {
                maximum_number = number;
            }
        }

        number = translate['__EMPTY_4'];
        item = translate['__EMPTY_5'];
        item_desc = translate['__EMPTY_6'];
        if (!isNaN(number)) {
            number *= 1;
            result[number] = {item : item, item_desc : item_desc};
            if (number > maximum_number) {
                maximum_number = number;
            }

        }

        number = translate['__EMPTY_8'];
        item = translate['__EMPTY_9'];
        item_desc = translate['__EMPTY_10'];
        if (!isNaN(number)) {
            number *= 1;
            result[number] = {item : item, item_desc : item_desc};
            if (number > maximum_number) {
                maximum_number = number;
            }

        }

        number = translate['__EMPTY_12'];
        item = translate['__EMPTY_13'];
        item_desc = translate['__EMPTY_14'];
        if (!isNaN(number)) {
            number *= 1;
            result[number] = {item : item, item_desc : item_desc};
            if (number > maximum_number) {
                maximum_number = number;
            }

        }

        number = translate['__EMPTY_16'];
        item = translate['__EMPTY_17'];
        item_desc = translate['__EMPTY_18'];
        if (!isNaN(number)) {
            number *= 1;
            result[number] = {item : item, item_desc : item_desc};
            if (number > maximum_number) {
                maximum_number = number;
            }

        }

        number = translate['__EMPTY_20'];
        item = translate['__EMPTY_21'];
        item_desc = translate['__EMPTY_22'];
        if (!isNaN(number)) {
            number *= 1;
            result[number] = {item : item, item_desc : item_desc};
            if (number > maximum_number) {
                maximum_number = number;
            }

        }

    });

    console.log('maximum : ' + maximum_number);
    console.log(result);


}

test();