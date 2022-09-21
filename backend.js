


let createUser = function(id) {
    var voted = false; 
    firebase.firestore().collection('voters').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            var data = doc.data(); 
            
            if (id === data.id) {
				     //alert(id + ":" + name + ":" + votes); 
                document.getElementById("tmp").innerText = data.id; 
                //document.getElementById("webID").innerText = id;
                document.getElementById("myForm").style.display = "block";
                voted = true; 
                return false;
			}
        });
	
    if (!voted) {
        firebase.firestore().collection("voters").add({
        id: id
        })
        .then(() => {
        if (!voted) window.location.href = "Home.html" ; 
        })
        .catch((error) => {
                Alert("Error writing document: " + error);
        });
    }

    }); 

		return true; 
}




let createPost = function(id, name, votes, logo) {
    var layout = document.getElementById('main'); 
    let img = document.createElement('img');
    let anchor = document.createElement('a');
    var outer_div = document.createElement('div'); 
    outer_div.className = "post " + pickSize(); 


    anchor.onclick = function() {
        //alert(id + ":" + name + ":" + votes); 
        document.getElementById("tmp").innerText = name;
        document.getElementById("webID").innerText = id;
        document.getElementById("myForm").style.display = "block";

        var btn = document.getElementById("voteBtn"); 
        btn.onclick = function() {
            var docRef = firebase.firestore().collection('politicalParties').doc(id);
            
            docRef.get().then((doc) => {
                if (doc.exists) {
                    var data = doc.data();
                    var vt = data.votes; 
                    vt++; 
                   
                    var pP = firebase.firestore().collection('politicalParties').doc(id);

                    var setWithMerge = pP.set({
                        votes: vt
                    }, { merge: true });
                     alert("You have sucessfully voted for " + name); 
                } else {
                    // doc.data() will be undefined in this case
                    alert("No such document!");
                }
            }).catch((error) => {
                alert("Error getting document:" + error);
                console.log("Error getting document:", error);
            }); 
        }
    }; 


    img.src = logo; 
    img.className = "image";    
    anchor.appendChild(img);
    outer_div.appendChild(anchor); 

    layout.appendChild(outer_div);
}


function randomInteger(min, max) {
    return Math.floor(min + Math.random()*(max - min + 1))
}

function pickSize() {
    var size = randomInteger(1,3); 
    /*switch(size) {
        case 1:
            return 'h-stretch'; 
        case 2:
            return 'big-stretch'; 
        default:
            return ""; 
    }*/

    return '';
}


let getPoliticalParties = function() {
	const ref = firebase.firestore().collection('politicalParties');
	ref.get().then((querySnapshot) => {
		querySnapshot.forEach((doc) => {
		    var id = doc.id; 
            var data = doc.data(); 
            var name = data.name; 
            var votes = data.votes; 
            var logo = data.logo; 
            
            createPost(id, name, votes, logo); 
            //data_arr.push({"id": id,  "party": name, "votes": votes})
            //parties[id] = name;
            //alert(data_arr[0]['party']); 
		 });
	});
	

}
