const User = require('../models/User'); // Import model User

exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });

    if (!user) {
      return res.render('login', { error: 'Incorrect username or password' });
    }

    req.session.user = user;
    res.redirect('/admin');
  } catch (error) {
    console.error(error);
    res.status(500).send('Login error');
  }
};
