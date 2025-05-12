const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const SECRET = process.env.JWT_SECRET;

exports.signUp = async (req, res) => {
  try {
    const { nume, prenume, telefon, email, parola } = req.body;

    if (!nume || !prenume || !telefon || !email || !parola) {
      return res.status(400).send('Toate campurile sunt obligatorii');
    }

    if (!/^[0-9]{10}$/.test(telefon)) {
      return res.status(400).send('Telefon invalid.Trebuie sa aiba 10 cifre.');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).send('Email invalid');
    }

    if (parola.length < 8) {
      return res.status(400).send('Parola trebuie sa aiba cel putin 8 caractere');
    }

    const existent = await User.findOne({ where: { email } });
    if (existent) {
      return res.status(409).send('Exista deja un con creat cu aceasta adresa de e-mail');
    }

    const hashedPassword = await bcrypt.hash(parola, 10);
    const user = await User.create({
      nume,
      prenume,
      telefon,
      email,
      parola: hashedPassword,
      rol: 'client'
    });

    res.status(201).json({ message: 'Cont creat cu succes', userId: user.id });
  } catch (err) {
    res.status(500).send('Eroare la inregistrare: ' + err.message);
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, parola } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).send('Email inexistent');
    }

    const isMatch = await bcrypt.compare(parola, user.parola);
    if (!isMatch) {
      return res.status(401).send('Parola incorecta');
    }

    const token = jwt.sign(
      { id: user.id, rol: user.rol },
      SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).send('Eroare la autentificare: ' + err.message);
  }
};
