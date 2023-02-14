const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

const LocationModel = require('./models/Location');


app.use(express.json());
app.use(cors());

mongoose.connect('add your own connection string',
 { useNewUrlParser: true, 
});


app.post('/create', async (req, res) => {
    const name = req.body.name;
    const address = req.body.address;

    const location = new LocationModel({
        name: name,
        address: address,});
        try {
            await location.save();
            res.send('Saved' + location);
        } catch (error) {
            console.log(error);
        }
        
    });
    
    app.get('/read', async (req, res) => {
        LocationModel.find({}, (err, result) => {
            if (err) {
                res.send(err);
            }
            res.send(result);
        });
    });

    app.put('/update', async (req, res) => {
        const newLocationName = req.body.name;
        const newLocationAddress = req.body.address;
        const id = req.body.id;
        try {
          const updatedLocation = await LocationModel.findByIdAndUpdate(id, { name: newLocationName, address: newLocationAddress });
          res.send('Updated');
        } catch (error) {
          console.log(error);
          res.status(500).send('Error updating location');
        }
      });

    //delete
    app.delete('/delete/:id', async (req, res) => {
        const id = req.params.id;
        await LocationModel.findByIdAndRemove(id).exec();
        res.send('Deleted');
    });


app.listen(3001, () => {
    console.log('Server is listening on port 3001');
    });