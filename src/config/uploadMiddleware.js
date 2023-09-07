const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, res) {
        //if file doesn't exist => return null. Opposite, save it on uploads folder
        res(null, 'src/public/uploads/'); // uploads is the folder name
    },
    filename: function (req, file, res) {
        //if file doesn't exist => return null. Opposite, change file name from fieldname to new format
        res(null, 'image' + '_' + Date.now() + '.png');
    },
});
const upload = multer({ storage: storage });
module.exports = upload;
