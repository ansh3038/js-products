var a = document.getElementById("table");
var objectList = JSON.parse(localStorage.getItem("list"));
console.log(objectList);
var cost = document.getElementById("TotalCost");
var totalcost = 0;

const setImage = ()=>{
    document.getElementById("parent").innerHTML=`<img src="emptycart.jpg" class='col-3' style="width:400px; height:300px">`;
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
         <td class="row" id="pid">
         <button class="btn btn-secondary add-item buttons col-md-3 col-sm-1" onclick="addItem(${list.id})">+</button>
         <span class="mx-2 col-md-3 col-sm-1 text-center" >${list.quantity}</span>
         </textarea>
         <button class="btn btn-secondary delete-button col-md-3 col-sm-1" onclick="deleteItem(${list.id})">-</button>
    
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
    // Find the index of the product with the specified pid in objectList
    var index = objectList.findIndex((product) => product.id === pid);

    if (index !== -1) {
        // Increment the quantity in objectList
        objectList[index].quantity -= 1;
        totalcost-=objectList[index].price;
        
        cost.innerHTML = Math.abs(totalcost.toFixed(2));
        if(objectList[index].quantity <= 0){
            deleteRow(pid);
            return;
        }

        // Update the quantity in the HTML
        var row = document.getElementById(pid);
        var quantityElement = row.querySelector("span");

        if (quantityElement) {
            // Convert the innerHTML to an integer, increment it, and update the HTML
            var currentQuantity = parseInt(quantityElement.innerHTML);
            quantityElement.innerHTML = (currentQuantity - 1).toString();
        }
        var newList = objectList;
        localStorage.setItem("list",JSON.stringify(newList));
    } else {
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
    // createTable();
}

var sort = (number) => {
    if(number === 1){
        var list = objectList.sort((a,b)=> a.name - b.name );
        createTable(list);
    }
}

var createTable = (list)=> {
    if(list.length==0){
        setImage();
        return;
    }
    a.innerHTML = `
    <table border="2px" class = "table table-striped">
            <th onclick="sort(1)">Name</th>
            <th onclick="sort(2)">Category</th>
            <th onclick="sort(3)">Price</th>
            <th>Quantity</th>
            ${renderData(list)}
    </table>
    `;
}

createTable(objectList);