const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

const port = 3000;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'server/uploads');
    },
    filename: (req, file, cb) => {        
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png' || file.mimetype.includes("excel") || file.mimetype.includes("spreadsheetml"))
    {
        cb(null, true);
    }
    else
    {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
app.post('/upload', upload.single('file'), (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));