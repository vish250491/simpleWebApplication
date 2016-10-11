/*****************************************************************
 ***
 *** API routes
 ***
 ******************************************************************/

module.exports = function (app, db, express) {


    app.get('/notes/:userId', function (req, res) {
        var userId = req.params.userId;

        db.notes.findAll({
            where: ["userId = ?", userId],
            raw: true
        }).then(function (notes) {
            console.log('---------------',notes);
            if (notes) {
                res.json(notes)
            } 

        });

    });

    app.post('/addNotes', function (req, res) {
        var newNoteData = req.body;
  
        db.notes.create(newNoteData).then(function (response) {
            if (response) {
                res.json(response.dataValues)
            }else{

                db.notes.find({
                    where: ["userId = ?", newNoteData.userId]
                }).then(function (notes) {
                    console.log('-----notes-------',notes);
                    if (!notes) {
                        res.json(notes)
                    } else {
                        res.json([])
                    }

                });
            }

        });

    });


}