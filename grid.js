var a = document.getElementById("table");
let  list ;
async function getData(){
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();
    list = data;
    // console.log(data);
    var size = document.getElementById("totalProducts");
    size.innerHTML = list.length + size.innerHTML;
    
createTable();
}
            
getData();

function toast(msg){
    var a = document.getElementById("alert");
    a.innerHTML = `<div class="alert alert-primary mt-3" role="alert">
      ${msg}
    </div>`
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    setTimeout(() => {
      a.innerHTML="";
    }, 3000);
    
}

function add(item) {
    console.log("add");

    var itemList = JSON.parse(localStorage.getItem("list")) || [];

    // Check if an item with the same pid is already in the list
    var existingItemIndex = itemList.findIndex(existingItem => existingItem.id === item.id);
    if (existingItemIndex !== -1) {
       toast("Already added to cart. Check out the cart!");
        // Item already exists in the list, you can update quantity or take any other action here
        return;
    }
    toast("Added to cart.");

    
    itemList.push(item);
    localStorage.setItem("list", JSON.stringify(itemList));
}



function renderData(copyList) {
    var dataRow = copyList.map( (items)=>{
        titleText = items.title;
        if(items.title.length>18){
            titleText = titleText.slice(0,15)+ "...";
        }
        items.quantity=1;
        return `
         <div class="card col-lg-3 col-md-9 col-sm-12 col-xs-12 mx-4 mt-5 " id=${items.id}>
            <div class="row px-1 mb-2">
                <div class="col-12 p-1 mt-1">
                    <img src="${items.image}" alt="" class="card-img-top">
                </div>
                <div class="col-12 h5 text-center">${titleText}</div>
                <div class="col-12 text-center">Rating ${items.rating.rate}</div>
                <div class="col-12 text-center">&#8377 ${items.price}</div>
                <div class="col-12 text-center">
                    <button class="btn btn-primary add-button m-2">Add to Cart</button>
                </div>
            </div>
        </div>
        `
    });
    return dataRow.join(''); // Join the array of strings to form a single HTML string
}

var createTable = () => {
    var tableHtml = `
        <div class="row">
            ${renderData(list)}
        </div>
    `;
    a.innerHTML = tableHtml;

    var addButtons = document.querySelectorAll(".add-button");
    addButtons.forEach((button, index) => {
        button.addEventListener("click", function(event) {
            console.log(list[index]);
            add(list[index]);
        });
    });
}


//Sort functions
function sortByCriterion(criteria) {
    // Create a copy of the original list
    const sortedList = [...list];

    // Define a custom sorting function based on the criterion
    const compareFunction = (a, b) => {
        let valueA = a[criteria];
        let valueB = b[criteria];
        if(criteria==='rating')
        {
            valueA = a.rating.rate;
            valueB = b.rating.rate;
            console.log(a.rating.rate)
        }
    

        if (valueA < valueB) {
            return -1;
        }
        if (valueA > valueB) {
            return 1;
        }
        return 0;
    };

    // Sort the copied list using the custom compare function
    sortedList.sort(compareFunction);
    // console.log(sortedList);
    return sortedList; // Return the sorted list
}



//Adding sort funtions to buttons
document.getElementById("sortName").addEventListener("click", function () {
    const sortedData = sortByCriterion("title");
    const tableHtml = `
        <div class="row">
            ${renderData(sortedData)}
        </div>
    `;
    a.innerHTML = tableHtml;
});

document.getElementById("sortRating").addEventListener("click", function () {
    const sortedData = sortByCriterion("rating");
    const tableHtml = `
        <div class="row">
            ${renderData(sortedData.reverse())}
        </div>
    `;
    a.innerHTML = tableHtml;
});

document.getElementById("sortPrice").addEventListener("click", function () {
    const sortedData = sortByCriterion("price");
    const tableHtml = `
        <div class="row">
            ${renderData(sortedData)}
        </div>
    `;
    a.innerHTML = tableHtml;
});

document.getElementById("sortPriceDesc").addEventListener("click", function () {
    const sortedData = sortByCriterion("price");
    const tableHtml = `
        <div class="row">
            ${renderData(sortedData.reverse())}
        </div>
    `;
    a.innerHTML = tableHtml;
});



//Button Go To Cart
document.getElementById("cart").onclick = function () {
        window.location.href = "./cart.html";
};