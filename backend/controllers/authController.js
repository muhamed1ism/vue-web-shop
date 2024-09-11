import bcrypt from 'bcryptjs';
import prisma from '../config/db.js';
import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;
if (!jwtSecret) {
  console.log('Nema JWT tajnog ključa u .env');
}

export const registerUser = async (req, res) => {
  const { email, password, name, role } = req.body;
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Korisnik već postoji'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: role || 'USER',
      },
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email, role: newUser.role }, jwtSecret);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Registracija nije uspjela'})
  }
}

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Korisnik nije pronađen' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Nevažeće vjerodajnice' });
    }

    const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, jwtSecret);

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Prijava nije uspjela' });
  }
};

export const getUserData = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, email: true, name: true, role: true }
    });

    if (!user) {
      return res.status(404).json({ error: 'Korisnik nije pronađen'})
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Dohvaćanje korisničkih podataka nije uspjelo'})
  }
}