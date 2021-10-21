const multer = require('multer');
const slugify = require('slugify');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "./uploads")
    },
    filename: (req, file, cb)=>{
        const ext = file.mimetype.split('/')[1];
        cb(null, `${slugify(file.originalname, {
            replacement: '-',
            remove: undefined,
            lower: true,
            strict: false,
            locale: 'vi'
          })}.${ext}`)
    }
})

const upload = multer({
    storage: storage
})

module.exports = {upload}