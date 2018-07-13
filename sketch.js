var points = []

function setup()
{
  createCanvas(900,900)

  maxPoints=900000000;
  vIndex=0;
  sx = 0;
  sy = 0;
  points[0] = generateNextPoint(createVector(sx,sy));
}

function draw()
{
  drawPoint()

  for(i = 0;i<100; i++)
  {
    if(points.length<maxPoints)
      points.push(generateNextPoint(points[points.length-1]));
  }

  sliceUpdate()

}

function sliceUpdate()
{
    if(vIndex>height)
      vIndex = -height;
    else
      vIndex+=10;
}

function drawPoint()
{
  background(0);
  stroke(255);

  var lastpoint;
  for(var o of points)
  {
    //−2.1820 < x < 2.6558 and 0 ≤ y < 9.9983.
    var px = map(o.x,-2.1820, 2.6558,0,width);
    var py = map(o.y,0,9.9983,height,0);

    colorf(py);

    if(py>=0+vIndex && py<=height+vIndex)
      point(px,py);

  }
}

function generateNextPoint(prec)
{
  var x = prec.x
  var y = prec.y;
  r = random(1);

  if(r>0 && r<=0.01)
  {
    x = 0;
    y = 0.16 * y;
  }
  else if (r>0.01 && r<=0.86)
  {
    x = 0.85 *x + 0.04 *y;
    y = -0.04 *x + 0.85 *y + 1.6;
  }
  else if (r>0.85 && r<=0.93)
  {
    x = 0.2 *x - 0.26 *y;
    y = 0.23 *x + 0.22 *y + 1.6;
  }
  else
  {
    x = -0.15 *x + 0.28 *y;
    y = 0.26 *x + 0.24 *y + 0.44;
  }

  return createVector(x,y);
}

function colorf(y)
{
  var b = map(y,height,0,0,255);
  var g = map(y,height,0,255,0);
  stroke(0,g,b)
}
