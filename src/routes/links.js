const express = require('express');
const router = express.Router();

const pool = require('../database');
const {isLoggedin}=require('../lib/auth');

router.get('/add', isLoggedin, (req, res) => {
    res.render('links/add');
});

/*async para al inicio del CALLBACK para que sepa que usaremos await
await = para saber que es una peticion asincrona, que que sepa que ese paticion 
        tomara su tiempo   */
router.post('/add', isLoggedin, async (req, res) => {
    const { title, url, description } = req.body;
    const newlink = {
        title,
        url, description,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newlink]);
    ///*mensajes*/req.flash('success', 'Link saved succesfully');
    res.redirect('/links');
});

router.get('/', isLoggedin, async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id=?',[req.user.id]);
    res.render('links/list', { links });
});

router.get('/delete/:id', isLoggedin, async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE id=?', [id]);
    /*mensajes*/req.flash('success', 'Enlace removido con exito');
    res.redirect('/links');
});

router.get('/edit/:id', isLoggedin, async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id=?', [id]);
    res.render('links/edit', { link: links[0] }); //links[0] para que solo muestre ese objeto y no todos los objetos
});
router.post('/edit/:id', isLoggedin, async (req, res) => {
    const { id } = req.params;
    const { title, url, description } = req.body;
    const newLink = {
        title,
        url,
        description
    };
    await pool.query('UPDATE links set ? WHERE id=?', [newLink, id]);
    /*mensajes*/req.flash('success', 'Link editado exitosamente');
    res.redirect('/links');
});
module.exports = router;