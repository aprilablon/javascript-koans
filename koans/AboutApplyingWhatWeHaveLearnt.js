var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () { 
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */
      productsICanEat = _(products).chain()
                                   .filter(function(x) {return x.containsNuts === false;})
                                   .filter(function(y) {return _(y.ingredients).all(function(z) {return z !== "mushrooms";});})
                                   .value();

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }
    
    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _(_.range(1, 1000)).chain()
                                .filter(function(x) {return x % 3 === 0 || x % 5 === 0 ;})
                                .reduce(function(a, b) {return a + b;})
                                .value();    /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
  
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

     
    // chain() together map(), flatten() and reduce() 
    var ingredientList = _(products).chain()
                                    .map(function(y) {return y.ingredients;})
                                    .flatten()
                                    .value();

    // need to come back and fix this as it's not a functional implementation
    for (i = 0; i < ingredientList.length; i++) {
      ingredientCount[ingredientList[i]] = (ingredientCount[ingredientList[i]] || 0) + 1;
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/

  it("should find the largest prime factor of a composite number", function () {
    var composite = 27;

    var largestPrime = _(_.range(1, composite)).chain()
                                               .filter(function(x) {return composite % x === 0;})
                                               .reduce(function(a, b) {if (b > a) {return b;} else {return a;};})
                                               .value();

    expect(largestPrime).toBe(9);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {
    var digitProduct = 345 * 678;

    digitProduct = digitProduct.toString();
    var largestPalindrome = 0;

    for (i = 0; i < digitProduct.length - 1; i++) {
      for (j = i + 1; j < digitProduct.length; j++) {
        var num = digitProduct.slice(i, j);
        var numReverse = num.split('').reverse().join('');
        if (num === numReverse && parseInt(num) > largestPalindrome) {
          largestPalindrome = parseInt(num);
        }
      }
    }

    expect(largestPalindrome).toBe(33);
  });
  
  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {
    var num = 20;

    while (num % 1 !== 0 || num % 2 !== 0 || num % 3 !== 0 || num % 4 !== 0 || num % 5 !== 0 ||
        num % 6 !== 0 || num % 7 !== 0 || num % 8 !== 0 || num % 9 !== 0 || num % 10 !== 0 ||
        num % 11 !== 0 || num % 12 !== 0 || num % 13 !== 0 || num % 14 !== 0 || num % 15 !== 0 ||
        num % 16 !== 0 || num % 17 !== 0 || num % 18 !== 0 || num % 19 !== 0 || num % 20 !== 0) {
      num += 20;
    }

    expect(num).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {
    var arr = [1, 2, 3, 4];

    function sum(arr) {
      return _(arr).reduce(function(a, b) {return a + b;});
    }

    function square(arr) {
      if (typeof arr === 'object') {
        return _(arr).map(function(x) {return Math.pow(x, 2);});
      } else if (typeof arr === 'number') {
        return Math.pow(arr, 2);
      }
    }

    var diff = Math.abs((sum(square(arr))) - (square(sum(arr))));

    expect(diff).toBe(70);
  });

  it("should find the 10001st prime", function () {
    var primeCount = 0;
    var startNum = 0;

    function isPrime(num) {
      if (num <= 1) {
        return false;
      } 
      for (var i = 2; i < num; i++) {
        if (num % i === 0) {
          return false;
        }
      }
      return true;
    }

    while(primeCount !== 10001) {
      startNum++;
      if (isPrime(startNum)) {
        primeCount++;
      }
    }

    expect(startNum).toBe(104743);
  });

});
