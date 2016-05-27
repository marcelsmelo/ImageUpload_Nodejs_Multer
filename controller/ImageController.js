const fs = require('fs');
const AWS = require('aws-sdk');
const config = require('../config/config.js');

module.exports = {
  index: (req, res, next)=>{
      res.render('index', { title: 'Express' });
  },

  fileUpload: (req, res, next)=>{
    AWS.config.update({
      accessKeyId: config.amazonAccessKeyID,
      secretAccessKey: config.amazonSecretAccessKey,
      region: 'sa-east-1'
    });

    var s3 = new AWS.S3({params: {Bucket: 'cardapio01'}});

    //const image = fs.createReadStream(req.file.path);
      let params = {
        Key: 'testeIMG.jpg',
        ACL: 'public-read',
        ContentType: req.file.minetype,
        ContentLength: req.file.size,
        Body: req.file.buffer,

      };

      s3.putObject(params).send((err, data)=>{
        console.log('ERR', err);
        console.log('DATA', data);
        res.status(200).json({success: true, msg: req.file});
      });

  },

  getFileUpload: (req, res, next)=>{
    res.render('upload');
  }
}
