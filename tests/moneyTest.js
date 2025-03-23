import { formatCurrency } from "../scripts/utils/money.js";

console.log('test suite: formatCurrency')

function testCurrency(inputValue, outputString) {
    console.log(`converts ${inputValue} into dollars`);

    if (formatCurrency(inputValue) === outputString) {
        console.log("passed");
    } else {
        console.log("failed");
    }
}

testCurrency(2095, "20.95");
testCurrency(0, "0.00");
testCurrency(2000.5, "20.01");
