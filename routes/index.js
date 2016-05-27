module.exports = (app)=>{
const multerConfig = require('../lib/multerConfig.js');
const controller = require('../controller/ImageController.js');

  /* GET home page. */
  app.get('/', controller.index);
  app.get('/uploadImage', controller.getFileUpload);
  app.post('/uploadImage', multerConfig.single('image'), controller.fileUpload);
}
