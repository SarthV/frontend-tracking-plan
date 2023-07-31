import React, { useState } from "react";
import Input from "./components/input";
import Separator from "./components/separator/separator";
import Button from "./components/button/button";
import axios from "axios";
import Snackbar from "./components/snackbar/snackbar";

const SimpleForm = () => {
    const initialFormData = {
        name: "",
        description: "",
        source: "",
    };
  const [formData, setFormData] = useState(initialFormData);
  const [events, setEvents] = useState([]);
  const [visible, setVisible] = useState(false);
  const [snackbarLabel, setSnackbarLabel] = useState('');
  const [snackbarColor, setSnackbarColor] = useState('red');


  const handleAddEvent = (event) => {
    event.preventDefault();

    setEvents(
        [...events, {name: '', description: '', rules: {}}]
    );
  }

  const handleEventChange = (event, index, eventField) => {
    const { name, value } = event.target;
    events[index][eventField] = value;  
  }


  const handleChange = (event) => {
    // console.log('event', name, value);
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const checkValidation = () => {
    for (const [key, value] of Object.entries(formData)) {
        if(!value || value === ""){
            setSnackbarColor('red');
            setSnackbarLabel(`Missing Fields`);
            return false;
        }
    };
    return true;
  }

  const handleSubmit = (event) => {
    if (!checkValidation()) {
        setVisible(true);
        return;
    }

    event.preventDefault();
    const parsedData = events.map((event) => {
        let parsedRules ={};
        try {
            console.log(event.rules, typeof event.rules);
          parsedRules = JSON.parse(event.rules);
        } catch (error) {
            setSnackbarLabel('Wrong Input');
        setVisible(true);
        }
      
        return {
          ...event,
          rules: parsedRules,
        };
      });
      
    console.log(events, 'events', parsedData);

    const postData = {
        ...formData,
        events: parsedData,
    };
    axios
      .post("http://localhost:8080/tracking-plan", postData)
      .then((response) => {
        setSnackbarColor('green');
        setSnackbarLabel(`Post created successfully!}`);
        setVisible(true);
        setFormData(initialFormData);
        setEvents([]);
        console.log("Post created successfully!", response.data);
      })
      .catch((error) => {
        console.log('err', error, error.message, typeof error.mesage)
        setSnackbarColor('red');
        setSnackbarLabel(`Error creating post  ${error.message}`);
        setVisible(true);
        setFormData(initialFormData);
        setEvents([]);
    
      });
  };

  return (
      <><form
          onSubmit={handleSubmit}
          className="form">
          <Separator height="10px" color="transparent" />

          <div className="form-container">

              <div className="form-label">
                  <label htmlFor="name">Name:</label>
                  <Input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange} />
              </div>
              <div className="form-label">
                  <label htmlFor="description">Description:</label>
                  <Input
                      type="text"
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      height="110px" />
              </div>
              <div className="form-label">
                  <label htmlFor="source">Source:</label>
                  <Input
                      type="text"
                      id="source"
                      name="source"
                      value={formData.source}
                      onChange={handleChange} />
              </div>
              <h2>Add Events</h2>
              {events.map((eventObj, index) => {
                  return (
                      <><div className="form-label">
                          <label htmlFor="event">Name:</label>
                          <Input
                              type="text"
                              id="eventName"
                              name="eventName"
                              onChange={(e) => handleEventChange(e, index, 'name')} />
                      </div><div className="form-label">
                              <label htmlFor="event">Description:</label>
                              <Input
                                  type="text"
                                  id="eventDescription"
                                  name="eventDescription"
                                  onChange={(e) => handleEventChange(e, index, 'description')} />
                          </div><div className="form-label">
                              <label htmlFor="event">Rules:</label>
                              <Input
                                  type="text"
                                  id="eventRules"
                                  name="eventRules"
                                  onChange={(e) => handleEventChange(e, index, 'rules')} />

                          </div>
                          <Separator color='black' height='1px' />
                      </>
                  );

              })}
              <div className="button-container">
              <Button onClick={(e) => handleAddEvent(e)} label="+ Add event" />

              </div>
              <Separator height="10px" color="transparent" />

          </div>
          <Button type="submit" label="Submit" />

      </form><Snackbar backgroundColor={snackbarColor} label={snackbarLabel} 
      visible={visible} 
      setVisible={setVisible} /></>
        
    
    
  );
};

export default SimpleForm;
