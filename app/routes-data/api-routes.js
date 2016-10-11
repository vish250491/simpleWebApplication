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
                    if (!notes) {
                        res.json(notes)
                    } else {
                        res.json([])
                    }

                });
            }

        });

    });

    app.delete('/deleteNotes/:noteId', function (req, res) {
        var noteId = req.params.noteId;

        db.notes.destroy({
            where: ["id = ?", noteId]
        }).then(function (notes) {
            if(notes=="1")
                res.json({success:true});
            else
                res.json({success:false});

        });

    });


    app.post('/saveNotes', function (req, res) {
        var newNoteData = req.body;
        db.notes.update(newNoteData,{
            where: ["id = ?", newNoteData.id]
        }).then(function (response) {
            if (response) {
                if(response=="1")
                    res.json({success:true});
                else
                    res.json({success:false});
            }
        });

    });
    
}