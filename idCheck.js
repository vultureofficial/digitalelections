

/*
* fx: checkID: (void) -> bool
*
* description: checks the ID for validation
*/



let checkId = function() {
    
    var id_tag = document.getElementById('nid'); 
    var id = id_tag.value; 
    
    var regex = /\d+/;
    var match = regex.exec(id);
    
    if(match != null) {
        var ver_id = match[0]; 
        
        if (ver_id.length != 13) {
            alert('Invalid id entered. Expected 13 digits but ' +
                    ver_id.length + 
                    ' digits were given.'
            );   
            return false; 
        }
        
        var year = id[0] + id[1]; 
        var month = id[2] + id[3]; 
        var day = id[4] + id[5]; 
        var gender = id[6]; 
        
        var numComb = id[7] + id[8] + id[9] ; 
        var citizen = id[10]; 
        var control = id[12]; 
        
        //alert("Year :" + year + "\nMonth :" + month + "\nday: " + day + "\ngender: " +gender); 
            
        var sGender; 
        if (parseInt(gender, 10) >= 0 && parseInt(gender, 10) < 5) sGender = 'Female'; 
        else if (parseInt(gender, 10) >= 5 && parseInt(gender, 10) < 9) sGender = 'Male'; 
        else {
            alert("invalid gender detected: Should be 'Male' or 'Female'."); 
            return false; 
        }
        
        if (parseInt(citizen, 10) != 0) {
            alert('Only citizens are allowed to vote')
          return false;     
        }

        window.location.href = "Home.html" ;

    
    } else {
        alert("Invalid details entered"); 
    }

}


let createVote = function(party) {
    // Add a new document in collection "cities"
    firebase.firestore().collection('politicalParties').doc(party).set({
        name: "Los Angeles",
        state: "CA",
        country: "USA"
    })
    .then(() => {
        console.log("Document successfully written!");
    })
    .catch((error) => {
        console.error("Error writing document: ", error);
    });
}


let getPoliticalParty = function(party) {
    var docRef = firebase.firestore().collection('politicalParties').doc(party);
    
    docRef.get().then((doc) => {
        if (doc.exists) {
            var data = doc.data();
            alert(data.name, data.votes); 
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch((error) => {
        alert("Error getting document:" + error);
        console.log("Error getting document:", error);
    });   
}






 function Validate() {
        // first clear any left over error messages
        //$('#error p').remove();

        // store the error div, to save typing
        var error = document.getElementById('error');

        var idNumber = document.getElementById('nid').value;

        // assume everything is correct and if it later turns out not to be, just set this to false
        var correct = true;

        //Ref: http://www.sadev.co.za/content/what-south-african-id-number-made
        // SA ID Number have to be 13 digits, so check the length
        if (idNumber.length != 13 || !isNumber(idNumber)) {
            error.insertAdjacentHTML('beforeend', '<p>ID number does not appear to be authentic - input not a valid number</p>');
            correct = false;
        }

        // get first 6 digits as a valid date
        var tempDate = new Date(idNumber.substring(0, 2), idNumber.substring(2, 4) - 1, idNumber.substring(4, 6));
				var currentYear = "" + new Date().getFullYear(); 

//7608150432089

        var id_date = tempDate.getDate();
        var id_month = tempDate.getMonth();
        var id_year = tempDate.getFullYear();

				var cyEnd = parseInt(currentYear[2] +  currentYear[3]); 
				var y_tmp = "" + id_year; 
				var idyEnd = parseInt(y_tmp[2] +  y_tmp[3]);

				//console.log('Left: ' + cyEnd + ' : Right: ' + idyEnd); 

				if (idyEnd > cyEnd) {
					id_year = parseInt('1900') + idyEnd; 
				} else {
					id_year = parseInt('2000') + idyEnd; 
				} 
				
				var temp_month = (id_month < 10 ? '0' + (id_month + 1) : id_month); 

        var fullDate = id_date + "-" + temp_month + "-" + id_year;

        if (!((tempDate.getYear() == idNumber.substring(0, 2)) && (id_month == idNumber.substring(2, 4) - 1) && (id_date == idNumber.substring(4, 6)))) {
            error.insertAdjacentHTML('beforeend', '<p>ID number does not appear to be authentic - date part not valid</p>');
            correct = false;
        }

        // get the gender
        var genderCode = idNumber.substring(6, 10);
        var gender = parseInt(genderCode) < 5000 ? "Female" : "Male";

        // get country ID for citzenship
        var citzenship = parseInt(idNumber.substring(10, 11)) == 0 ? "Yes" : "No";

        // apply Luhn formula for check-digits
        var tempTotal = 0;
        var checkSum = 0;
        var multiplier = 1;
        for (var i = 0; i < 13; ++i) {
            tempTotal = parseInt(idNumber.charAt(i)) * multiplier;
            if (tempTotal > 9) {
                tempTotal = parseInt(tempTotal.toString().charAt(0)) + parseInt(tempTotal.toString().charAt(1));
            }
            checkSum = checkSum + tempTotal;
            multiplier = (multiplier % 2 == 0) ? 1 : 2;
        }
        if ((checkSum % 10) != 0) {
            error.insertAdjacentHTML('beforeend','<p>ID number does not appear to be authentic - check digit is not valid</p>');
            correct = false;
        };


        // if no error found, hide the error message
        if (correct) {
            // clear the result div
            //$('#result').empty();
            // and put together a result message
            //$('#result').append('<p>South African ID Number:   ' + idNumber + '</p><p>Birth Date:   ' + fullDate + '</p><p>Gender:  ' + gender + '</p><p>SA Citizen:  ' + citzenship + '</p>');

					  createUser(idNumber);
     
				}
        // otherwise, show the error
        else {
            error.setAttribute('display', 'block');
        }

        return false;
    }

    function isNumber(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
    }

   




