/**
 * Túnel de vestuarios al campo, en 3D plano: colores de la marca sin luces ni sombras, la niebla da
 * la profundidad. Solo se carga (con three.js) cuando el componente Tunel decide animar. No tiene
 * bucle propio: dibuja un fotograma cuando se le pide (al hacer scroll o cambiar de tamaño).
 */
import {
  BoxGeometry,
  CanvasTexture,
  Color,
  Fog,
  Group,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  Vector3,
  WebGLRenderer,
} from 'three';

const C = {
  azul: '#1863b8',
  azulHondo: '#0f4f99',
  amarillo: '#ffed00',
  amarilloClaro: '#fff7a6',
  marino: '#0c0433',
  suelo: '#160c4a',
  techo: '#07021f',
  costilla: '#1e1463',
  blanco: '#ffffff',
};

// Medidas en metros, más o menos
const TUNEL = { ancho: 4.6, alto: 3.2, largo: 26 };
const CAMPO = { largo: 100, ancho: 64, z: -TUNEL.largo - 3 - 32 };

const mat = (color: string, niebla = true) => new MeshBasicMaterial({ color, fog: niebla });

function caja(an: number, al: number, fo: number, color: string, x: number, y: number, z: number, niebla = true) {
  const m = new Mesh(new BoxGeometry(an, al, fo), mat(color, niebla));
  m.position.set(x, y, z);
  return m;
}

function tunel() {
  const g = new Group();
  const { ancho: an, alto: al, largo: l } = TUNEL;
  const zc = -l / 2;
  const suelo = new Mesh(new PlaneGeometry(an, l), mat(C.suelo));
  suelo.rotation.x = -Math.PI / 2;
  suelo.position.set(0, 0, zc);
  const techo = new Mesh(new PlaneGeometry(an, l), mat(C.techo));
  techo.rotation.x = Math.PI / 2;
  techo.position.set(0, al, zc);
  g.add(suelo, techo);
  for (const lado of [-1, 1]) {
    const pared = new Mesh(new PlaneGeometry(l, al), mat(C.marino));
    pared.rotation.y = (-lado * Math.PI) / 2;
    pared.position.set((lado * an) / 2, al / 2, zc);
    // Franja azul a media altura, como un friso
    g.add(pared, caja(0.02, 0.5, l, C.azul, lado * (an / 2 - 0.02), 1.15, zc));
  }
  // Costillas cada 3 m y focos en el techo: dan la sensación de avance
  for (let z = -1.5; z > -l; z -= 3) {
    g.add(
      caja(0.18, al, 0.25, C.costilla, -an / 2 + 0.09, al / 2, z),
      caja(0.18, al, 0.25, C.costilla, an / 2 - 0.09, al / 2, z),
      caja(an, 0.18, 0.25, C.costilla, 0, al - 0.09, z),
      caja(1.6, 0.04, 0.5, C.amarilloClaro, 0, al - 0.02, z - 1.5),
    );
  }
  return g;
}

/** Líneas del campo (y franjas de corte) en una textura: nítida y barata */
function texturaCampo(anisotropia: number) {
  const px = 20; // píxeles por metro
  const lienzo = document.createElement('canvas');
  lienzo.width = CAMPO.largo * px;
  lienzo.height = CAMPO.ancho * px;
  const c = lienzo.getContext('2d')!;
  const m = (v: number) => v * px;
  // Franjas de corte solo dentro de las líneas; fuera, el color de la explanada
  c.fillStyle = C.azulHondo;
  c.fillRect(0, 0, lienzo.width, lienzo.height);
  const franjas = 12;
  const dentro = lienzo.width - 2 * m(1);
  for (let i = 0; i < franjas; i++) {
    c.fillStyle = i % 2 ? C.azulHondo : C.azul;
    c.fillRect(m(1) + (i * dentro) / franjas, m(1), dentro / franjas + 1, lienzo.height - 2 * m(1));
  }
  c.strokeStyle = C.blanco;
  c.lineWidth = m(0.14);
  const W = lienzo.width;
  const H = lienzo.height;
  const borde = m(1);
  c.strokeRect(borde, borde, W - 2 * borde, H - 2 * borde);
  c.beginPath();
  c.moveTo(W / 2, borde);
  c.lineTo(W / 2, H - borde);
  c.stroke();
  c.beginPath();
  c.arc(W / 2, H / 2, m(9.15), 0, Math.PI * 2);
  c.stroke();
  for (const lado of [0, 1]) {
    const x = lado ? W - borde : borde;
    const dir = lado ? -1 : 1;
    c.strokeRect(Math.min(x, x + dir * m(16.5)), H / 2 - m(20.16), m(16.5), m(40.32));
    c.strokeRect(Math.min(x, x + dir * m(5.5)), H / 2 - m(9.16), m(5.5), m(18.32));
    c.beginPath();
    c.arc(x + dir * m(11), H / 2, m(9.15), lado ? Math.PI - 0.93 : -0.93, lado ? Math.PI + 0.93 : 0.93, false);
    c.stroke();
  }
  c.fillStyle = C.blanco;
  for (const [x, y] of [[W / 2, H / 2], [borde + m(11), H / 2], [W - borde - m(11), H / 2]]) {
    c.beginPath();
    c.arc(x, y, m(0.3), 0, Math.PI * 2);
    c.fill();
  }
  const t = new CanvasTexture(lienzo);
  t.colorSpace = SRGBColorSpace;
  t.anisotropy = anisotropia;
  return t;
}

/** Pancarta de la grada: «XBUYER CUP» repetido en marino sobre amarillo */
function texturaPancarta(texto: string) {
  const lienzo = document.createElement('canvas');
  lienzo.width = 2048;
  lienzo.height = 64;
  const c = lienzo.getContext('2d')!;
  c.fillStyle = C.amarillo;
  c.fillRect(0, 0, lienzo.width, lienzo.height);
  c.fillStyle = C.marino;
  c.font = '700 46px "Barlow Condensed", "Arial Narrow", sans-serif';
  c.textBaseline = 'middle';
  const paso = c.measureText(texto).width + 60;
  for (let x = 20; x < lienzo.width; x += paso) c.fillText(texto, x, 34);
  const t = new CanvasTexture(lienzo);
  t.colorSpace = SRGBColorSpace;
  return t;
}

function estadio(anisotropia: number, pancarta: string) {
  const g = new Group();
  // Fuera del túnel no hay niebla: la salida se ve llena de luz
  const campo = new Mesh(new PlaneGeometry(CAMPO.largo, CAMPO.ancho), new MeshBasicMaterial({ map: texturaCampo(anisotropia), fog: false }));
  campo.rotation.x = -Math.PI / 2;
  campo.position.set(0, 0, CAMPO.z);
  // Explanada alrededor del campo y boca del túnel en la grada de este lado
  const explanada = new Mesh(new PlaneGeometry(CAMPO.largo + 40, CAMPO.ancho + 40), mat(C.azulHondo, false));
  explanada.rotation.x = -Math.PI / 2;
  explanada.position.set(0, -0.01, CAMPO.z);
  g.add(explanada, campo);

  // Gradas: tres escalones en el fondo y en los laterales
  const fondo = CAMPO.z - CAMPO.ancho / 2 - 6;
  for (let i = 0; i < 3; i++) {
    g.add(caja(CAMPO.largo + 30, 3 + i * 3, 4, i % 2 ? C.costilla : C.marino, 0, (3 + i * 3) / 2, fondo - i * 4, false));
    for (const lado of [-1, 1]) {
      g.add(caja(4, 3 + i * 3, CAMPO.ancho + 12, i % 2 ? C.costilla : C.marino, lado * (CAMPO.largo / 2 + 9 + i * 4), (3 + i * 3) / 2, CAMPO.z, false));
    }
  }
  const banda = new Mesh(new PlaneGeometry(CAMPO.largo + 30, 1.4), new MeshBasicMaterial({ map: texturaPancarta(pancarta), fog: false }));
  banda.position.set(0, 1.5, fondo + 2.01);
  g.add(banda);

  // Muro de este lado, con la boca del túnel
  const zm = -TUNEL.largo;
  const { ancho: an, alto: al } = TUNEL;
  g.add(
    caja((CAMPO.largo + 30 - an) / 2, 9, 1, C.marino, -(an / 2 + (CAMPO.largo + 30 - an) / 4), 4.5, zm + 0.5, false),
    caja((CAMPO.largo + 30 - an) / 2, 9, 1, C.marino, an / 2 + (CAMPO.largo + 30 - an) / 4, 4.5, zm + 0.5, false),
    caja(an, 9 - al, 1, C.marino, 0, al + (9 - al) / 2, zm + 0.5, false),
  );
  return g;
}

// Interpolaciones
const clamp = (v: number) => Math.min(1, Math.max(0, v));
const tramo = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const suave = (t: number) => t * t * (3 - 2 * t);
const mezcla = (a: number, b: number, t: number) => a + (b - a) * t;

export interface Escena {
  /** Dibuja el fotograma del avance p (0 al entrar al túnel, 1 sobre el campo) */
  dibujar(p: number): void;
  medir(ancho: number, alto: number): void;
  destruir(): void;
}

export function crearEscena(lienzo: HTMLCanvasElement, opciones: { pancarta: string }): Escena {
  const render = new WebGLRenderer({ canvas: lienzo, antialias: true, powerPreference: 'high-performance' });
  render.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const escena = new Scene();
  escena.background = new Color(C.amarillo);
  const niebla = new Fog(C.marino, 3, 24);
  escena.fog = niebla;
  escena.add(tunel(), estadio(Math.min(8, render.capabilities.getMaxAnisotropy()), opciones.pancarta));

  const camara = new PerspectiveCamera(55, 1, 0.1, 400);
  const mira = new Vector3();

  return {
    medir(ancho, alto) {
      render.setSize(ancho, alto, false);
      camara.aspect = ancho / alto;
      // En vertical se abre el ángulo para que el campo quepa al salir
      camara.fov = camara.aspect < 1 ? 72 : 55;
      camara.updateProjectionMatrix();
    },
    dibujar(p) {
      // 0–0,6: recorrido del túnel. Luego sale a ras de suelo y, ya fuera, sube sobre el campo
      // (si subiera antes, atravesaría el muro que hay encima de la boca)
      const dentro = suave(tramo(p, 0, 0.6));
      const salida = suave(tramo(p, 0.55, 0.75));
      const subida = suave(tramo(p, 0.62, 1));
      const z = mezcla(-0.5, -TUNEL.largo + 1, dentro) + mezcla(0, -5, salida);
      const y = mezcla(1.6, 17, subida);
      camara.position.set(0, y, z);
      mira.set(0, mezcla(1.5, 0, subida), mezcla(z - 20, CAMPO.z + 4, subida));
      camara.lookAt(mira);
      // La niebla se abre al acercarse a la salida
      niebla.far = mezcla(24, 60, tramo(p, 0.4, 0.65));
      render.render(escena, camara);
    },
    destruir() {
      escena.traverse((o) => {
        if (o instanceof Mesh) {
          o.geometry.dispose();
          const m = o.material as MeshBasicMaterial;
          m.map?.dispose();
          m.dispose();
        }
      });
      render.dispose();
    },
  };
}
