const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
  express: server,
  autoescape: false,
  noCache: true
})

server.get("/", function (req, res) {
  const about = {
    avatar_url:
      "https://avatars1.githubusercontent.com/u/61801640?s=460&u=e2851fa39a930461c24b087aacd1c009b2ba77fe&v=4",
    name: "Renato Adriano de Souza",
    role: "Aluno - Bootcamp Rocketseat",
    description:
      'Estudando programação para novos desafios, aprendendo java Script, html, php, e css.<br>Aluno da&nbsp<a href="https://rocketseat.com.br" target="_blank">Rocketseat</a>',
    links: [
      { name: "Github", url: "https://github.com/renatounico/" },
      { name: "Twitter", url: "https://twitter.com/renatounico1/" },
      {
        name: "Linkedin",
        url: "https://linkedin.com/in/renato-adriano-de-souza/",
      },
    ],
  };

  return res.render("about", { about });
});

server.get("/portfolio", function (req, res) {
  return res.render("portfolio", { items: videos })
})

server.get("/video", function (req, res) {
  const id = req.query.id

  const video = videos.find(function (video) {
    return video.id == id
  })

  if (!video) {
    return res.send("Video not Found!")
  }
  return res.render("video", { item: video })
})

server.listen(5500, function () {
  console.log("server is running")
})