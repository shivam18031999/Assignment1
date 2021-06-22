
const list = document.querySelector("ul");
const previewImage = document.querySelector(".big-image");
const previewTitle = document.querySelector(".big-title")



const image_data = [
    {
        "previewImage": "https://images.unsplash.com/photo-1561948955-570b270e7c36?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "cat.jpeg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1606787620819-8bdf0c44c293?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "cooking couple shoot portofilio(1).jpg"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1539367628448-4bc5c9d171c8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "bali-kelingking-beach-plastic-removal-drive.key"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1623206837956-07dab21608f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "title": "NextByk Investor Pitch 2021.ppt"
    },
    {
        "previewImage": "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
        "title": "interns-performance-report-june-2021.key"
    }
]


const addElements = () => {

      image_data.forEach((obj,index) => {
        
        const imageItem = document.createElement("li");
        imageItem.className += ( " list-element" );
        imageItem.setAttribute('id',index);
       
        
        const image = document.createElement("img");
        image.setAttribute("src",obj.previewImage);
        image.className += ( " image" );

        const imageTitle = document.createElement("p");

        const imageTitleInner = document.createElement("div");
        imageTitleInner.innerText = obj.title;        
        imageTitle.append(imageTitleInner);
        imageTitle.className += ( " image-title" );      
        
        imageItem.append(image);
        imageItem.append(imageTitle);

        list.append(imageItem);
      });
};

addElements();
const listArray = document.querySelectorAll("li");



// Function to unselect a list item and select another item.
// item1 is the id of item , which we are gonna unselect
// item2 is the id of item, which we will select
const changeSelectedItem = (item1 ,item2) => {

   
   listArray.forEach((listItem)=>{
        if(listItem.id == item1){
           listItem.classList.toggle("selected");
        }
        
        if(listItem.id == item2 ){
            
            listItem.classList.toggle("selected");
            
            previewImage.setAttribute("src",image_data[item2].previewImage);
            previewTitle.innerText = image_data[item2].title;
        }
   });

}

changeSelectedItem("-1","0");

// previous store the id of currently select item
let previous = 0;

// EventListner to change the image using click event
const addListner = () =>{
   
    listArray.forEach((listItem)=>{
        listItem.addEventListener('click',(e)=>{
            let id;
            if(e.target.tagName == 'LI'){
                id = e.target.id;
            }else if(e.target.tagName == 'DIV'){
              id = e.target.parentElement.parentElement.id;
            }else{
                id = e.target.parentElement.id;
            }
            changeSelectedItem( previous , id );
            previous = parseInt(id) ;
         });
    });
}

addListner();


// EventListner to change the image using up and down key

function checkKey(e) {

    e = e || window.event;

    if (e.keyCode == '38') {
        let prev = previous;
        if(prev == 0){
            previous = image_data.length -1 ;
        }else{
            previous = prev - 1;
        }
        changeSelectedItem(prev , previous);
    }
    else if (e.keyCode == '40') {
        let prev = previous;
        if(prev == image_data.length -1){
            previous = 0 ;
        }else{
            previous = prev + 1;
        }
        changeSelectedItem(prev , previous);
    }
}

document.onkeydown = checkKey;




const Li=document.querySelector("li p");

const checkString = (innerDiv,smallStr)=>{
     
     innerDiv.innerText = smallStr;
     console.log(smallStr,innerDiv.scrollWidth,innerDiv.clientWidth);
     if(innerDiv.scrollWidth <= innerDiv.clientWidth){     
        return true;
     }else{
         return false;
     }
}

const findFitLength = (innerDiv , str) => {

    if(checkString(innerDiv,str) === true){
       return str;
    }else{
    
    let len = 0;
    let newStr ;
    for(let i=0;i<str.length/2;i++){
        let smallStr = str.slice(0,i+1) + "..." + str.slice(str.length-(i+1));
        if(checkString(innerDiv,smallStr) === true){
            newStr = smallStr;
        }else{
            break;
        }
    }
        return newStr;
    }
};

const  helper = () => {


    listArray.forEach((listItem)=>{
        
        let str = image_data[listItem.id].title;
        const innerDiv = listItem.children[1].children[0];
        innerDiv.style.whiteSpace = "nowrap";
         let start = 0;
         let count = 1;

         for(let i = 0 ; i < str.length ;i++){
             let smallStr = str.slice(start,i+1);
             if(checkString(innerDiv,smallStr) === false){
                 count++;
                 start = i;
             }
         }
         let finalStr ;
         if(count <= 3){
             finalStr = str;
         }else{
              
            let firstLineEnd, thirdLineStart;
            for(let i = 0;i<str.length;i++){
                let smallStr = str.slice(0,i+1);
               if(checkString(innerDiv,smallStr) === true){
                 firstLineEnd = i;
               }else{
                   break;
               }
            }
            for(let i=str.length-1;i>=0;i--){
                let smallStr = str.slice(i,str.length);
                if(checkString(innerDiv,smallStr) === true){
                    thirdLineStart = i;
                }else{
                    break;
                }
            }
            let remStr = str.slice(firstLineEnd,thirdLineStart);
            let remStrFit = findFitLength(innerDiv,remStr);
            finalStr = str.slice(0,firstLineEnd+1) + remStrFit + str.slice(thirdLineStart,str.length);

         }
         innerDiv.style.whiteSpace = "normal";
         innerDiv.innerText = finalStr;
         
        //  console.log(str,count);
        //  if(count <= 3){
        //      innerDiv.innerText = str;
        //  }else{
        //      innerDiv.innerText = "";
        //  }
       }
        
    );
   
   
}

helper();

window.onresize = function(){helper()};