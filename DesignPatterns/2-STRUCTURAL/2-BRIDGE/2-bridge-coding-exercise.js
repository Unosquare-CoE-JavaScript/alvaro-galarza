class Shape
{
  constructor(renderer, name=null)
  {
    this.renderer = renderer;
    this.name = name;
  }

  toString()
  {
    return `Drawing ${this.name} as ${this.renderer.whatToRenderAs}`;
  }
}

class Triangle extends Shape
{
  constructor(renderer)
  {
    super(renderer, 'triangle');
  }
}

class Square extends Shape
{
  constructor(renderer)
  {
    super(renderer, 'square');
  }
}

class RasterRenderer
{
  get whatToRenderAs()
  {
    return 'pixels';
  }
}

class VectorRenderer
{
  get whatToRenderAs()
  {
    return 'lines';
  }
}

let sq = new Square(new VectorRenderer());
console.log(sq.toString());

let tr = new Triangle(new RasterRenderer());
console.log(tr.toString());
