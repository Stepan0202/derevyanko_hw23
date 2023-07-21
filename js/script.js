'use strict'
const categories = [
    {
        name: 'keys',
        goods: [
            {
                name: 'Wrench',
                id: 1,
                description: 'A wrench is a hand tool used for gripping and turning nuts and bolts. It has an adjustable jaw or jaws to accommodate different sizes of fasteners.',
                img: './img/wrench.jpg',
                oldPrice: 50000,
                price: 499,
                inStock: true,
            },
            {
                name: 'Adjustable wrench',
                id: 2,
                description: 'An adjustable wrench is a hand tool with a movable jaw that can be adjusted to fit various sizes of nuts and bolts, making it versatile for different applications.',
                img: './img/adjustableWrench.jpg',
                oldPrice: 70000,
                price: 899,
                inStock: true,
            },
            {
                name: 'Cartoon key',
                id: 3,
                description: 'A cartoon key is a whimsical representation of a key often found in animated or illustrated media. It typically features exaggerated or stylized characteristics, adding a playful and imaginative element to its appearance.',
                img: './img/cartoonKey.jpg',
                oldPrice: 100000,
                price: 999.99,
                inStock: true,
            }

        ]
    },
    {
        name: 'boxes',
        goods: [
            {
                name: 'Simple Box',
                id: 4,
                description: 'A box is a three-dimensional object with six sides, typically made of cardboard, wood, or other materials. It serves as a container for storing, transporting, or organizing various items. Boxes come in different shapes and sizes and can be opened or closed using lids, flaps, or other mechanisms. They are commonly used in packaging, storage, shipping, and organization in various industries and everyday life.',
                img: './img/simpleBox.jpg',
                oldPrice: 500,
                price: 49.90,
                inStock: true,
            },
            {
                name: 'Box 4 your cat',
                id: 5,
                description: 'Cats are known for their fondness for boxes, regardless of their size or shape. A simple box can provide a sense of comfort, security, and privacy for a cat. It offers a cozy space for them to curl up, rest, and observe their surroundings while feeling protected. ',
                img: './img/boxForYourCat.png',
                oldPrice: 10000,
                price: 999,
                inStock: true,
            },

        ]
    },
    {
        name: 'mirrors',
        goods: [
            {
                name: 'Big mirror',
                id: 6,
                description: 'A big mirror is a large reflective surface that typically consists of a glass pane mounted within a frame. It is designed to reflect light and provide a clear and accurate reflection of objects and people in front of it. A big mirror can serve both functional and aesthetic purposes. It is commonly used in bedrooms, bathrooms, dressing areas, and other living spaces for personal grooming, checking appearances, and creating an illusion of more space. The size and presence of a big mirror can also enhance the visual appeal and brightness of a room, making it a popular choice for interior decoration.',
                img: './img/bigMirror.jpg',
                oldPrice: 50000,
                price: 49999.90,
                inStock: true,
            },
            {
                name: 'Road mirror',
                id: 7,
                description: 'A road mirror is a convex mirror installed at strategic locations on roads and driveways to improve safety. Its curved surface provides a wide field of view, eliminating blind spots and helping drivers see around corners and obstructed areas. Road mirrors enhance visibility and aid in accident prevention.',
                img: './img/roadMirror.jpg',
                oldPrice: 10000,
                price: 999,
                inStock: true,
            },
            {
                name: 'Little mirror',
                id: 8,
                description: 'A little mirror is a small reflective surface typically made of glass or plastic. It is compact and portable, making it convenient for personal use. Little mirrors are commonly used for tasks such as applying makeup, grooming, or checking one\'s appearance.',
                img: './img/littleMirror.jpg',
                oldPrice: 200,
                price: 99,
                inStock: true,
            },


        ]
    },
]
let currentCategory;
let currentGood;
let cart = JSON.parse(localStorage.getItem('cart'));
const formContainer = document.querySelector('#order');
const form = formContainer.querySelector('form');
const main = document.querySelector('.main');
const cartEl = document.querySelector('#cart');
const cartCounter = document.querySelector('#goodsQuantity')

cartEl.addEventListener('click', showCart);
formContainer.style.display = "none";
cartCounter.textContent = cart.length;
window.onload = () => {
    createCategories(categories, document.querySelector('.navigation__menu'));
}
function createCategories(categories, parent){
    categories.forEach(categ => {
        const category = document.createElement('div');
        category.textContent = capitalizeFirstLetter(categ.name);
        category.dataset.id = categ.name;
        category.classList.add('navigation__item');
        parent.appendChild(category);
        createGoods(categ.goods, categ.name);

    });
    parent.addEventListener('click', showGoods);
}
function capitalizeFirstLetter(word) {
    return word[0].toUpperCase() + word.slice(1);
}
function createGoods(goodsList, key){
    const goodsGrid = document.createElement('section');
    const panel = document.querySelector('.board__panel');
    const footer = document.querySelector('.board__footer');
    panel.insertBefore(goodsGrid, footer);
    goodsGrid.classList.add('board__goodsGrid');
    goodsList.forEach((good) => {
        const card = document.createElement('div');
        const imgContainer = document.createElement('div');
        const img = document.createElement('img');
        const title = document.createElement('div');
        const description = document.createElement('div');
        const oldPrice = document.createElement('div');
        const newPrice = document.createElement('div');
        const buyButton = document.createElement('button');

        card.classList.add('board__goodsCard');
        card.classList.add('goodsCard');
        card.appendChild(imgContainer);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(oldPrice);
        card.appendChild(newPrice);
        card.appendChild(buyButton);
        card.dataset.id = good.id;

        imgContainer.classList.add('imageContainer');
        imgContainer.appendChild(img);
        img.setAttribute('src', good.img);
        
        title.textContent = good.name;
        description.textContent = good.description;
        oldPrice.textContent = "₴" + good.oldPrice;
        newPrice.textContent = "₴" + good.price;
        buyButton.textContent = "Buy now";

        title.classList.add('title');
        description.classList.add('description');
        
        oldPrice.classList.add('oldPrice');
        newPrice.classList.add('newPrice');
        buyButton.classList.add('buyButton')
        
        goodsGrid.style.display = 'none';
        description.style.display = 'none';
        buyButton.style.display = 'none';
        
        goodsGrid.appendChild(card);
        goodsGrid.setAttribute('id', key);
        

        card.addEventListener('click', showDetails);
    })
}

function showGoods(event){ 
    main.style.display = "block";
    if (currentCategory) currentCategory.style.display = 'none';
    const id = '#' + event.target.dataset.id;
    const goods = document.querySelector(id);
    const boardName = document.querySelector('.board_name')

    currentCategory = goods;
    goods.style.display = 'grid';
    boardName.textContent = event.target.dataset.id.toUpperCase();
}
function hideGoods(){
    if(currentCategory) currentCategory.style.display = 'none';
}
function showDetails(event){
    const info = document.querySelector('.info');
    const targetGood = event.currentTarget.cloneNode(true);
    let button = targetGood.querySelector('.buyButton');
    let description = targetGood.querySelector('.description');
    currentGood = targetGood;
    info.innerHTML = '';
    info.appendChild(targetGood);
    description.style.display = "inline-block";
    button.style.display = "block";
    button.dataset.goodInfo = [targetGood.querySelector('.title').textContent, targetGood.querySelector('.newPrice').textContent];
    button.addEventListener('click', addToCart);
}
function showError(msg){
    document.querySelector('#error').innerHTML += msg + '<br>';
}
function showOrder(fields){
    const orderTable = document.createElement('section');
    orderTable.classList.add('orderTable');
    orderTable.appendChild(currentGood);
    currentGood.style.display = "block";
    document.querySelector('.container').appendChild(orderTable, true);
    
    for (let i = 0; i < fields.length; i++){
        if (fields[i].type === 'submit') continue;
        const orderRow = document.createElement('div');
        const orderData = document.createElement('div');
        const orderValue = document.createElement('div');

        orderRow.classList.add('orderTable__row');
        orderData.classList.add('orderTable__data');

        orderTable.appendChild(orderRow);
        orderRow.appendChild(orderData);
        orderRow.appendChild(orderValue);
        console.log(fields[i]);
        switch(fields[i].type) {
            case 'input':      
                orderData.textContent = fields[i].id;
                orderValue.textContent = fields[i].value;
                break;
            case 'radio':
            case 'checkbox':
                orderData.textContent = fields[i].id;
                orderValue.textContent = fields[i].checked;
                console.log(fields[i].checked);
                break;
            default:
                orderData.textContent = fields[i].id;
                orderValue.textContent = fields[i].value;
        
                
        }

    }
}
function buy(event){
    event.preventDefault();
    console.log(currentGood);
    formContainer.style.display = "block";
 
    const info = event.target.dataset.goodInfo.split(',');
    event.target.style.display = 'none';
    currentCategory.style.display = 'none';
    main.style.display = "none";
    
    form.addEventListener('submit', validateForm);
    // currentGood.style.display = 'none';
    
}
function validateForm(event){
    event.preventDefault();
    const fields = event.target;
    console.log(fields);
    document.querySelector('#error').innerHTML = "";
    for(let i = 0; i < fields.length; i++){
        const el = fields[i];
        const parentClasses = [...el.parentNode.classList];
        const elementClasses = [...el.classList];
        const isRequired = parentClasses.indexOf('required') > -1 || elementClasses.indexOf('required') > -1;
        if (isRequired && el.textContent.trim() == ""){
            const msg = `Please fill ${el.name} field`;
            if (el.value == "") {
                showError(msg);
                return;
            }
        }
    }
    form.style.display = 'none';
    currentGood.style.display = 'none';
    showOrder(fields);
}
function processRadio(radioNodeList, type){
    let checked = [];
    for(let i = 0; i < radioNodeList.length; i++){
        if (radioNodeList[i].checked === true){
            console.log(type)
            if (type === 'checkbox')  checked.push(firstLetterToUpperCase(radioNodeList[i].id));
            else checked.push(radioNodeList[i].value);
            
        } 
    }
    return checked;

}
function addToCart(){
    const goodObj = getGoodsByParametr('id', currentGood.dataset.id);
    cart.push(goodObj);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(localStorage.getItem('cart'));
}
function showCart(){
    hideGoods();
    const cartTable = document.createElement('section');
    const tableHeader = document.createElement('div');
    tableHeader.classList.add('orderTable__row');
    cartTable.classList.add("orderTable");
    
    tableHeader.innerHTML = `
    <div>Name</div>
    <div>Date</div>
    <div>Price</div>
    <div>Quantity</div>
    <div>Delete</div>
    `
        
    cartTable.appendChild(tableHeader);
    main.appendChild(cartTable);
    cart.forEach(el => {
        let obj = el[0];
        const tableRow = document.createElement('div');
        tableRow.classList.add('orderTable__row');
        cartTable.insertAdjacentElement('beforeend', tableRow);
        tableRow.innerHTML = `
        <div>${obj.name}</div>
        <div>${"Date"}</div>
        <div><span class="oldPrice">${obj.oldPrice}</span> ${obj.price}</div>
        <div>${1}</div>
        <div><img src="img/icon/delete.png" alt="delete from cart" title = "delete from cart" width = "20em" height = "20em"></div>
        `
    })

    console.log(cart);
}
function getGoodsByParametr(param, value){
    let goods = [];
    let result = [];
    categories.forEach(category => {
        category.goods.forEach(good => goods.push(good));
    })
    result = goods.filter(good => {
        return good[param] == value;
    })
    return result;
}
