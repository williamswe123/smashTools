const player = []; 
const match_list = []
current_match = 0;

function init() {
	document.addEventListener('keyup', event => {
		if (event.code === 'Space') {
			nextMatch();
		}
	})
}

function nextMatch() {
	current_match = (current_match + 1) % match_list.length;
	updateMatchList();
}

function addPlayerPopUp() {
	document.body.innerHTML += 
	"<div id='add_player_popup' class='stack-top'>"
		+"<p>Add Player</p>"
		+"<textarea id='add' name='add' rows='1' cols='15'></textarea>"
		+"<div class='btn-group'>"
  			+"<button onclick='addPlayer()'>Add</button>"
  			+"<button onclick='close_add_popup()'>Cancel</button>"
		+"</div>"
	+"</div>";
}

function removePlayerPopUp(){
	player_buttons = ""

	for(let i=0; i<player.length; i++){
		player_buttons = player_buttons + "<button onclick=\"removePlayer('" + player[i] + "')\">" + player[i] + "</button>\n"
	}

	document.body.innerHTML += 
	"<div id='remove_player_popup' class='stack-top'>"
		+"<p>Remove Player</p>"
		+ player_buttons
	+"</div>";
}

function removePlayer(player_name) {
	const index = player.indexOf(player_name);
	if (index > -1) { 
  		player.splice(index, 1);
	}
	else{
		console.log("No such player: " + player_name)
	}
	close_remove_popup()
	console.log(player)
	remakeMatchList()
	updateMatchList()
}

function close_remove_popup() {
	var elem = document.getElementById("remove_player_popup");
  	elem.parentNode.removeChild(elem);
}

function close_add_popup() {
	var elem = document.getElementById("add_player_popup");
  	elem.parentNode.removeChild(elem);
}

function addPlayer() {
	var player_name = document.getElementById("add").value;
	player.push(player_name)
	remakeMatchList()
	updateMatchList()
	close_add_popup()
}

function remakeMatchList() {
	match_list.length = 0;

	for (let p1 = 0; p1 < player.length; p1++) {
		for (let p2 = 0; p2 < player.length; p2++) {

			if (!(player[p1] === player[p2] || match_list.includes(player[p2] + " vs " + player[p1]))) {
				match_list.push(player[p1] + " vs " + player[p2]);
			}
		}
	}

	shuffled_match_list = shuffle(match_list)
}

function updateMatchList() {

	var match_list_element = document.getElementById("match_list");
	match_list_element.innerHTML = '';

	for (let i = 0; i < shuffled_match_list.length; i++) {
		console.log(match_list[i]);
		
		var li = document.createElement("li");
		li.appendChild(document.createTextNode(shuffled_match_list[i]));
		if (i == current_match) {
			li.setAttribute('style', 'background-color: darkgreen; color: white;',);
		}
		match_list_element.appendChild(li);
	}
}


function shuffle(array) {
  const newArray = [...array]
  const length = newArray.length

  for (let start = 0; start < length; start++) {
    const randomPosition = Math.floor((newArray.length - start) * Math.random())
    const randomItem = newArray.splice(randomPosition, 1)

    newArray.push(...randomItem)
  }

  return newArray
}




