let canvas, ctx, cw, ch, radius, cwm, chm, startAngle, endAngle, midAngle, lblRadius, lX, lY;

document.addEventListener('DOMContentLoaded', (e)=>{
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    cw = canvas.width;
    ch = canvas.height;
    cwm = cw / 2;
    chm = ch / 2;
    radius = 100;
    startAngle = 0;
    tmp = 85;
    label = "Test";
    
    ctx.font = '1rem Calibri, Helvetica, Arial, sans-serif';
    ctx.lineWidth = 1;
    ctx.textAlign='center';
    ctx.textBaseline='middle';
    ctx.strokeStyle = "grey";
    ctx.fillStyle = rndHEXClr();
    ctx.beginPath();
    endAngle = calcSlice(tmp); //(tmp / 100) * Math.PI * 2 + startAngle;
    ctx.moveTo(cwm, chm);
    ctx.arc(cwm,chm,radius, startAngle, endAngle);
    ctx.lineTo(cwm,chm);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    midAngle = startAngle + (endAngle - startAngle) / 2;
    lblPosition(.55);
    ctx.fillStyle = 'white';
    ctx.fillText(tmp, lX, lY);
    lblPosition(.85);
    ctx.fillText(label, lX, lY);
    ctx.closePath();

    startAngle = endAngle;
});

function calcSlice(valPerc) {
    return (valPerc * (Math.PI * 2) / 100) + startAngle;
}

function rndHEXClr () {
    return "#" + Math.random().toString(16).slice(2,8);
}

function lblPosition (factor) {
    lblRadius = radius * factor;
    lX = cwm + (lblRadius) * Math.cos(midAngle);
    lY = chm + (lblRadius) * Math.sin(midAngle);
}