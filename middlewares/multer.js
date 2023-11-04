const multer = require('multer');
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

const middlewareUpload = upload.single('file')

module.exports = middlewareUpload;