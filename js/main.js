let canvas, ctxpie, cpw, cph, radius, cpwm, cphm, startAngle, endAngle, midAngle, lblRadius, lX, lY;
let chtHeight, offsetX, barWidth, barHeight, spcBetweenPoints, cbXInit, chtArea;
let lblName, lblPerc, hexColour, qtyItems;

document.addEventListener('DOMContentLoaded', (e)=>{
    getJSONData();
});

function getJSONData() {
    let URL = "https://mora0199.github.io/canvas-charts/students.json";

    fetch(URL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            qtyItems = data.studentslist.studentdata.length;
            setChartsDefault();
            for (let item in data.studentslist.studentdata) {
                lblPerc = data.studentslist.studentdata[item].perc;
                lblName = data.studentslist.studentdata[item].name;
                hexColour = data.studentslist.studentdata[item].colour;
                buildPieChart();
                buildBarChart();
            }
        })
        .catch(function (error) {
            alert(error);
        })
}

function setChartsDefault () {
    canvaspie = document.getElementById('canvaspie');
    canvasbar = document.getElementById('canvasbar');
    ctxpie = canvaspie.getContext('2d');
    ctxbar = canvasbar.getContext('2d');
    cpw = canvaspie.width;
    cbw = canvasbar.width;
    cph = canvaspie.height;
    cbh = canvasbar.height;
    cpwm = cpw / 2;
    cphm = cph / 2;

    //clear both canvas areas
    ctxpie.clearRect(0, 0, cpw, cph);
    ctxbar.clearRect(0, 0, cbw, cbh);

    // Pie Chart properties
    radius = 100;
    startAngle = 0;
    ctxpie.font = ".8rem Calibri, Helvetica, Arial, sans-serif";
    ctxpie.lineWidth = 1;
    ctxpie.textAlign= "center";
    ctxpie.textBaseline= "middle";
    ctxpie.strokeStyle = "grey";

    // Bar Chart properties
    // the percentage of each value in JSON will be used
    // to determine the height of the bars based on Canvas height.
    ctxbar.font = ".8rem Calibri, Helvetica, Arial, sans-serif";
    ctxbar.lineWidth = 1;
    ctxbar.strokeStyle = "grey";
    chtHeight = 400;    // bottom edge of the chart
    offsetX = 40;	// space away from left edge of canvas to start drawing.
    spcBetweenPoints = 20; // how far apart to make each X value.
    cbXInit = offsetX + 20;	// left edge of first rectangle
    chtArea = cbw - cbXInit - offsetX;
    barWidth = chtArea / qtyItems - spcBetweenPoints;	// width of each bar in the chart
    ctxbar.beginPath();
    ctxbar.moveTo(offsetX, (cbh-chtHeight)/2);
    ctxbar.lineTo(offsetX, chtHeight+(cbh-chtHeight)/2);
    ctxbar.lineTo(cbw-offsetX, chtHeight+(cbh-chtHeight)/2);
    ctxbar.stroke();  
    ctxbar.closePath();
}

function calcSlice(valPerc) {
    return (valPerc * (Math.PI * 2) / 100) + startAngle;
}

function lblPosition(factor) {
    lblRadius = radius * factor;
    lX = cpwm + (lblRadius) * Math.cos(midAngle);
    lY = cphm + (lblRadius) * Math.sin(midAngle);
}

function buildPieChart() {
    ctxpie.fillStyle = hexColour;
    ctxpie.beginPath();
    endAngle = calcSlice(lblPerc);
    ctxpie.moveTo(cpwm, cphm);
    ctxpie.arc(cpwm,cphm,radius, startAngle, endAngle);
    ctxpie.lineTo(cpwm,cphm);
    ctxpie.fill();
    ctxpie.stroke();
    ctxpie.closePath();

    ctxpie.beginPath();
    midAngle = startAngle + (endAngle - startAngle) / 2;
    lblPosition(.75);
    ctxpie.fillStyle = 'white';
    ctxpie.fillText(lblPerc + "%", lX, lY);
    lblPosition(1.3);
    ctxpie.fillStyle = hexColour;
    ctxpie.fillText(lblName, lX, lY);
    ctxpie.closePath();

    startAngle = endAngle;
}

function buildBarChart() {
    ctxbar.beginPath();
    ctxbar.fillStyle = hexColour;
    barHeight =  lblPerc * chtHeight / 100;
    ctxbar.rect(cbXInit, (chtHeight+(cbh-chtHeight)/2), barWidth, -1 * barHeight);
    // All the Perc labels for the bars are top
    ctxbar.fillText(lblPerc + "%", cbXInit+4, (chtHeight+(cbh-chtHeight)/2) - barHeight - spcBetweenPoints/2);
    ctxbar.fill();
    ctxbar.stroke();
    ctxbar.closePath();
    // Set new 0,0 with translate and rotate canvas to show text/subtitle
    ctxbar.beginPath();
    ctxbar.save();
    ctxbar.translate(cbXInit,(chtHeight+(cbh-chtHeight)) - spcBetweenPoints*4);
    ctxbar.rotate(45 * (Math.PI / 180));
    ctxbar.fillText(lblName, 0, 0);
    ctxbar.restore();
    ctxbar.fill();
    ctxbar.stroke();
    ctxbar.closePath();
    // Save X position for next bar
    cbXInit = cbXInit + barWidth + spcBetweenPoints;	    
}