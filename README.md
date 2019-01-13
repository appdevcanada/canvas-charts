# HTML Canvas Charts

A simple webpage that has two *Canvas* charts elements. These two elements display InfoGraphics that represent the contents of a **JSON** file created as a sample data repo.

## How it works
When page is loaded, JS access a **JSON** file reading all data for both charts and executes sequentially record by record setting properties for each chart type and filling charts data inside a predefined *Canvas* area in HTML.

The access to JSON file is done using command **FETCH**, like this:
```javascript
fetch(URL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // do something here
    })
    .catch(function (error) {
        alert(error);
    })
```

You can see some good examples here on Mobile App Design & Dev page on [Codepen](https://codepen.io/mad-d/pen/JoEPOo)
