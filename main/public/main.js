
let signedIn = false;
let signedInUser;
let signedInUserId;
let staff = false;

/*
+-------------+
|STAFF CHANGES|
+-------------+
*/

function staffSignIn() {

    let http = new XMLHttpRequest();
    let url = '/staffSignIn';

    let params = `staffID=${document.getElementById('staffIDInput').value}&password=${document.getElementById('staffPassword').value}`;

    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            let response = JSON.parse(http.responseText);

            if (response.code == 2) {
                alert("Invalid Login\nPlease Try Again");
            } else {
                signedInUser = response.name;
                signedInUserId = response.id;
                signedIn = true;
                staff = true;
                window.location.href = "/staffPanel.html";
            }
        };
    };
    http.send(params);
};

function registerStaffMember() {

    /*
    if (staff == false) {
        alert("Not signed in as staff");
    } else {}
    */

    let http = new XMLHttpRequest();
    let url = '/registerStaff';

    let staffPosition = document.getElementById('staffPosInput').value;
    let staffName = document.getElementById('staffNameInput').value;
    let staffID = document.getElementById('staffIDInput').value;
    let staffPassword = document.getElementById('staffPassword').value;
    let staffPasswordV = document.getElementById('staffPasswordV').value;

    let params = `job=${staffPosition}&sName=${staffName}&staffID=${staffID}&password=${staffPassword}&passwordV=${staffPasswordV}`;

    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            
            let response = JSON.parse(http.responseText);

            // Processing Error Codes
            if (response.code == 2) {
                alert("Passwords do not match\nPlease try again")
            } else if (response.code == 4) {
                alert("ID already in Database");
            } else if (response.code == 3) {
                alert("Register Passed but not confirmed");
            } else if (response.code == 1) {
                alert("Error encountered, please contact administrator.");
            } else {
                alert("Staff Registration Successful!");
                window.location.href = '/staffPanel.html'
            };
        };
    };
    http.send(params);
};

function updateStaffMember() {

    /*
    if (staff == false) {
        alert("Not signed in as staff");
    } else {}
    */

    let http = new XMLHttpRequest();
    let url = '/updateStaff';

    let staffName = document.getElementById('staffNameInput').value;
    let staffPosition = document.getElementById('staffPosInput').value;
    let staffID = document.getElementById('staffIDInput').value;
    let staffAddress = document.getElementById('staffAddressInput').value;
    let staffPhone = document.getElementById('staffPhoneInput').value;
    let staffPassword = document.getElementById('staffPassword').value;
    let staffPasswordV = document.getElementById('staffPasswordV').value;

    let params = `sName=${staffName}&staffID=${staffID}&address=${staffAddress}&phone=${staffPhone}&password=${staffPassword}&passwordV=${staffPasswordV}&job=${staffPosition}`;

    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            
            let response = JSON.parse(http.responseText);

            // Processing Error Codes
            if (response.code == 2) {
                alert("Passwords do not match\nPlease try again")
            } else if (response.code == 4) {
                alert("ID already in Database");
            } else if (response.code == 3) {
                alert("Register Passed but not confirmed");
            } else if (response.code == 1) {
                alert("Error encountered, please contact administrator.");
            } else if (response.code == 5) {
                alert("Must fill at least one field to update.");
            } else {
                alert("Staff Information Updated!");
                window.location.href = '/staffPanel.html'
            };
        };
    };
    http.send(params);
};

function listStaffData() {
    

    let http = new XMLHttpRequest();
    let url = '/getStaffData';

    let staffID = document.getElementById('staffIDInput').value;
   
    let params = `staffID=${staffID}`;
    
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            let response = JSON.parse(http.responseText);

            // Processing Error Codes
            if (response.code != null) {
                if (response.code == 2) {
                    alert('ID does not exist or does not belong to Staff');
                } else {
                    alert("Error encountered, please contact administrator.");
                }
                // Putting Staff data into nice visual card format
            } else {
                let vals = response.val.split('|');

                vals.shift();
                let values = 
                    `<div class="card-cData">
                        <h4>Staff Name: ${vals[0]}</h4>
                        <h4>Staff ID: ${vals[1]}</h4>
                        <h4>Staff Position: ${vals[2]}</h4>
                        <h4>Staff Address: ${vals[3]}</h4>
                        <h4>Staff Phone: ${vals[4]}</h4>
                    </div>
                    `;

                    document.getElementById('staff-data-area').innerHTML = values;
                };
            };
        }
    http.send(params);
};

function removeStaffMember() {

    /*
    if (staff == false) {
        alert("Not signed in as staff");
    } else {}
    */

    let http = new XMLHttpRequest();
    let url = '/removeStaff';

    let staffID = document.getElementById('staffIDInput').value;
   
    let params = `staffID=${staffID}`;

    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            
            let response = JSON.parse(http.responseText);

            // Processing Error Codes
            if (response.code == 2) {
                alert("No staff member found with given ID")
            } else if (response.code == 4) {
                alert("Entered ID belongs to Patient");
            } else if (response.code == 3) {
                alert("Delete Passed but not confirmed");
            } else if (response.code == 1) {
                alert("Error encountered, please contact administrator.");
            } else {
                alert("Staff Removal Successful!");
                window.location.href = '/staffPanel.html'
            };
        };
    };
    http.send(params);
};

/*
+----------------+
|CUSTOMER CHANGES|
+----------------+
*/

function registerCustomer() {

    /*
    if (staff == false) {
        alert("Not signed in as staff");
    } else {}
    */

    let http = new XMLHttpRequest();
    let url = '/registerCustomer';

    let customerName = document.getElementById('customerNameInput').value;
    let customerID = document.getElementById('customerIDInput').value;
    let customerAddress = document.getElementById('customerAddressInput').value;
    let customerPhone = document.getElementById('customerPhoneInput').value;
    let customerPassword = document.getElementById('customerPassword').value;
    let customerPasswordV = document.getElementById('customerPasswordV').value;

    let params = `cName=${customerName}&cID=${customerID}&address=${customerAddress}&phone=${customerPhone}&password=${customerPassword}&passwordV=${customerPasswordV}`;

    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            
            let response = JSON.parse(http.responseText);

            // Processing Error Codes
            if (response.code == 2) {
                alert("Passwords do not match\nPlease try again")
            } else if (response.code == 4) {
                alert("ID already in Database");
            } else if (response.code == 3) {
                alert("Register Passed but not confirmed");
            } else if (response.code == 1) {
                alert("Error encountered, please contact administrator.");
            } else {
                alert("Patient Registration Successful!");
                window.location.href = '/staffPanel.html'
            };
        };
    };
    http.send(params);
};

function updateCustomer() {

    /*
    if (staff == false) {
        alert("Not signed in as staff");
    } else {}
    */

    let http = new XMLHttpRequest();
    let url = '/updateCustomer';

    let customerName = document.getElementById('customerNameInput').value;
    let customerID = document.getElementById('customerIDInput').value;
    let customerAddress = document.getElementById('customerAddressInput').value;
    let customerPhone = document.getElementById('customerPhoneInput').value;
    let customerPassword = document.getElementById('customerPassword').value;
    let customerPasswordV = document.getElementById('customerPasswordV').value;

    let params = `cName=${customerName}&cID=${customerID}&address=${customerAddress}&phone=${customerPhone}&password=${customerPassword}&passwordV=${customerPasswordV}`;

    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            
            let response = JSON.parse(http.responseText);

           // Processing Error Codes
            if (response.code == 2) {
                alert("Passwords do not match\nPlease try again")
            } else if (response.code == 4) {
                alert("ID already in Database");
            } else if (response.code == 3) {
                alert("Register Passed but not confirmed");
            } else if (response.code == 1) {
                alert("Error encountered, please contact administrator.");
            } else if (response.code == 5) {
                alert("Must fill at least one field to update.");
            } else {
                alert("Patient Information Updated!");
                window.location.href = '/staffPanel.html'
            };
        };
    };
    http.send(params);
};

function listCustomerData() {
    

    let http = new XMLHttpRequest();
    let url = '/getCustomerData';

    let customerID = document.getElementById('customerIDInput').value;
   
    let params = `cID=${customerID}`;
    
    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            let response = JSON.parse(http.responseText);

            // Processing Error Codes
            if (response.code != null) {
                if (response.code == 2) {
                    alert('ID does not exist or does not belong to Patient');
                } else {
                    alert("Error encountered, please contact administrator.");
                }
            // Putting Information into card format
            } else {
                console.log(response);
                let vals = response.val.data.split('|');

                vals.shift();
                let values = 
                    `<div class="card-cData">
                        <h4>Patient Name: ${vals[0]}</h4>
                        <h4>Patient ID: ${vals[1]}</h4>
                        <h4>Patient Address: ${vals[2]}</h4>
                        <h4>Patient Phone: ${vals[3]}</h4>
                    </div>
                    `;

                    document.getElementById('customer-data-area').innerHTML = values;
                

                // Putting Reports into seperate cards and listing them
                let reports = response.val.reports.split(/\n/);

                reports.shift();
                if (reports.length > 0) {
                    let reportListings = reports.slice().map(reports => 
                        `<div class="card-cData">
                            <h4>Report Number: ${reports.split('|')[1]}</h4>
                            <h4>Consult Time and Date: ${reports.split('|')[2].slice(0, 24)}</h4>
                            <h4>Patient Date of Birth: ${reports.split('|')[4].slice(4, 15)}</h4>
                            <h4>Staff ID: ${reports.split('|')[3]}</h4>
                            <h4>Report Summary: </h4><p>${reports.split('|')[5]}<p>
                            <h4>Other Disclosed Issues: </h4><p>${reports.split('|')[6]}<p>
                            <h4>Given Treatment: </h4><p>${reports.split('|')[7]}<p>
                        </div>`
                        ).join('');

                    document.getElementById('customer-report-area').innerHTML =  reportListings;
                }
                
                
                
                
                };
            };
        }
    http.send(params);
};

function removeCustomer() {

    /*
    if (staff == false) {
        alert("Not signed in as staff");
    } else {}
    */

    let http = new XMLHttpRequest();
    let url = '/removeCustomer';

    let customerID = document.getElementById('customerIDInput').value;
   
    let params = `cID=${customerID}`;

    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            
            let response = JSON.parse(http.responseText);

            // Processing Error Codes
            if (response.code == 2) {
                alert("No patient found with given ID")
            } else if (response.code == 4) {
                alert("Entered ID belongs to Staff");
            } else if (response.code == 3) {
                alert("Delete Passed but not confirmed");
            } else if (response.code == 1) {
                alert("Error encountered, please contact administrator.");
            } else {
                alert("Patient Removal Successful!");
                window.location.href = '/staffPanel.html'
            };
        };
    };
    http.send(params);
};

function createCustomerReport() {

    let http = new XMLHttpRequest();
    let url = '/createCustomerReport';

    let customerID = document.getElementById('customerIDInput').value;
    let currentDateAndTime = document.getElementById('consultDate').value;
    console.log(currentDateAndTime);
    let customerBirthday = document.getElementById('dateOfBirth').value;
    console.log(customerBirthday);
    let staffID = document.getElementById('staffID').value;
    let summary = document.getElementById('consSummary').value;
    let priorIssue = document.getElementById('priorIssues').value;
    let treatment = document.getElementById('treatment').value;

    let params = `cID=${customerID}&currentDT=${currentDateAndTime}&cBday=${customerBirthday}&staffID=${staffID}&summary=${summary}&issues=${priorIssue}&treatment=${treatment}`;

    http.open('POST', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            
            let response = JSON.parse(http.responseText);

            // Processing Error Codes
            if (response.code == 2) {
                alert("Cannot leave fields blank\nPlease try again")
            } else if (response.code == 1) {
                alert("Error encountered, please contact administrator.");
            } else if (response.code == 3) {
                alert("Staff ID does not exist or is not staff")
            } else {
                alert("Patient Report Created Successfully!");
                window.location.href = '/staffPanel.html'
            };
        };
    };
    http.send(params);


};

function getAllCustomerList() {

    let http = new XMLHttpRequest();
    let url = '/getAllCustomers';

    http.open('GET', url, true);

    http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            let response = JSON.parse(http.responseText);

            // Processing Error Codes
            if (response.code != null) {
                alert("Error encountered, please contact administrator.");
            
            // Putting all customers into card format.
            } else {
                let vals = response.val.split(/\n/);

                vals.shift();

                if (vals.length > 0) {
                    let values = vals.slice().map(vals => 
                    `<div class="card">
                        <h4>Patient Name: ${vals.split('|')[0]}</h4>
                        <h4>Patient ID: ${vals.split('|')[1]}</h4>
                    </div>
                    `).join('');

                    document.getElementById('customer-list').innerHTML = values;

                };
            };
        }
    };
    http.send();
};