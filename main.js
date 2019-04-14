
window.onload = function () {
    var cenario = document.getElementById('cenario');
    var contexto = cenario.getContext('2d');

    var v1 = new Vertice(contexto, 300, 100, 15, 'black', 'v1');
    var v2 = new Vertice(contexto, 175, 125, 15, 'black', 'v2');
    var v3 = new Vertice(contexto, 100, 200, 15, 'black', 'v3');
    var v4 = new Vertice(contexto, 100, 300, 15, 'black', 'v4');
    var v5 = new Vertice(contexto, 150, 400, 15, 'black', 'v5');
    var v6 = new Vertice(contexto, 300, 450, 15, 'black', 'v6');
    var v7 = new Vertice(contexto, 425, 400, 15, 'black', 'v7');
    var v8 = new Vertice(contexto, 500, 300, 15, 'black', 'v8');
    var v9 = new Vertice(contexto, 500, 200, 15, 'black', 'v9');
    var v10 = new Vertice(contexto, 425, 125, 15, 'black', 'v10');



    v1.vizinhos(v2, random());
    v1.vizinhos(v4, random());
    v1.vizinhos(v5, random());
    v1.vizinhos(v6, random());
    v1.vizinhos(v8, random());
    v1.vizinhos(v10, random());

    v2.vizinhos(v4, random());
    v2.vizinhos(v6, random());

    v3.vizinhos(v6, random());
    v3.vizinhos(v10, random());

    v4.vizinhos(v8, random());
    v4.vizinhos(v10, random());

    v5.vizinhos(v6, random());
    v5.vizinhos(v8, random());
    v5.vizinhos(v9, random());

    v6.vizinhos(v9, random());

    v7.vizinhos(v8, random());
    v7.vizinhos(v10, random());

    v9.vizinhos(v10, random());

}

function random() {
    num = Math.random() * 100;
    return Math.floor(num);
}

function Vertice(ctx, x, y, w, cor, t) {
    this.vizinhos = function (v, val) {
        new Aresta(this.ctx, this, v, val);
    }

    this.ctx = ctx;
    this.ctx.beginPath();
    this.x = x;
    this.y = y;
    this.w = w;
    this.t = t;
    this.ctx.arc(this.x, this.y, this.w, 0, Math.PI * 2);

    if (cor) {
        this.ctx.fillStyle = cor;
        this.ctx.fill();
    }

    new RotuloVertice(this.ctx, this, this.t)
    this.ctx.closePath();
}

function Aresta(ctx, v1, v2, t) {
    this.ctx = ctx;
    this.ctx.beginPath();
    this.v1 = v1;
    this.v2 = v2;
    this.t = t;
    this.ctx.globalCompositeOperation = 'destination-over';
    this.ctx.moveTo(this.v1.x, this.v1.y);
    this.ctx.lineTo(
        this.v2.x,
        this.v2.y
    ); 
    this.ctx.stroke();
    new RotuloAresta(this.ctx, this, this.t);
    this.ctx.closePath();
}

function RotuloVertice(ctx, v, t) {
    this.ctx = ctx;
    this.ctx.beginPath();
    this.v = v;
    this.t = t;
    this.x = (this.v.x - t.length * 2.5);
    this.y = this.v.y + this.v.w + 20;
    this.ctx.fillStyle = 'blue';
    this.ctx.font = '20px Arial';
    this.ctx.fillText(this.t, this.x, this.y);
    this.ctx.closePath();
}

function RotuloAresta(ctx, a, t) {
    this.ctx = ctx;
    this.ctx.beginPath();
    this.a = a;
    var maxX = Math.max(this.a.v1.x, this.a.v2.x);
    var minX = Math.min(this.a.v1.x, this.a.v2.x);
    var maxY = Math.max(this.a.v1.y, this.a.v2.y);
    var minY = Math.min(this.a.v1.y, this.a.v2.y);
    var x = (maxX + minX) / 2;
    var y = (maxY + minY) / 2;
    this.ctx.fillStyle = 'red';
    this.ctx.font = '18px monospace';
    this.ctx.fillText(t, x, y);
    this.ctx.closePath();
}