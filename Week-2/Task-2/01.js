function Total_bill() {
    let price = prompt("Enter Prices of items seprated by commas(Like this eg. 12, 345, 26, etc) : ");
    let price_array = price.split(",").map(Number);
    let Total_bill = 0;
    let i;

    for (i = 0;i<price_array.length;i++ ) {
        Total_bill = Total_bill + price_array[i];
    }
    console.log(`Your number of items is ${price_array.length}, and your total Bill is $${Total_bill}.`);

}

Total_bill()