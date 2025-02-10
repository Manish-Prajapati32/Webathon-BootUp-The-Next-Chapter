function largest_Number() {
    let numbers = prompt("Enter the numbers (like this eg. 2,3,5,2,6, etc.) : ")
    let nums_array = numbers.split(",").map(Number)
    let i;
    let Largest_Number = 0;

    for (i = 0;i<nums_array.length;i++) {
        if (Largest_Number < nums_array[i]) {
            Largest_Number = nums_array[i];
        }
    }
    console.log(`The largest number is ${Largest_Number}.`);
}

largest_Number()