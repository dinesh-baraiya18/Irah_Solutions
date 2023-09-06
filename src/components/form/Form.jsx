import React, { useState } from "react";
import { InputLabel, FormControl, Input, Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";

const dbUrl = "https://irahsolution-923b5-default-rtdb.firebaseio.com";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    note: "",
  });

  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length === 0) {
      setErrors({});

      try {
        await axios.post(`${dbUrl}/userdata.json`, formData);
        toast.success("Form submitted successfully!", {
          autoClose: 2000,
        });
        setFormData({ name: "", email: "", phone: "", note: "" });
      } catch (error) {
        console.log(error);
        toast.error("Failed to submit the form. Please try again later.");
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const inputFormData = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = (data) => {
    const errors = {};

    if (!data.name.trim()) {
      errors.name = "Name is required";
    }

    if (!data.email.trim()) {
      errors.email = "Email is required";
    } else if (!isValidEmail(data.email.trim())) {
      errors.email = "Invalid email address";
    }

    if (!data.phone.trim()) {
      errors.phone = "Phone is required";
    } else if (!isValidPhone(data.phone.trim())) {
      errors.phone = "Invalid phone number";
    }
    return errors;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  return (
    <form onSubmit={handleSubmit} method="POST">
      <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
        <InputLabel htmlFor="name-input">Name</InputLabel>
        <Input
          id="name-input"
          type="text"
          name="name"
          value={formData.name}
          onChange={inputFormData}
        />
        {errors.name && (
          <span className="error" style={{ color: "red" }}>
            {errors.name}
          </span>
        )}
      </FormControl>
      <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
        <InputLabel htmlFor="phone-input">Phone</InputLabel>
        <Input
          id="phone-input"
          type="number"
          name="phone"
          value={formData.phone}
          onChange={inputFormData}
        />
        {errors.phone && (
          <span className="error" style={{ color: "red" }}>
            {errors.phone}
          </span>
        )}
      </FormControl>
      <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
        <InputLabel htmlFor="email-input">Email</InputLabel>
        <Input
          id="email-input"
          type="email"
          name="email"
          value={formData.email}
          onChange={inputFormData}
        />
        {errors.email && (
          <span className="error" style={{ color: "red" }}>
            {errors.email}
          </span>
        )}
      </FormControl>
      <FormControl sx={{ m: 1, width: "100%" }} variant="standard">
        <InputLabel htmlFor="note-input">Note</InputLabel>
        <Input
          id="note-input"
          type="text"
          name="note"
          value={formData.note}
          onChange={inputFormData}
        />
      </FormControl>
      <div
        className="btn-wrapper"
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Button type="submit" color="primary" variant="contained">
          Book a Demo Free
        </Button>
      </div>
    </form>
  );
};

export default Form;
