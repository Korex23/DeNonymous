import { useState, useEffect } from "react";

const SignUpForm = () => {
  const initialValues = {
    email: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
  };

  const [userDetails, setUserDetails] = useState(initialValues);
  const [users, setUsers] = useState([]);
  const [formErrors, setFormErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setUserDetails({ ...userDetails, [name]: newValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      userDetails.password !== userDetails.confirmPassword ||
      !userDetails.email ||
      !userDetails.password ||
      !userDetails.confirmPassword ||
      !userDetails.termsAndConditions
    ) {
      e.preventDefault();
      setIsFormSubmitted(false);
    } else {
      setUserDetails(initialValues);
      setUsers([...users, userDetails]);
      console.log(users);
      setIsFormSubmitted(true);
    }
    setFormErrors(validate(userDetails));
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isFormSubmitted) {
      console.log(users); // Log users after successful submission
      // Reset isSubmit to false after processing the submission
      setIsFormSubmitted(false);
    } else {
      console.log("Invalid Form");
    }
  }, [formErrors, isFormSubmitted, users]);

  const validate = (values) => {
    let errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 8) {
      errors.password = "Password must be 8 or more characters";
    }

    if (!values.confirmPassword) {
      errors.confirmPassword = "Confirm Password is required";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "Confirm Password must match Password";
    }

    if (!values.termsAndConditions) {
      errors.termsAndConditions = "Accept Terms and Conditions";
    }

    return errors;
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email"
            className="border border-rounded border-gray-400"
            value={userDetails.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            className="border rounded border-gray-400"
            value={userDetails.password}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm password"
            className="border rounded border-gray-400"
            value={userDetails.confirmPassword}
            onChange={handleChange}
          />
        </div>
        <div>
          <input
            type="checkbox"
            name="termsAndConditions"
            id="termsAndConditions"
            checked={userDetails.termsAndConditions}
            onChange={handleChange}
          />
          <label htmlFor="termsAndConditions">
            Accept Terms and Conditions
          </label>
        </div>
        <div>
          <button type="submit" className="border p-2 rounded">
            Submit
          </button>
          <button type="button" className="border p-2 rounded">
            Sign In with Google
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpForm;
