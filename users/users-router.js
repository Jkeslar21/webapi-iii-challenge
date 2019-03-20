const express = require('express');

const router = express.Router();

const db = require('../data/helpers/userDb')

router.post('/', (req, res) => {
    const userInfo = req.body;
    !userInfo.name
    ? res
        .status(400).json({ errorMessage: "Please provide a name for the user." })
    : db 
        .insert(userInfo)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the user to the database" });
        })
})

router.get('/', (req, res) => {
    db
        .get()
        .then(db => {
            res
                .status(200)
                .json(db);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "This user information could not be retrieved."})
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    db
    .getById(id)
    .then(post => {
        if (post.length === 0) {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        } else {
            res.status(200).json(post);
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The user information could not be retrieved." });
    })
})

router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db
    .remove(id)
    .then(post => {
        if (post) {
            res.status(204).end();
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    })
    .catch(err => {
        res.status(500).json({ error: "The user could not be removed" });
    })
})

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const postInfo = req.body;
    !postInfo.title || !postInfo.contents
    ? res
        .status(400)
        .json({ errorMessage: "Please provide title and contents for the post." })
    : db
        .update(id, postInfo)
        .then(count => {
            if (count === 0){
                res
                    .status(404)
                    .json({ message: "The user with the specified ID does not exist." })
            }
            db
                .getById(id)
                .then(post => {
                    if (post.length === 0) {
                        res
                            .status(404)
                            .json({ message: "The user with the specified ID could not be located." })
                    } else {
                        res
                            .json(post)
                    }
                })
                .catch(err => {
                    res
                        .status(500)
                        .json({ message: "An error occured while attempting to locate the user."})
                })
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The post information could not be modified." })
        })
});

module.exports = router;