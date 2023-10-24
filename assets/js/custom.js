
let btn = document.getElementById('submit-btn');

let tokenData = [];
tokenHandler()
token_li();

let updateLiId = null;


btn.addEventListener('click', function(e) {
  e.preventDefault();
  
  let activeInputValues = {};

  let formData = new FormData(document.getElementById('token-form'));
  
  formData.forEach((value, property) => {
    activeInputValues[property] = value;
  })
  
  if(!updateLiId) {
    tokenData.push({
      ...activeInputValues,
      id: tokenData.length + 1
    }) 
  }else {
    tokenData = tokenData.map(item => {
      if(item.id == updateLiId) {
        return {
          ...activeInputValues,
          id: updateLiId
        }
      }else {
        return item;
      }
    })


  }
   
  tokenHandler();
  updateLiId = null;
  document.getElementById('token-form').reset();
})

// creat li elements;
function myLiElement(id, name, phone) {
  return `<li class="token-li" data-id="${id}">
            <div class="left">
              <p>${name}</p>
              <span>${phone}</span>
            </div>
            <div class="right">
              <a href="#">Token No:${id}</a>
            </div>
          </li>`;
}


// tokenHandler;
function tokenHandler() {
  let ulElements = [
    {
      status: 'active',
      ul: document.getElementById('active-ul'),
      liElements: [],
      totalSpan: document.getElementById('total-active')
    },
    {
      status: 'complete',
      ul: document.getElementById('complete-ul'),
      liElements: [],
      totalSpan: document.getElementById('total-complete')
    },
    {
      status: 'cancel',
      ul: document.getElementById('cancel-ul'),
      liElements: [],
      totalSpan: document.getElementById('total-cancel')
    }
  ];


  ulElements.map(item => {
    tokenData.map(token => {
      if(token.status == item.status){
        item.liElements.push(myLiElement(token.id, token.name, token.phone))
      }
    })
  })

  
  ulElements.forEach(item => {
    let liElements = function() {
      if(item.liElements.length == 0){
        return `<li class="empty-error d-block">
                    <span class="d-block text-center">No Data Found</span>
                 </li>`;
      } else{
        return item.liElements.join('');
      }
    }
    item.ul.innerHTML = liElements();
    item.totalSpan.innerHTML = item.liElements.length;
  })

  

  document.getElementById('total-token').innerHTML = tokenData.length <= 9 ? '0' + tokenData.length : tokenData.length;


};

function token_li() {

let liPackege = document.querySelector('.li-packege');

liPackege.addEventListener('click', function(e) {
  e.preventDefault();

  let li = e.target.closest('.token-li');
  if(li) {
    let dataId = e.target.getAttribute('data-id');
    
    let liedit = tokenData.find(item => {
      return item.id == dataId;
    })


    for(let p in liedit){
      if(document.querySelector(`[name="${p}"]`)) {
        document.querySelector(`[name="${p}"]`).value = liedit[p];
      }
      
    }
    
    updateLiId = dataId;
    
  }

 
})


}


let ul_item = document.getElementById('ul-item');

ul_item.addEventListener('click', e => {
  if(e.target.matches('li')){
    if(e.target.innerText == 'junaeid') {
      e.target.style.backgroundColor = 'red'
    } else {
      e.target.style.backgroundColor = 'blue'
    }
    
  }
})

function junaeid() {
  let jk = document.createElement('li');
  jk.textContent = 'sibling';
  ul_item.appendChild(jk)
}

let jk = () => 40

console.log(jk());



