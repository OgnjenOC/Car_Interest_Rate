
/*using set interval built in function to add a price value of the car 
selected from a car dropdownlist and print the price on the price 
input tag */
var determinePrice = setInterval(grabPrice,4000);

function grabPrice(){

  var getCar = document.getElementById('car').value;

  if(getCar === "Audi"){
    document.getElementById('fetchPrice').value = 20000;
  }else if(getCar === "Bmw"){
    document.getElementById('fetchPrice').value = 30000;
  }else if(getCar ==="Mercedes"){
    document.getElementById('fetchPrice').value = 40000;
  }

}


function calc(){
    
  //get a values from an input fields by their id 
  var getName = document.getElementById('name').value;
  var getCar = document.getElementById('car').value;
  var selectOption = document.getElementsByName('payType');
  var getPurchase;


  //looks at the radio button list and fetch the selected value and assigns it to getPurchase for calculation
  for(i = 0; i < selectOption.length; i++){
        if(selectOption[i].checked){
            getPurchase = selectOption[i].value;
        }
  }
  var getMonths = document.getElementById('duration').value;


/*if user click calculate button and all fields are empty 0 is assigned 
to duration months for not having error conflicts */

  if(getMonths == ''){
    getMonths = 0;
  }


  
  
  
  //make a input values as a text for printing on a html page
  var nodeName = document.createTextNode("Welcome " +getName);
  var nodeCar = document.createTextNode("You selected " +getCar);
  var nodePurchase = document.createTextNode(" and chose " +getPurchase);
  var nodeMonths = document.createTextNode(" option for " +getMonths + " months.");
  
  checkName(getName);

  //create <p> tags
  var parName = document.createElement('p');
  var parCar = document.createElement('p');
  


  //append a <p> tag with a text to <div> tag to print on a page  
  document.getElementById("printFields").appendChild(parName);
  document.getElementById("printFields").appendChild(parCar);

  //create variables for text nodes in order to remove text if user desires by clicking clear button
  var nameText = parName.appendChild(nodeName);
  var carText = parCar.appendChild(nodeCar);
  var purchaseTypeText = parCar.appendChild(nodePurchase);
  var monthsText = parCar.appendChild(nodeMonths);

  
  var totalMonthAmount;
  var totalBiweekAmount;
  var totalWeekAmount;
  var monthlyRate;
  var biweekRate;
  var weekRate;
  var calcBiweek;
  var calcWeek;
  var interest;

  
 
  //function that has one parameter as interest and calculate total compound interest 
  function compoundInterest(interest){
    // calculate monthly 1 + r/n of the compound interest formula
    monthlyRate = 1 + (interest / 12);

    // calculate bi-week 1 + r/n of the compound interest formula
    biweekRate = 1 + (interest / 26);
    calcBiweek = (getMonths / 12) * 26;

    console.log("Hello" +calcBiweek);

    // calculate weekly 1 + r/n of the compound interest formula
    weekRate = 1 + (interest / 52);
    calcWeek = (getMonths / 12) * 52; 
    
    //calculate monthly compound interest  
    totalMonthAmount = carPrice * Math.pow(monthlyRate, getMonths);
    console.log(parseInt(totalMonthAmount));
    
    //calculate weekly compound interest
    totalWeekAmount = carPrice * Math.pow(weekRate, calcWeek);
    console.log(parseInt(totalWeekAmount));

    //calculate biweekly compound interest rate 
    totalBiweekAmount = carPrice * Math.pow(biweekRate, calcBiweek);
    console.log(parseInt(totalBiweekAmount));
  }
   
  var carPrice = getCarPrice(getCar);
    //calculate as a Leasing option 
    if(getPurchase == "Leasing"){

      if(getMonths >= 24 && getMonths <= 36){

        interest = compoundInterest(0.0599);

      }else if(getMonths >= 37 && getMonths <= 48){

        interest = compoundInterest(0.0555);

      }else if(getMonths >= 49 && getMonths <= 60){

        interest = compoundInterest(0.05);

       
      }else if(getMonths >= 61 && getMonths <= 72){
        interest = compoundInterest(0.045);
      }

    }else if(getPurchase == "Finance"){

      if(getMonths >= 24 && getMonths <= 36){
        
        interest = compoundInterest(0.0655);
 
      }else if(getMonths >= 37 && getMonths <= 48){

        interest = compoundInterest(0.0555);

      }else if(getMonths >= 49 && getMonths <= 60){

        interest = compoundInterest(0.0455);

      }else if(getMonths >= 61 && getMonths <= 72){

        interest = compoundInterest(0.0355);

      } 
    }
    else{

    } 
  
  //fetch downpay value from an <input> tag 
  var getDownpay = document.getElementById('downPay').value;

  if(getDownpay > carPrice / 2){
    console.log(getDownpay+ "Not Good" +carPrice/2);

    /* if downpayment is more than 50% of car price value print an error 
    that it must be less than 50% */
    var errorPara = document.getElementById("errorMsg");
    errorPara.style.color = "red";

    var nodeError = document.createTextNode(
    "Down payment should not exceed more than 50%");
    errorPara.appendChild(nodeError);

    //when user press clear button error message is being removed 
    var resetButton = document.getElementById("buttonReset");
    resetButton.addEventListener("click",function(){
         errorPara.innerHTML = '';
    });

  }else if(getDownpay < 1){

    var errorNegative = document.getElementById("errorMsg");
    errorNegative.style.color = "red";

    var nodeErrorNegative = document.createTextNode(
    "Down payment can not have negative or 0 amount");
    errorNegative.appendChild(nodeErrorNegative);

    //when user press clear button error message is being removed 
    var resetButton = document.getElementById("buttonReset");
    resetButton.addEventListener("click",function(){
        errorNegative.innerHTML = '';
    });

  }else{

  //create <p> tag 
  var parPayment = document.createElement('p');
  
  //convert fetched downpay value into a integer 
  var downPay = parseInt(getDownpay);

  var totalMonth;
  var monthlyPay;

  var totalBiweek;
  var biweekPay;

  var totalWeek;
  var weekPay;

  //calculate monthly pay of the selected car 
  totalMonth = parseInt(totalMonthAmount) - downPay;
  monthlyPay = totalMonth / getMonths;

  //calculate bi-weekly pay of the selected car
  totalBiweek = parseInt(totalBiweekAmount) - downPay;
  biweekPay = totalBiweek / calcBiweek;
  
  //calculate weekly pay of the selected car
  totalWeek = parseInt(totalWeekAmount) - downPay;
  weekPay = totalWeek / calcWeek;

  //create a text with month/bi-week/week values
  var nodePayment = document.createTextNode(
  "Your monthly payment shall be $" + monthlyPay.toFixed(2)
  +" , biweekly is $" + biweekPay.toFixed(2) + " , weekly is $" 
  + weekPay.toFixed(2));

  //add a pay text to the <div> tag and print it 
  document.getElementById("printFields").appendChild(parPayment);
  var payTypeText = parPayment.appendChild(nodePayment);


  var monthlyFirstPay;
  var biweekFirstPay;
  var weekFirstPay;

  //calculate monthly first pay of the selected car
  monthlyFirstPay = downPay + monthlyPay;

  //calculate bi-weekly first pay of the selected car
  biweekFirstPay = downPay + biweekPay;

  //calculate weekly first pay of the selected car
  weekFirstPay = downPay + weekPay;

  //create a text with month/bi-week/week first pay values
  var parFirstPay = document.createElement('p');
  var nodeFirstPay = document.createTextNode(
    "Your first payment shall be: monthly $" 
    + monthlyFirstPay.toFixed(2) + ", bi-weekly $" 
    +biweekFirstPay.toFixed(2) + ", weekly $" +weekFirstPay.toFixed(2)
  );

  //add a first pay text to the <div> tag and print it 
  document.getElementById("printFields").appendChild(parFirstPay);
  var firstPayText = parFirstPay.appendChild(nodeFirstPay);


  var resetButton = document.getElementById("buttonReset");

  resetButton.addEventListener("click",function(){
    firstPayText.remove();
    payTypeText.remove();
  });

  }

  
  
  
  var resetButton = document.getElementById("buttonReset");

  //when user clicks clear button all the DOM text nodes are being removed
  resetButton.addEventListener("click",function(){
    //firstPayText.remove();
    //payTypeText.remove();
    nameText.remove();
    carText.remove();
    purchaseTypeText.remove();
    monthsText.remove();
  });
  

  
}



  //clear all fields 
function clear() {
    document.getElementById("enterValues").reload();
}

function getCarPrice(a){
  if(a == "Audi"){
    return 20000;
  }else if(a == "Bmw"){
    return 30000;
  }else{
    return 40000;
  }
}

function checkName(name){

  if(name == ''){
    console.log("Please add some value");
  }

}

function determinePrice(){
  document.getElementById("fetchPrice").value = 20000;
}








