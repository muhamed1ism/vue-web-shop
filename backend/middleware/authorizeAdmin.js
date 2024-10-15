const authorizeAdmin = (req, res, next) => {
  if (req.user.role !== 'ADMIN') {
    return res.status(403).json({ error: 'Not authorized' });
  }
  next();
};

export default authorizeAdmin;
