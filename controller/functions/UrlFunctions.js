const db = require("../../database/db");

// Messages
const URL_DELETED = process.env.URL_DELETED;
const URL_CREATED = process.env.URL_CREATED;
const FETCHED_ALL = process.env.FETCHED_URLS;
const ALREADY_EXISTS = process.env.ALREADY_EXISTS;
const URL_FOUND = process.env.URL_FOUND;

// Database Queries
const INSERT = process.env.URL_INSERT;
const FINDALL = process.env.URL_FINDALL;
const URLFIND = process.env.URL_FIND;
const FINDBYSHORT = process.env.URL_FINDBYSHORT;
const DELETEURL = process.env.URL_DELETEURL;

const URL = function (url) {
  this.longURL = url.longURL;
  this.shortURL = url.shortURL;
};

URL.create = async (newURL, result) => {
  await db.query(URLFIND, [newURL.longURL], (error, data) => {
    if (error) {
      result(error, null);
      return;
    }
    if (data.length > 0) {
      console.log(ALREADY_EXISTS);
      result(null, data);
      return;
    }
    db.query(
      INSERT,
      [newURL.urlId, newURL.longURL, newURL.shortURL, newURL.created_dt],
      (error, res) => {
        if (error) {
          result(error, null);
          return;
        }
        console.log(URL_CREATED);
        result(null, res);
      }
    );
  });
};
URL.findAll = async (result) => {
  await db.query(FINDALL, (error, data) => {
    if (error) {
      result(error, null);
      return;
    }
    console.log(FETCHED_ALL);
    result(null, data);
  });
};

URL.delete = async (urlId, result) => {
  await db.query(DELETEURL, [urlId], (error, data) => {
    if (error) {
      result(error, null);
      return;
    }
    console.log(URL_DELETED);
    result(null, data);
  });
};

URL.findByShortURL = async (shortUrl, result) => {
  await db.query(FINDBYSHORT, [shortUrl], (error, data) => {
    if (error) {
      result(error, null);
      return;
    }
    console.log(URL_FOUND);
    result(null, data);
  });
};
module.exports = URL;
