/**
 * point 0, 0
 * point x1, y1, m1, r1 or l1, angle1
 * point x2, y2, m2, r2 or l2, angle2
 */

var canvas = document.getElementsByTagName('canvas')[0];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');

var l1 = 200;
var l2 = 200;
var m1 = 20;
var m2 = 20;
var angle1 = Math.PI / 2;
var angle2 = Math.PI / 2;
var angle1_v = 0;
var angle2_v = 0;
var gravity = 1;
var friction = 0.9992;
context.translate(canvas.width/2, 50);
function animateAction()
{
    context.save();
    context.setTransform(1,0,0,1,0,0);
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.restore();
    var x1 = l1 * Math.sin(angle1);
    var y1 = l1 * Math.cos(angle1);

    var x2 = x1 + l2 * Math.sin(angle2);
    var y2 = y1 + l2 * Math.cos(angle2);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(x1, y1);
    context.strokeStyle = 'black';
    context.stroke();
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(x1,y1, m1, 0, Math.PI * 2, false);
    context.fill();

    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.strokeStyle = 'black';
    context.stroke();
    context.beginPath();
    context.fillStyle = 'black';
    context.arc(x2,y2, m2, 0, Math.PI * 2, false);
    context.fill();
    var num1 = -gravity * (2 * m1 + m2) * Math.sin(angle1);
    var num2 = -m2 * gravity * Math.sin(angle1 - 2*angle2);
    var num3 = -2 * Math.sin(angle1-angle2) * m2;
    var num4 = angle2_v*angle2_v*l2+angle1_v*angle1_v*l1*Math.cos(angle1-angle2);
    var denominator = l1 * (2 * m1+m2-m2*Math.cos(2*angle1-2*angle2));
    var angle1_acceleration = (num1+num2+num3*num4)/denominator;


    var numa1 = 2*Math.sin(angle1 - angle2);
    var numa2 = (angle1_v*angle1_v*l1*(m1+m2));
    var numa3 = gravity * (m1+m2) * Math.cos(angle1);
    var numa4 = angle2_v*angle2_v*l2*m2*Math.cos(angle1-angle2);
    var denominatora = l2 * (2 * m1+m2-m2*Math.cos(2*angle1-2*angle2));
    var angle2_acceleration = (numa1*(numa2+numa3+numa4))/denominatora;
    angle1_v+=angle1_acceleration;
    angle2_v+=angle2_acceleration;
    angle1+=angle1_v;
    angle2+=angle2_v;

    angle1_v *= friction;
    angle2_v *= friction;
    requestAnimationFrame(animateAction);
}

animateAction();