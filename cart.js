var a = document.getElementById("table");
var objectList = JSON.parse(localStorage.getItem("list"));
console.log(objectList);
var cost = document.getElementById("TotalCost");
var totalcost = 0;

//If cart is empty
const setImage = ()=>{
    document.getElementById("parent").innerHTML=`<div class="col-4 text-center ml-0"><img src="emptycart.jpg"  style="width:600px; height:500px"></div>`;
}

var createTable = (list)=> {
    if(list.length==0){
        setImage();
        return;
    }
    a.innerHTML = `
    <table border="2px" class = "table table-striped">
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            ${renderData(list)}
    </table>
    `;
}

function renderData(list) {
    var dataRow =list.map( (list)=>{
        console.log(list);
        totalcost+=list.price*list.quantity;
        return `
        <tr id = ${list.id}>
         <td>${list.title}</td>
         <td>${list.category}</td>
         <td>${list.price}</td>
         <td class="row mx-auto" id="pid">
         <div class="col-lg-8 col-md-11 col-sm-12 d-flex align-items-center ">
            <button class="btn btn-secondary add-item buttons" onclick="addItem(${list.id})">+</button>
            <span class="mx-2 text-center quantity">${list.quantity}</span>
            <button class="btn btn-secondary delete-button" onclick="deleteItem(${list.id})">-</button>
        </div>
        </td>
         </tr>
        `
    });
    cost.innerHTML = totalcost.toFixed(2);
    return dataRow.join('');
}

var addItem = (pid) => {
    var index = objectList.findIndex((product) => product.id === pid);

    if (index !== -1) {
        objectList[index].quantity += 1;
        totalcost+=objectList[index].price;
        var row = document.getElementById(pid);
        var quantityElement = row.querySelector("span");
        cost.innerHTML = totalcost.toFixed(2);
        if (parseInt(quantityElement.innerHTML)>0) {
            var currentQuantity = parseInt(quantityElement.innerHTML);
            quantityElement.innerHTML = (currentQuantity + 1).toString();
        }
        var newList = objectList;
         localStorage.setItem("list",JSON.stringify(newList));

    } else {
        console.error("Product with pid " + pid + " not found in objectList");
    }
}

var deleteItem = (pid) => {
    var index = objectList.findIndex((product) => product.id === pid);

    if (index !== -1) {
        objectList[index].quantity -= 1;
        totalcost-=objectList[index].price;
        
        cost.innerHTML = Math.abs(totalcost.toFixed(2));
        if(objectList[index].quantity <= 0){
            deleteRow(pid);
            return;
        }

        var row = document.getElementById(pid);
        var quantityElement = row.querySelector("span");

        if (quantityElement) {
            var currentQuantity = parseInt(quantityElement.innerHTML);
            quantityElement.innerHTML = (currentQuantity - 1).toString();
        }
        var newList = objectList;
        localStorage.setItem("list",JSON.stringify(newList));
    } 
    else {
        console.error("Product with pid " + pid + " not found in objectList");
    }
}

var deleteRow = (id)=> {
    var row = document.getElementById(id);
    row.remove();
    var index = objectList.map((product)=>product.id).indexOf(id);
    objectList.splice(index,1);
    var newList = objectList;
    if(newList.length==0){
        setImage();
    }
    localStorage.setItem("list",JSON.stringify(newList));
}

//Calling functions 
createTable(objectList);