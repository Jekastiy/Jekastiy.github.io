import { App } from "../app/app"

let app = new App()

let Navigate = url => document.location.href = url

console.log("index.js done")
console.log($`App: { app.name }`)