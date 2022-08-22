import { Plain } from "./src/plain.js";

const plain = Plain();

const text = plain.create("p", {
    children: "Hello Plain!"
});

text.putInside("#wrapper");

const title = plain.create("h1", {
    children: "Hello Plain!"
});

title.putAfter("p");

const button = plain.create("button", {
    children: "Click me!",
    attributes: {
        type: "button",
        title: "Click me, seriously!",
        class: "btn btn-primary"
    }
});

button.putAfter("h1");

const div = plain.create("div", {
    children: button.created
}).putAfter(button.created);