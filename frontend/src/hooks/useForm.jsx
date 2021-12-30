import React from 'react'

export function useForm() {
  const [formData, setFormData] = React.useState({});

  const register = (name) => {
    return {
      value: formData[name] || "",
      onChange: (e) => {
        setFormData({
          ...formData,
          [name]: e.target.value
        })
      }
    };
  };

  const onSubmit = (handler) => {
    return (event) => {
      event.preventDefault();
      handler(formData);
    }
  }
  
  return {
    register,
    onSubmit
  }
}
