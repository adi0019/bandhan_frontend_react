import React, { useState } from "react";
//import { useNavigate } from 'react-router-dom';

import "./RegisterDialog.css";
import { Link } from "react-router-dom";


const RegisterDialog = ({ onClose }) => {
  const [profileFor, setProfileFor] = useState("");
  const [gender, setGender] = useState("");
  const [religion, setReligion] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", dob: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
 

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  //const navigate = useNavigate();
 
  const handleProfileSelection = (value) => {
    setProfileFor(value);
  
    if (value === "Son") {
      setGender("Male");
      setStep(3); // Move directly to name & DOB input
    } else if (value === "Daughter") {
      setGender("Female");
      setStep(3); // Move directly to name & DOB input
    } else if (value === "Myself" || value === "Relative") {
      setStep(2); // Move to the gender selection step
    }
  };

  const handleGenderSelection = (value) => {
    setGender(value);
    setStep(3); // Move to name & DOB input
  };

 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "dob") {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      const age = currentDate.getFullYear() - selectedDate.getFullYear();
      const isBirthdayPassed =
        currentDate.getMonth() > selectedDate.getMonth() ||
        (currentDate.getMonth() === selectedDate.getMonth() && currentDate.getDate() >= selectedDate.getDate());
  
      const calculatedAge = isBirthdayPassed ? age : age - 1;
  
      if (gender === "Male" && calculatedAge < 21) {
        alert("Males must be at least 21 years old.");
        return;
      } else if (gender === "Female" && calculatedAge < 18) {
        alert("Females must be at least 18 years old.");
        return;
      } else if (gender === "Other" && calculatedAge < 21) {
        alert("Others must be at least 21 years old.");
        return;
      }
    }
  
    // Validation for firstName and lastName
    if ((name === "firstName" || name === "lastName") && (/[\d]/.test(value) || !value.trim())) {
      alert(`${name === "firstName" ? "First" : "Last"} name cannot be empty or contain digits.`);
      return;
    }
  
    setFormData({ ...formData, [name]: value });
  };
  

  const handleReligionChange = (e) => {
    setReligion(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneChange = (e) => {
    setPhoneNumber(e.target.value);
  };

 
  

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 6) {
      setPasswordError("Password must be at least 6 characters.");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== password) {
      setConfirmPasswordError("Passwords do not match.");
    } else {
      setConfirmPasswordError("");
    }
    
    
  };

  const handleSubmit = () => {
    const finalData = {
      profileFor,
      gender,
      religion,
      address,
      email,
      phoneNumber,
      //otp,
      password,
      ...formData,
    };

    localStorage.setItem("userData", JSON.stringify(finalData));
    window.alert("User is registered! Click OK for confirmation.");

    

    // Set submission state to true
    setIsSubmitted(true);

    if (passwordError || confirmPasswordError) {
      alert("Please fix password errors before submitting.");
      return;
    }
    if (!address.trim()) {
      alert("Address cannot be empty.");
      return;
    }

    // Validate Password field (must be at least 10 digits)
    if (!password.trim()) {
      alert("Password cannot be empty.");
      return;
    } else if (password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    // Validate Confirm Password (must match Password)
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
    if(!phoneNumber.trim()){
      alert("Phone number cannot be empty.");
      return;
    }
    if(phoneNumber.length <10){
      alert("Phone number be at least 10 digit long.");
      return;
    }

    // Validate Email field (must contain '@')
    if (!email.trim()) {
      alert("Email cannot be empty.");
      return;
    } else if (!email.includes("@")) {
      alert("Email must contain '@' symbol.");

      if (isSubmitted) {
        // If data is submitted, redirect using <Link>
        return (
          <div>
            <p>User is registered!</p>
            <p></p>
            <Link to="/subplan">
              <button>OK</button>
            </Link>
          </div>
        );
        
      }
      return;


    }


   

    // Navigate to the next page with the form data passed through state
   // navigate('/subscribtionpage', { state: { formData: finalData } });
 //  navigate("/subscriptionpage", { state: finalData });
 //navigate("/subscriptionpage", { state: finalData });
  };

  



  

  const fetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getAddressFromCoordinates(latitude, longitude);
        },
        (error) => {
          alert("Error fetching location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Updated function using OpenStreetMap Nominatim API
  const getAddressFromCoordinates = (lat, long) => {
    const geocodeUrl = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`;

    fetch(geocodeUrl)
      .then(response => response.json())
      .then(data => {
        if (data && data.display_name) {
          setAddress(data.display_name); // Set the address from the response
        } else {
          alert("No address found for this location.");
        }
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
        alert("Error fetching address.");
      });
  };

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {step === 1 && (
          <>
            <div className="icon">
              <img src="https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" alt="Profile" className="profile-icon" />
            </div>
            <h2>This Profile is For</h2>
            <div className="toggle-buttons">
              {["Myself", "Son", "Daughter", "Relative"].map((option) => (
                <button
                  key={option}
                  className={`toggle-button ${profileFor === option ? "active" : ""}`}
                  onClick={() => handleProfileSelection(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <h2>Select Gender</h2>
            <div className="toggle-buttons">
              {["Male", "Female", "Other"].map((option) => (
                <button
                  key={option}
                  className={`toggle-button ${gender === option ? "active" : ""}`}
                  onClick={() => handleGenderSelection(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </>
        )}
        {step === 3 && (
          <>
            <h2>Enter Your Details</h2>
            <div className="form-fields"
            >
               
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
              />
              <label htmlFor="dob">Enter Your Birth Date </label>
              <input
              
                type="date"
                name="dob"
                placeholder="Birth Date"
                value={formData.dob}
                onChange={handleInputChange}
              />
            </div>
            <button className="submit-button" onClick={() =>{
        if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.dob.trim()) {
          alert("First Name, Last Name, and Date of Birth are required.");
          return;
        } setStep(4);}}>
              Next
            </button>
          </>
        )}
        {step === 4 && (
          <>
            <h2>Religion, Address, and Contact Details</h2>
            <div className="form-fields">
              <input
                type="text"
                name="religion"
                placeholder="Religion"
                value={religion}
                onChange={handleReligionChange}
              />
              <textarea
                name="address"
                placeholder="Address (3 lines)"
                value={address}
                onChange={handleAddressChange}
                rows="3"
              ></textarea>
              <button onClick={fetchLocation} className="location-button">
                Fetch Location
              </button>
            </div>
            <button className="submit-button" onClick={() =>{
              if (!religion.trim()) {
                alert("Religion cannot be empty.");
                return;
              } else if (/\d/.test(religion)) {
                alert("Religion cannot contain digits.");
                return;
              }
          
              // Validate Address field
              if (!address.trim()) {
                alert("Address cannot be empty.");
                return;
              }
          
              // If validation passes, move to the next step
              setStep(5);}}>
              Next
            </button>
          </>
        )}
        {step === 5 && (
          <>
            <h2>Email, Phone Number, and Password</h2>
            <div className="form-fields">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
              />
              
              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={handlePhoneChange}
              />
              
            </div>
            <div className="form-fields">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
              {passwordError && <p className="error">{passwordError}</p>}
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
              />
              {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
            </div>
            <div className="form-fields">
              
            </div>
            <Link to="/subplan">
            <button className="submit-button" onClick={handleSubmit}>
              Submit
            </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
  
  
};


export default RegisterDialog;
