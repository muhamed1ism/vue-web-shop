import pkg from 'jsonwebtoken';
import dotenv from 'dotenv';

const {sign, verify} = pkg;

dotenv.config();

const generateToken = (user) => {
  return sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
};

const verifyToken = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'Pristup odbijen' });
  }

  try {
    req.user = verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    res.status(400).json({ error: 'Neispravan token' });
  }
};

export default { generateToken, verifyToken };