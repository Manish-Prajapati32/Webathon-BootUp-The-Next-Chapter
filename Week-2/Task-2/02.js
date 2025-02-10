function Degree_to_Fahrenheit() {
    let degree = prompt("Enter your temprature : ");
    degree = Number(degree);
    Fahrenheit = (degree * 9/5) + 32;
    console.log(`When you convert ${degree}°C to Fahrenheit, it becomes ${Fahrenheit}°F.`);
}

Degree_to_Fahrenheit()