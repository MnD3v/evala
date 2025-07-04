"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
// import { ShaderMaterial } from "three";

const fragmentShader = `
  uniform float uTime;
  uniform vec3 color1;
  uniform vec3 color2;
  uniform vec3 color3;
  uniform float uSpeed;
  uniform float uStrength;
  uniform float uDensity;
  uniform float uBrightness;
  uniform float uGrain;
  
  varying vec2 vUv;
  
  //	Classic Perlin 3D Noise 
  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
  vec3 fade(vec3 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}
  
  float noise(vec3 P){
    vec3 Pi0 = floor(P);
    vec3 Pi1 = Pi0 + vec3(1.0);
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P);
    vec3 Pf1 = Pf0 - vec3(1.0);
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
    return 2.2 * n_xyz;
  }

  float random(vec2 co) {
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
  }

  void main() {
    // Création d'un mouvement plus dynamique
    float time = uTime * uSpeed;
    
    // Création de plusieurs couches de mouvement
    vec2 baseUv = vUv;
    
    // Première couche : rotation lente
    float angle1 = time * 0.1;
    vec2 rotatedUv1 = vec2(
      cos(angle1) * baseUv.x - sin(angle1) * baseUv.y,
      sin(angle1) * baseUv.x + cos(angle1) * baseUv.y
    );
    
    // Deuxième couche : mouvement ondulatoire
    vec2 rotatedUv2 = baseUv + vec2(
      sin(baseUv.y * 5.0 + time) * 0.1,
      cos(baseUv.x * 5.0 + time) * 0.1
    );
    
    // Troisième couche : turbulence
    float turbulence = noise(vec3(rotatedUv2 * uDensity, time * 0.2));
    
    // Combiner les mouvements
    vec2 finalUv = mix(rotatedUv1, rotatedUv2, turbulence);
    
    // Génération de plusieurs couches de bruit
    float n1 = noise(vec3(finalUv * uDensity, time));
    float n2 = noise(vec3(finalUv * uDensity * 0.8, time * 1.2));
    float n3 = noise(vec3(finalUv * uDensity * 1.2, time * 0.8));
    
    // Mélange dynamique des couleurs
    vec3 color = mix(color1, color2, n1 * uStrength);
    color = mix(color, color3, n2 * uStrength);
    
    // Ajout d'un effet de pulsation
    float pulse = sin(time * 0.5) * 0.5 + 0.5;
    color *= uBrightness * (0.8 + pulse * 0.4);
    
    // Ajout d'une variation de luminosité basée sur la position
    float vignette = length(vUv - 0.5) * 2.0;
    color *= 1.0 - vignette * 0.5;
    
    // Ajout de grain dynamique
    float grain = random(finalUv + time) * uGrain;
    color = mix(color, vec3(grain), 0.05);
    
    gl_FragColor = vec4(color, 1.0);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

function GradientPlane() {
  const materialRef = useRef();
  
  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  const uniforms = {
    uTime: { value: 0 },
    color1: { value: [0.05, 0.05, 0.05] },    // Noir profond
    color2: { value: [0.8, 0.0, 0.0] },       // Rouge vif
    color3: { value: [0.3, 0.0, 0.0] },       // Rouge sombre
    uSpeed: { value: 0.5 },                    // Vitesse augmentée
    uStrength: { value: 2.0 },                 // Force de mélange augmentée
    uDensity: { value: 2.0 },                 // Densité augmentée
    uBrightness: { value: 1.2 },              // Luminosité
    uGrain: { value: 0.15 },                  // Grain
  };

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}

export default function GradientBackground() {
  return (
    <div className="fixed inset-0 w-screen h-screen -z-10">
      <Canvas>
        <GradientPlane />
      </Canvas>
    </div>
  );
} 