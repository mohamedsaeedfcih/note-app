const { json } = require('body-parser');
const generator =require('../util/generator')
const memStorage =require('../util/memory.storage')
const model = require('../model/note.model')

exports.getallnotes = (req,res)=>{
    // const sqlId =generator.generate();
    // memstorage.store.setItem(sqlId,"1st key")

    // const sqlId_2 =generator.generate();
    // memstorage.store.setItem(sqlId_2,"2nd key")
    
    // var keys= memstorage.getkey(memstorage.store)
    var values = memStorage.getvalues(memStorage.store);
    console.log("Values ....... " + JSON.stringify(values));
    return res.status(200).send(JSON.stringify(values));
}

exports.savenotes = (req,res)=>{
    const sqlId =generator.generate();
    var createdBy = 'admin'
    var createdOn = new Date();
   // req.body
   var title = req.body.title;
   var content = req.body.content;
   if(!title || !content){
       return res.status(500).send({ error: 'Title and Content should not be empty' })
   }
   var Note = model.Note;
   var noteObj = new Note(sqlId , title , content , createdBy , createdOn);
   memStorage.store.setItem(sqlId , noteObj);
   return res.status(201).send("Successfully note saved ");

    
}

exports.updatenote = (req,res)=>{
    var createdBy = "admin";
    var createdOn = new Date();
    // req.body
    var noteId = req.body.noteId;
    var title = req.body.title;
    var content = req.body.content;
    if(!noteId){
        return res.status(500).send({ error: 'noteId should not be empty' })
    }
    if(!title || !content){
        return res.status(500).send({ error: 'Title and Content should not be empty' })
    }

    var noteItem = memStorage.store.getItem(noteId);
    if(!noteItem){
        return res.status(500).send({ error: 'noteId is not exist' })
    }
    
    var Note = model.Note;
    var noteObj = new Note(noteId , title , content , createdBy , createdOn);
    memStorage.store.setItem(noteId , noteObj);
    return res.status(200).send("Successfully note updated ");
}


exports.deletenotes = (req,res)=>{
    var noteId = req.params.noteId;

    // validate not empty
    if(!noteId){
        return res.status(500).send({ error: 'can not delete empty noteId' })
    }

    // validate is already exists
    var noteItem = memStorage.store.getItem(noteId);
    if(!noteItem){
        return res.status(500).send({ error: 'noteId is not exist' })
    }

    // is exits
    memStorage.store.removeItem(noteId);
    return res.status(200).send("Successfully note deleted ");
}