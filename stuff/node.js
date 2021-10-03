const bp = require("body-parser");
const express = require("express");
const recipePage = express();
const path = require("path");

recipePage.use(bp.json());
recipePage.use(bp.urlencoded({extended: true}));
//recipePage.use(express.static(path.join(__dirname, "stuff")));

let recipes = [
    {"name": "ooo", "instructions": ["Something", "Anything"], "ingredients": ["Kristo", "Kristo", "Kristo"]},
    {"name": "aaa", "instructions": ["Everything", "Nothing"], "ingredients": ["Lasse", "Lasse", "Lasse"]}
];

let requestedDish;

recipePage.get("/recipe/:food", (req, res) => {
    requestedDish = res.req.params.food;
    res.sendFile(path.join(__dirname, "Week4.html"));
})

recipePage.get("/dish", (req, res) => {
    for(let i = 0; i<recipes.length; i++) {
        if (recipes[i].name == requestedDish) {
            res.json(recipes[i]);
        }
    }
})

recipePage.post("/recipe/", (req, res) => {
    recipes.push(req.body);
})

recipePage.listen(8000);