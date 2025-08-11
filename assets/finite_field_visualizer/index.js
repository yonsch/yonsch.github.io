    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    const fieldSelector = document.getElementById('fieldSize');
    const a11 = document.getElementById('a11');
    const a12 = document.getElementById('a12');
    const a21 = document.getElementById('a21');
    const a22 = document.getElementById('a22');
    const showEigenspaces = document.getElementById('showEigenspaces');
    const showTransformation = document.getElementById('showTransformation');
    const eigenInfo = document.getElementById('eigenInfo');

    function mod(n, p) {
      return ((n % p) + p) % p;
    }
    function getRandomDarkHSLColor() {
    const h = Math.floor(Math.random() * 361); // Hue: 0-360
    const s = Math.floor(Math.random() * 101); // Saturation: 0-100%

    const l = Math.floor(Math.random() * (50 - 20 + 1)) + 20; // Lightness: 20-50%

    return `hsl(${h}, ${s}%, ${l}%)`;
}

    function getEigenvalues(mat, p) {
      // For simplification:
      //
      // mat = (a b)
      //       (c d)
      const a = mat[0][0];
      const b = mat[0][1];
      const c = mat[1][0];
      const d = mat[1][1];

      const eigenvalues = [];

      for (let lambda = 0; lambda < p; lambda++) {
        // Check if the characteristic polynomial is zeroed by lambda
        if (mod(lambda * lambda - (a + d) * lambda + a*d - b*c, p) == 0) {
          eigenvalues.push(lambda);
        }
      }
      return eigenvalues;
    }

    function drawArrow(fromX, fromY, toX, toY) {
      const headLength = 8;
      const dx = toX - fromX;
      const dy = toY - fromY;
      const angle = Math.atan2(dy, dx);
      const color = getRandomDarkHSLColor();

      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(toX, toY);
      ctx.lineTo(toX - headLength * Math.cos(angle - Math.PI / 6), toY - headLength * Math.sin(angle - Math.PI / 6));
      ctx.lineTo(toX - headLength * Math.cos(angle + Math.PI / 6), toY - headLength * Math.sin(angle + Math.PI / 6));
      ctx.lineTo(toX, toY);
      ctx.fillStyle = color;
      ctx.fill();
    }
    function drawXSymbol(x, y, size, color) {
      ctx.beginPath();
      ctx.moveTo(x - size / 2, y - size / 2);
      ctx.lineTo(x + size / 2, y + size / 2);
      ctx.moveTo(x + size / 2, y - size / 2);
      ctx.lineTo(x - size / 2, y + size / 2);
      ctx.strokeStyle = color;
      ctx.stroke();
    }

    function drawCircle(x, y, radius, color) {
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }

    class Vector {
      constructor(x, y) {
        this.x = x;
        this.y = y;
      }

      equals(otherVector) {
        if (!(otherVector instanceof Vector)) {
            return false;
        }
        return this.x === otherVector.x && this.y === otherVector.y;
    }

    isInSet(set) {
    for (const vectorInSet of set) {
        if (vectorInSet.equals(this)) {
            return true;
        }
    }
    return false;
}
    }

    function getDrawX(x, padding, spacing) {
      return padding + x * spacing;
    }

    function getDrawY(y, padding, spacing, p) {
      return padding + (p - 1 - y) * spacing;
    }

    function drawVector(x, y, kernel, imageSet, eigenspaces, padding, spacing, p, mat) {
          const drawX = getDrawX(x, padding, spacing);
          const drawY = getDrawY(y, padding, spacing, p);

          const newX = mod(mat[0][0] * x + mat[0][1] * y, p);
          const newY = mod(mat[1][0] * x + mat[1][1] * y, p);

          const imageX = padding + newX * spacing;
          const imageY = padding + (p - 1 - newY) * spacing;

          if (newX === 0 && newY === 0) {
            kernel.push([x, y]);
          }

          let drawn = false;

          if (showEigenspaces.checked) {
            for (const [lambda, vectors] of eigenspaces.entries()) {
              if (vectors.some(v => v[0] === x && v[1] === y)) {
                ctx.beginPath();
                ctx.arc(drawX, drawY, 10, 0, Math.PI * 2);
                ctx.fillStyle = `hsl(${lambda * 360 / p}, 100%, 60%)`;
                ctx.fill();
                drawn = true;
                break;
              }
            }
          }
            v = new Vector(x, y);

          color = 'black';
         if (v.isInSet(imageSet)) {
              color = 'red';
          }
          if (newX === 0 && newY === 0) {
            drawXSymbol(drawX, drawY, 10, color);
          } else {
              drawCircle(drawX, drawY, 5, color)
          }

          if (showTransformation.checked) {
            if (x !== newX || y !== newY) {
              drawArrow(drawX, drawY, imageX, imageY);
            }
          } 
    }

    function getImage(p, mat) {
      const imageSet = new Set();
      for (let x = 0; x < p; x++) {
        for (let y = 0; y < p; y++) {
          const newX = mod(mat[0][0] * x + mat[0][1] * y, p);
          const newY = mod(mat[1][0] * x + mat[1][1] * y, p);
          imageSet.add(new Vector(newX, newY));
        }
      }
      return imageSet;
    }

    function drawVectorSpace(p) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      eigenInfo.innerHTML = '';

      const padding = 40;
      const size = canvas.width - 2 * padding;
      const spacing = size / (p - 1);

      const mat = [
        [mod(parseInt(a11.value), p), mod(parseInt(a12.value), p)],
        [mod(parseInt(a21.value), p), mod(parseInt(a22.value), p)]
      ];

      const kernel = [];
      const imageSet = getImage(p, mat);
      const eigenspaces = new Map();


      const eigenvalues = getEigenvalues(mat, p);
      for (const lambda of eigenvalues) {
        eigenspaces.set(lambda, []);
        for (let x = 0; x < p; x++) {
          for (let y = 0; y < p; y++) {
            if (x === 0 && y === 0) continue;
              const tx = mod(mat[0][0] * x + mat[0][1] * y, p);
              const ty = mod(mat[1][0] * x + mat[1][1] * y, p);
              const lx = mod(lambda * x, p);
              const ly = mod(lambda * y, p);
              if (tx === lx && ty === ly) {
                eigenspaces.get(lambda).push([x, y]);
              }
          }
        }
      }


      for (let x = 0; x < p; x++) {
        for (let y = 0; y < p; y++) {
          drawVector(x, y, kernel, imageSet, eigenspaces, padding, spacing, p, mat);
        }
      }

      eigenInfo.innerHTML = '<strong>Eigenvalues:</strong><br/>';
      eigenspaces.forEach((vectors, lambda) => {
        if (vectors.length > 0) {
          const basis = vectors.map(v => `[${v[0]}, ${v[1]}]`).join(', ');
          eigenInfo.innerHTML += `Eigenvalue ${lambda}: <span style="display: inline-block; background-color: hsl(${lambda * 360 / p}, 100%, 60%); height: 15px; width: 15px"></span><br/>`;
        }
      });
      const det = mod(mat[0][0] * mat[1][1] - mat[0][1] * mat[1][0], p);
      eigenInfo.innerHTML += 'Determinant: ' + det;
    }

    function update() {
      const p = parseInt(fieldSelector.value);
      drawVectorSpace(p);

    }

    fieldSelector.addEventListener('change', update);
    [a11, a12, a21, a22, showEigenspaces, showTransformation].forEach(input => input.addEventListener('input', update));

    update();