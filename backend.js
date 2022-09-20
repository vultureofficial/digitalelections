


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


    let response = function() {
        var id = document.getElementById("webID").innerText; 
        console.log(id);
        var docRef = firebase.firestore().collection('politicalParties').doc(id);
        console.log(docRef); 

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



let createPost = function(id, name, votes, logo) {
    let img = document.createElement('img');
    let anchor = document.createElement('a');
    let div = document.createElement('div'); 
    div.className = "inner-gallery";

    anchor.onclick = function() {
        //alert(id + ":" + name + ":" + votes); 
        document.getElementById("tmp").innerTet = name;
        document.getElementById("webID").innerText = id;
        document.getElementById("myForm").styl.display = "block";
    }; 


    img.src = logo; 
    
    anchor.appendChild(img);
    div.appendChild(anchor);  
    document.getElementById("imageList").appendChild(div);
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
