const app = require("./app")

async function main() {
  app.listen(app.get("port"))
  console.log(`Server On Port: ${app.get("port")}`)
  console.log("http://localhost:4000")
}

main()
