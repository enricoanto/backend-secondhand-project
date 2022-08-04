const app = require('express')()
const admin = require('../helpers/firebase')
app.locals.bucket = admin.storage().bucket()

const upload_image = async (files, type) => {
    try {
        let result = {}
        let image = files.image;
        result.name = `${Number(new Date())}-${image.name}`
        result.name = result.name.replace(/ /g, "_")
        result.url = `https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/${type}%2F${result.name}?alt=media`
        await app.locals.bucket.file(`${type}/${result.name}`).createWriteStream().end(files.image.data)
        return result
    } catch (err) {
        return err
    }
}

module.exports = upload_image