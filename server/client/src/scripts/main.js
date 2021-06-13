// Get the modal

let btnClose = document.getElementById("deleteProject");
// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close");

function openModal() {
    let modal = document.getElementById("myModal");
    modal.style.display = "flex";
}


// When the user clicks on <span> (x), close the modal
function hidePopup() {
    const modal = document.getElementById("myModal");
    modal.style.display = "none";
}


function openColaborator() {
    let sth = document.getElementById("contributorsModal");
}



//to show myProfile and LogOut
var test = document.getElementById("hamburgerMenu");
var counter = 0;

function show() {
    if (counter % 2 == 0) {
        test.style.display = "block";
        test.style.textAlign = "justify";
    } else {
        test.style.display = "none";
    }

    counter++;
};

//statuses
// const btn5 = document.getElementById('status');

// btn5.addEventListener('click', function() {
//     if (btn4.style.marginTop != '290px') {
//         btn4.style.marginTop = '290px';
//     } else {
//         btn4.style.marginTop = '20px';
//     }
// });
(function() {

})();