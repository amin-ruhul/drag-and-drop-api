const draggable_list  = document.getElementById('draggable-list');
const check = document.getElementById('check');


const richestPeople = [
    'Jeff Bezos',
    'Bill Gates',
    'Warren Buffett',
    'Bernard Arnault',
    'Carlos Slim Helu',
    'Amancio Ortega',
    'Larry Ellison',
    'Mark Zuckerberg',
    'Michael Bloomberg',
    'Larry Page'
];

const listItems = [];

let dragStartIndex;

createList();

function createList(){
    [...richestPeople]
    .map(a =>({value:a,sort:Math.random()}))
    .sort((a,b) => a.sort - b.sort)
    .map(a => a.value)
    .forEach((person,index)=>{
        const list_item = document.createElement('li')
        list_item.setAttribute('data-index',index)
        list_item.innerHTML = `
        <span class = "number">${index +1}</span>
        <div class = "draggable" draggable = "true">
            <p class = "person-name">${person}</p>
            <i class = "fas fa-grip-lines"></i>
        </div>
        `;
        listItems.push(list_item);

        draggable_list.appendChild(list_item);
    })

    addEventListeners();
}

function dragStart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index');
  }
  
  function dragEnter() {
    this.classList.add('over');
  }
  
  function dragLeave() {
    this.classList.remove('over');
  }
  
  function dragOver(e) {
    e.preventDefault();
  }
  
  function dragDrop() {
    const dragEndIndex = +this.getAttribute('data-index');
    swapItems(dragStartIndex, dragEndIndex);
  
    this.classList.remove('over');
}

// Swap list items that are drag and drop
function swapItems(fromIndex, toIndex) {
    const itemOne = listItems[fromIndex].querySelector('.draggable');
    const itemTwo = listItems[toIndex].querySelector('.draggable');
  
    listItems[fromIndex].appendChild(itemTwo);
    listItems[toIndex].appendChild(itemOne);
  }
  
  // Check the order of list items
  function checkOrder() {
    listItems.forEach((listItem, index) => {
      const personName = listItem.querySelector('.draggable').innerText.trim();
  
      if (personName !== richestPeople[index]) {
        listItem.classList.add('wrong');
      } else {
        listItem.classList.remove('wrong');
        listItem.classList.add('right');
      }
    });
  }


function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable');
    const dragListItems = document.querySelectorAll('.draggable-list li');
  
    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', dragStart);
    });
  
    dragListItems.forEach(item => {
      item.addEventListener('dragover', dragOver);
      item.addEventListener('drop', dragDrop);
      item.addEventListener('dragenter', dragEnter);
      item.addEventListener('dragleave', dragLeave);
    });
  }

  check.addEventListener('click', checkOrder);
