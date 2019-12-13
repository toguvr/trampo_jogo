const users = [
    {
      _id: "5dee6982d1d9393728903ac6",
      username: "Guto",
      email: "augusto_muralha@gmail.com",
      password: "guto123",
      __v: 0,
      vote: "5dee6982d1d9393728903ac6",
      vocation: "trabalhador",
      currentRoom: "5df251a0b8cf9b1348ec4d91",
      avatar: "le-1576162437152.jpg",
      avatar_url: "http://localhost:3333/files/le-1576162437152.jpg",
      id: "5dee6982d1d9393728903ac6"
    },
    {
      _id: "5df0e3edb3a08a3ca0d22845",
      username: "Toguzera",
      email: "augudsto_muralha@gmail.codsfg",
      password: "guto123",
      __v: 0,
      vocation: "trabalhador",
      avatar: "ninjalogo-1576157190950.png",
      currentRoom: "5df251a0b8cf9b1348ec4d91",
      avatar_url: "http://localhost:3333/files/ninjalogo-1576157190950.png",
      id: "5df0e3edb3a08a3ca0d22845"
    }
  ]

  const idRemove = users.find(id=> id.id==="5df0e3edb3a08a3ca0d22845")
  const index = users.indexOf(idRemove)
  users.splice(index, 1)

  console.log(users)

