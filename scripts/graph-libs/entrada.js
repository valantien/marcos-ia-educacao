// Junta three.js e 3d-force-graph num arquivo só (site/vendor/graph-libs.js), sem módulos,
// para o site abrir com dois cliques. Receita em site/vendor/README.md.
import * as THREE from 'three';
import ForceGraph3D from '3d-force-graph';
import { LineSegments2 } from 'three/examples/jsm/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
window.THREE = THREE;
window.ForceGraph3D = ForceGraph3D;
window.THREE_LINES = { LineSegments2, LineSegmentsGeometry, LineMaterial };
