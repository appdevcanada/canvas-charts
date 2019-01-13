let canvas, ctx, cw, ch, radius, cwm, chm, startAngle, endAngle, midAngle, lblRadius, lX, lY;
let lblName, lblPerc, hexColour;

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
            canvas = document.getElementById('canvas');
            ctx = canvas.getContext('2d');
            cw = canvas.width;
            ch = canvas.height;
            cwm = cw / 2;
            chm = ch / 2;
            radius = 100;
            startAngle = 0;
            for (let item in data.studentslist.studentdata) {
                lblPerc = data.studentslist.studentdata[item].perc;
                lblName = data.studentslist.studentdata[item].name;
                hexColour = data.studentslist.studentdata[item].colour;
                console.log("passei " + lblPerc);
                buildCharts();
            }
        })
        .catch(function (error) {
            alert(error);
        })
}

function calcSlice(valPerc) {
    return (valPerc * (Math.PI * 2) / 100) + startAngle;
}

function lblPosition (factor) {
    lblRadius = radius * factor;
    lX = cwm + (lblRadius) * Math.cos(midAngle);
    lY = chm + (lblRadius) * Math.sin(midAngle);
}

function buildCharts() {
    ctx.font = ".8rem Calibri, Helvetica, Arial, sans-serif";
    ctx.lineWidth = 1;
    ctx.textAlign= "center";
    ctx.textBaseline= "middle";
    ctx.strokeStyle = "grey";
    ctx.fillStyle = hexColour;

    ctx.beginPath();
    endAngle = calcSlice(lblPerc); //(tmp / 100) * Math.PI * 2 + startAngle;
    ctx.moveTo(cwm, chm);
    ctx.arc(cwm,chm,radius, startAngle, endAngle);
    ctx.lineTo(cwm,chm);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    midAngle = startAngle + (endAngle - startAngle) / 2;
    lblPosition(.75);
    ctx.fillStyle = 'white';
    ctx.fillText(lblPerc + "%", lX, lY);
    lblPosition(1.3);
    ctx.fillStyle = hexColour;
    ctx.fillText(lblName, lX, lY);
    ctx.closePath();

    startAngle = endAngle;
}
