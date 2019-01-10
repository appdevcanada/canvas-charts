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
    context.arc(300,200,radius, 0, Math.PI/3);
    context.lineWidth = 2;
    context.stroke();
    context.fill();
    context.closePath();
});
