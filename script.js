let interviewCount=[];
let rejectedCount=[];

let total=document.getElementById('total-count');
let interview=document.getElementById('interview-count');
let rejected=document.getElementById('rejection-count');
let totalJob=document.getElementById('total-job')

function calculateCount() {
    const allCard=document.getElementById('card-containar').children.length;
    total.innerText = allCard;//8
    totalJob.innerText = allCard;//8
    interview.innerText = interviewCount.length;
    rejected.innerText = rejectedCount.length;
}
calculateCount()


const allCardSection = document.getElementById('card-containar');
const mainContainer = document.querySelector('main');
const filterSection = document.getElementById('filtered-section');



// filter section 
const allFilterBtn=document.getElementById("all-filter-btn");
const interviewFilterBtn=document.getElementById("interview-filter-btn");
const rejectedFilterBtn=document.getElementById("rejected-filter-btn");
const noApplication = document.getElementById("no-application");

function filterCards(type) {

    const allCards = document.querySelectorAll(".card");
    let visibleCount = 0;

    allCards.forEach(function(card){

        const statusText = card.querySelector(".notified p").innerText;

        if(type === "all"){
            card.classList.remove("hidden");
        }

        else if(type === "interview"){
            if(statusText === "Interview"){
                card.classList.remove("hidden");
                visibleCount++;
            } else {
                card.classList.add("hidden");
            }
        }

        else if(type === "rejected"){
            if(statusText === "Rejected"){
                card.classList.remove("hidden");
                visibleCount++;
            } else {
                card.classList.add("hidden");
            }
        }

    });

    if(type !== "all" && visibleCount === 0){
        noApplication.classList.remove("hidden");
    } else {
        noApplication.classList.add("hidden");
    }
}

function ToggleStyle(id){
    allFilterBtn.classList.add('btn-soft');
    interviewFilterBtn.classList.add('btn-soft');
    rejectedFilterBtn.classList.add('btn-soft');

    const selected = document.getElementById(id);
    selected.classList.add('btn-primary');
    selected.classList.remove('btn-soft');
    
}
allFilterBtn.addEventListener('click',function(){
    ToggleStyle('all-filter-btn');
    filterCards("all");
})

interviewFilterBtn.addEventListener('click',function(){
    ToggleStyle('interview-filter-btn');
    filterCards("interview");
})

rejectedFilterBtn.addEventListener('click',function(){
    ToggleStyle('rejected-filter-btn');
    filterCards("rejected");
})

// main kam kaj
mainContainer.addEventListener('click', function (event) {

    const parentNode = event.target.closest('.card');
    if (!parentNode) return;
    
    const cardName =parentNode.querySelector('.card-name').innerText;
    const statusBar = parentNode.querySelector('.notified');
    const statusText = statusBar.querySelector('p');

    
    if (event.target.classList.contains('btn-success')) {

        statusText.innerText = "Interview";
        statusBar.classList.remove('bg-gray-300');
        statusBar.classList.add('bg-green-300');


        if (!interviewCount.includes(cardName)) {
            interviewCount.push(cardName);
        }

         rejectedCount=rejectedCount.filter(name=> name !== cardName);
        calculateCount();
    }

    
    if (event.target.classList.contains('btn-error')) {

        statusText.innerText = "Rejected";
        statusBar.classList.remove('bg-gray-300');
        statusBar.classList.add('bg-red-300');

        if(!rejectedCount.includes(cardName)){
            rejectedCount.push(cardName);
        }
        interviewCount=interviewCount.filter(name=>name !==cardName);
       
        calculateCount();
    }
    if(event.target.classList.contains('trash-been')){
        interviewCount=interviewCount.filter(name => name !==cardName);
        rejectedCount=rejectedCount.filter(name => name !== cardName);

        parentNode.remove();
        calculateCount();
    }

});


