var current = [];
var deck = [];
var suits = ["hearts", "spades", "clubs", "diams"];
var left = 20;


$(document).ready($('#start_modal').modal());

/* Sets up the internal representation of the deck */
function start(){
	var index = 0;
	for (var suitcount = 0; suitcount < 4; suitcount++) {
		for (var numcount = 2; numcount < 7; numcount++) {
		    var card = {
				suit: suits[suitcount],
				num: numcount,
		    };
		    deck[index++] = card;
		}
	}
	shuffle(deck);
	for (var i = 0; i < 5; i++){
	    deal();
	}
	console.log(deck);
} 

/* Return a random integer betwen 0 and k */
function randomInteger(k) {
    return Math.ceil((Math.random() * k ));
}

/* Swaps values at i and j in array */
function swap(array, i, j) {
	temp = array[i];
	array[i] = array[j];
	array[j] = temp;
}

/* Shuffles a deck */
function shuffle (array) {
    for (var i = 0; i < array.length; i++) {
		var rand1 = randomInteger(array.length - 1);
		var rand2 = randomInteger(array.length - 1);
		swap(array, rand1, rand2);
    }
}


/* Deals the cards to the five piles, left to right */
function deal() { 
	if (left != 0) {
		for (var i = 0; i < 5; i++) {
			if (current[i] == null) {
				current[i] = deck[left - 1];
				generateCard(i, current[i].suit, current[i].num);
				left--;
				return;
			}
		}
	} else {
		$('#end_modal').modal();
		current = [];
		deck = [];
		left = 20;
	}
}

/* Discards a card */		
function discard(index) {
	moveToDiscard(index);		
	current[index] = null;
}

/* Generates the html of a card */
function generateCard(cardnum, suit, num) {
	$("#pile"+cardnum).html(generateCardHTML(cardnum,suit, num));
}

function generateCardHTML(cardnum,suit, num){
return "<div id='card" + cardnum + "' class='card' onclick='discard("+ cardnum + ")'>" +
		"<div class='side_container'>" +
                "<div class='upper_left " + suit + "'>" + num + " &" + suit + ";</div>" +
			"</div>" +
            "<div class='middle_container'>" +
				generateMiddleHTML(suit, num) +
			"</div>" +
            "<div class='side_container'>" +
                "<div class='bottom_right " + suit + "'>" + num + " &" + suit + ";</div>"+
                "</div>"+
"</div>"
}

function generateMiddleHTML(suit, num){
	switch(num) {
		case 2:
			return "<div class='top " + suit + "'>&" + suit + ";</div>"+
             "<div class='middle " + suit + "'></div>"+
             "<div class='bottom " + suit + "'>&" + suit + ";</div>";
    	case 3:
			return "<div class='top " + suit + "'>&" + suit + ";</div>"+
        	"<div class='middle " + suit + "'>&" + suit + ";</div>"+
        	"<div class='bottom " + suit + "'>&" + suit + ";</div>";
		case 4:
			return "<div class='top " + suit + "'>&" + suit + "; &" + suit + ";</div>"+
        	"<div class='middle " + suit + "'></div>"+
        	"<div class='bottom " + suit + "'>&" + suit + "; &" + suit + ";</div>";
		case 5:
			return "<div class='top " + suit + "'>&" + suit + "; &" + suit + ";</div>"+
        	"<div class='middle " + suit + "'>&" + suit + ";</div>"+
        	"<div class='bottom " + suit + "'>&" + suit + "; &" + suit + ";</div>";
		case 6:
			return "<div class='top " + suit + "'>&" + suit + "; &" + suit + ";</div>"+
        	"<div class='middle " + suit + "'>&" + suit + "; &" + suit + ";</div>"+
        	"<div class='bottom " + suit + "'>&" + suit + "; &" + suit + ";</div>"; 
	}
}


/* Animates the card moving to the discard pile */
function moveToDiscard(index) {
	switch(index) {
		case 0:
			$("#card"+index).animate({
				top: '427px',
				left: '203px'
			}, 500, function() {
				$("#card"+index).rotate({duration:600,angle:0,animateTo:40});
			});
			break;
		case 1:
			$("#card"+index).animate({
				top: '363px',
				left: '152px'
			}, 500, function() {
				$("#card"+index).rotate({duration:400,angle:0,animateTo:20});
			}); 
			break;
		case 2:
			$("#card"+index).animate({
				top: '324px',
				left: '86px'
			}, 500, function() {
			}); 
			break;
		case 3:
			$("#card"+index).animate({
				top: '307px',
				left: '9px'
			}, 500, function() {
				$("#card"+index).rotate({duration:400,angle:0,animateTo:-20});
			}); 
			break;
		case 4:
			$("#card"+index).animate({
				top: '317px',
				left: '-72px'
			}, 500, function() {
				$("#card"+index).rotate({duration:600,angle:0,animateTo:-40});
			}); 
			break;
	}
}

/* Shows/hides deck information on hover */
function showHover(num) {
	$('#hover' + num).show();
}

function hideHover(num) {
	$('#hover' + num).hide();
}




