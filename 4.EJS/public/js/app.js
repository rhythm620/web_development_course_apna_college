const btns = document.querySelectorAll("buttons");

for(btn of btns ){
    btn.addEventListner("click",()=>{
        console.log("Button was clicked");
    });
}