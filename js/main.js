let canvas, context;

document.addEventListener('DOMContentLoaded', (e)=>{
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    canvas.width = 600;
    canvas.height = 400;
    
    context.strokeStyle = "black";
    context.fillStyle = "gold";
    context.beginPath();
    context.moveTo(200, 200);
    let radius = 100;
    context.arc(300,200,radius, 0, Math.PI+1);
    context.lineWidth = 1;
    context.lineTo(300,200);
    context.font = '1rem Calibri, Helvetica, Arial, sans-serif';
    context.textAlign = 'start';  //same as left if text direction is ltr
    //context.fillStyle = "black";
    context.fillText(calcPerc(Math.PI+1), 100, 20);
    context.stroke();
    context.fill();
    context.closePath();
});

function calcPerc(valToPerc) {
    let retPerc = Math.round(valToPerc * 100 / (2*Math.PI));
    return retPerc;
}