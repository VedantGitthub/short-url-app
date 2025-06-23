const express = require("express");
const {handleGenerateNewShortURL,handleGetRedirecttURL,handleGetAnalytics} = require("../controller/url");
const router = express.Router();

router.post('/url',handleGenerateNewShortURL);

router.get('/:shortId',handleGetRedirecttURL);

router.get('/urlAnalytics/:shortId',handleGetAnalytics);

module.exports = router;