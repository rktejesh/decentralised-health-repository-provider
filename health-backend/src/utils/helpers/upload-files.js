// const multer = require('multer');
// const express = require('express');
import multer from 'multer';
import express from 'express';

const filestorage = multer.diskStorage({
    destination: function (req, file, callback) {
        // console.log(req);
        callback(null, './uploads/');
    },
    filename: function (req, file, callback) {
        //   const name = Date.now().toString()+'--'+ String(file.originalname);
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        // console.log(uniqueSuffix);

        callback(null, file.fieldname + '-' + uniqueSuffix);
    }
});
export default multer({ storage: filestorage }); 