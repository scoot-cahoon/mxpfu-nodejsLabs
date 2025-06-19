const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
  res.send(JSON.stringify({users}, null, 4));
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
    const email = req.params.email;
    // Filter the users array to find users whose email matches the extracted email parameter
    let filtered_users = users.filter((user) => user.email === email);
    // Send the filtered_users array as the response to the client
    res.send(filtered_users);
});


// POST request: Create a new user
router.post("/",(req,res)=>{
  users.push({
        "firstName": req.query.firstName,
        "lastName": req.query.lastName,
        "email": req.query.email,
        "DOB": req.query.DOB
    });
    // Send a success message as the response, indicating the user has been added
    res.send("The user " + req.query.firstName + " has been added!");
});


// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
// Extract email parameter and find users with matching email
    const email = req.params.email;
    //filter all but the email passed in
    let filtered_users = users.filter((user) => user.email === email);
    //if found continue
    if (filtered_users.length > 0) {
        // Select the first matching user and update attributes if provided
        let filtered_user = filtered_users[0];
        //UPDATES ANY PASSED PARAMETER AND SKIPS WHATEVER WAS LEFT OUT
         // Extract and update DOB if provided
        //get DOB from parameters submitted with the PUT
        let DOB = req.query.DOB; 
        //If there is one in the string update the DOB in the filtered out user object   
        if (DOB) {
            filtered_user.DOB = DOB;
        }
        
         let firstName = req.query.firstName; 
        //If there is one in the string update the firstName in the filtered out user object   
        if (firstName) {
            filtered_user.firstName = firstName;
        }

        let lastName = req.query.lastName; 
        //If there is one in the string update the lastName in the filtered out user object   
        if (lastName) {
            filtered_user.lastName = lastName;
        }
       
        
        // Replace old user entry with updated user
        //FILTERS out just the email passed in so the object is removed from the JSON obj
        users = users.filter((user) => user.email != email);
        //updated object is pushed back into th eJSON Obj
        users.push(filtered_user);
        
        // Send success message indicating the user has been updated
        res.send(`User with the email ${email} updated.`);
    } else {
        // Send error message if no user found
        res.send("Unable to find user!");
    }
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  const email = req.params.email;
  users = users.filter((user) => user.email != email);
  res.send(`User with the email ${email} deleted.`);
});

module.exports=router;
