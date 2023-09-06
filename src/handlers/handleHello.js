function handleHello(req, res) {
  res.status(200).json({
    message: "Hello! Developer",
    cheer: " Happy Coding 🎉",
  });
}

module.exports = handleHello;
