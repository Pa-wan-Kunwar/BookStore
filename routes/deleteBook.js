const express = require('express');
const db = require('../db/dbConnect');
const appError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const { sellData
} = require('../validateData');
const router = express.Router();

router.delete('/deleteBook', catchAsync(async (req, res, next) => {
    var {id} = req.body;
    throw new appError("ohh boy");
    await db.query("SELECT * FROM Books WHERE id = ?", [id], (err, result) => {
        if (err)
            res.send(err);
        else if (result[0] == null)
            next(new appError(`No data found by id:${id}`))
        else {
            db.query("DELETE FROM Books WHERE id = ?", id, (err, result) => {
                if (err) next(new appError(err.sqlMessage, 502));
                else {
                    res.json({
                        result,
                        Message: `Successfully deleted book with id ${id}`
                    });
                }
            })

        }
    })


}

));




module.exports = router;