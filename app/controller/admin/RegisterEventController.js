const user = require('../../models/User')
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const eventtypes = require('../../models/Eventtypes')
const createcategory = require('../../models/CreateCategory')
const moment = require('moment'); // Import moment.js or any other date formatting library you prefer
const superuser = require('../../models/User')


  exports.GetAllBackendEvents = async (req, res) => {
    try {
      const allevents = await eventtypes
        .find({}, '-createdAt -updatedAt')
        .sort({ createdAt: -1 });
  
      // Map through the allevents array and format the event dates
      const formattedEvents = allevents.map(event => ({
        // Copy all properties except createdAt and updatedAt
        ...event._doc,
        eventstartDate: moment(event.eventstartDate).format('DD-MM-YYYY'), // Format eventstartDate
        eventendDate: moment(event.eventendDate).format('DD-MM-YYYY') // Format eventendDate
      }));
  
      res.status(200).json({ allevents: formattedEvents });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  };
  

  exports.GetBackendEventById = async (req, res) => {
    try {
      const eventId = req.params.id; // Get the event ID from request params
  
      const event = await eventtypes.findById(eventId); // Find the event by its ID
  
      if (!event) {
        return res.status(404).json({ error: 'Event not found' });
      }
  
      res.status(200).json({ event });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  



  exports.GetBackendEventCount = async (req, res) => {
    try {
      const count = await eventtypes.countDocuments(); // Get the count of all events
    
      res.status(200).json({ count });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };



              exports.DeleteBackendEventById = async (req, res) => {
                try {
                    const eventId = req.params.id;
            
                    // Check if the event ID exists in the eventId field of the eventtypes model
                    const eventExists = await eventtypes.findOne({ eventId: eventId });
            
                    if (eventExists) {
                        return res.status(401).json({ error: "Can't delete this event" });
                    }
            
                    // If event doesn't exist in the eventId field, proceed with deletion
                    const deletedEvent = await eventtypes.findByIdAndDelete(eventId);
            
                    if (!deletedEvent) {
                        return res.status(404).json({ error: "Event not found" });
                    }
            
                    res.status(200).json({ message: "Event deleted successfully" });
                } catch (error) {
                    console.error(error);
                    res.status(500).json({ error: "An error occurred while deleting the Event." });
                }
            };
            
          


        
        exports.UpdateBackendEventById = async (req, res) => {
          try {
            const eventId = req.params.id;

            const updatedEvent = await eventtypes.findByIdAndUpdate(eventId, req.body, {
              new: true,
            });

            if (!updatedEvent) {
              return res.status(404).json({ error: "Book not found" });
            }

            res.status(200).json(updatedEvent);
          } catch (error) {
            console.error(error);
            res
              .status(500)
              .json({ error: "An error occurred while updating the book." });
          }
        };

        


// Function to format date (YYYY-MM-DD) to (DD/MM/YYYY)
const formatDate = (dateString) => {
  const [year, month, day] = dateString.split('-');
  const date = new Date(year, month - 1, day); // Month is 0-based in JavaScript Date

  const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;

  return formattedDate;
};



      

        exports.RegisterEvent = async (req, res) => {
          try {
            const { email, eventname, eventtype, fulladdress, eventstartDate, eventendDate, startTime, endTime } = req.body;
        
            const currentDate = new Date();
            const selectedDateTime = new Date(eventstartDate + 'T' + startTime);
        
            // Ensure the selected date and time are in the future
            if (selectedDateTime <= currentDate) {
              return res.status(400).json({ error: "Please select a date and time in the future." });
            }
        
            const newEvent = new eventtypes({ email, eventname, eventtype, fulladdress, eventstartDate, eventendDate, startTime, endTime });
            await newEvent.save();
        
            res.redirect('/backendevents.html'); // Adjust the redirect URL as per your backend route
            
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "An error occurred while creating the event." });
          }
        };
      

            exports.GetEventTypes = async (req, res) => {
              try {
                const allevents = await eventtypes.find({}).sort({ createdAt: -1 });
            
                // Format the event dates before sending the response
                const formattedEvents = allevents.map(event => ({
                  ...event._doc,
                  eventstartDate: moment(event.eventstartDate).format('DD-MM-YYYY'),
                  eventendDate: moment(event.eventendDate).format('DD-MM-YYYY'),
                  // Add other fields as needed
                }));
            
                res.status(200).json({ allevents: formattedEvents });
              } catch (error) {
                res.status(404).json({ error: error.message });
              }
            };






            
            


          exports.createcategory = async (req, res) => {
            try {
                const { category } = req.body;
                const existingCategory = await createcategory.findOne({ category });
        
                if (existingCategory) {
                    return res.status(409).json({ message: "Category already exists." });
                    // Or res.redirect with a query parameter to display a message
                    // res.redirect('/categorymanagement.html?message=Category%20already%20exists');
                }
        
                const newcategory = new createcategory({ category });
                await newcategory.save();
        
                // res.status(201).json(newcategory);
                res.redirect('/categorymanagement.html');
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "An error occurred while creating the category." });
            }
        }
        


          exports.getcategory = async (req, res) => {
            try {
                const events = await createcategory.find({}).sort({ createdAt:-1 });
                res.status(200).json(events);
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: "An error occurred while fetching events." });
            }
        };

        exports.TotalCategoriesCount = async (req, res) => {
          try {
            const count = await createcategory.countDocuments(); // Get the count of all events
          
            res.status(200).json({ count });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
        };

        exports.updatecategory = async (req, res) => {
          const categoryId = req.params.id;
          const updatedData = req.body;
        
          try {
            // Check if a category with the same name already exists
            const existingCategory = await createcategory.findOne({
              category: updatedData.category,
            });
        
            if (existingCategory && existingCategory._id.toString() !== categoryId) {
              return res
                .status(400)
                .json({ error: "Category with this name already registered" });
            }
        
            // Update the category if it's not found
            const category = await createcategory.findByIdAndUpdate(categoryId, updatedData, {
              new: true,
              runValidators: true,
            });
        
            if (!category) {
              return res.status(404).json({ error: "Category not found" });
            }
        
            res.status(200).json(category);
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error" });
          }
        };


      exports.deletecategory = async (req, res) => {
        try {
          const categoryId = req.params.id;
      
          // Find the category by ID
          const categoryToDelete = await createcategory.findById(categoryId);
      
          if (!categoryToDelete) {
            return res.status(404).json({ error: "Category not found" });
          }
      
          // Get the category name
          const categoryName = categoryToDelete.category;
      
          // Check if any doctor has the specified category name
          const doctorsWithCategory = await event.findOne({
            eventtype: categoryName,
          });
      
          if (doctorsWithCategory) {
            return res.status(400).json({
              error: "Cannot delete category as it is connected with events",
            });
          }
          const eventssWithCategory = await eventtypes.findOne({
            eventtype: categoryName,
          });
          if (eventssWithCategory) {
            return res.status(400).json({
              error: "Cannot delete category as it is connected with eventtypes",
            });
          }
          // If no associated doctors, proceed to delete the category
          const deleteCategory = await createcategory.findByIdAndDelete(categoryId);
      
          if (!deleteCategory) {
            return res.status(404).json({ error: "Category not found" });
          }
      
          res.status(200).json({ message: "Category deleted successfully" });
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .json({ error: "An error occurred while deleting the category." });
        }
      };

      exports.EditCategoryById = async (req, res) => {
        try {
          const categoryId = req.params.id;
          const category = await createcategory.findById(categoryId);
      
          if (!category) {
            return res.status(404).json({ error: "category not found" });
          }
      
          res.status(200).json(category);
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .json({ error: "An error occurred while fetching category data." });
        }
      };