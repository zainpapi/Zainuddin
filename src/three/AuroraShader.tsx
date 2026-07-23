"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * A large background plane that renders a slow, flowing aurora via a
 * custom fragment shader. Layered domain-warped noise tinted indigo →
 * violet → teal. Always stays behind the glass objects.
 *
 * `intensity` (0..1) lets the contact section crank up the finale.
 */
const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform float uIntensity;
  uniform vec2  uResolution;

  // --- classic 2D simplex noise (Ashima) ---
  vec3 mod289(vec3 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec2 mod289(vec2 x){ return x - floor(x * (1.0/289.0)) * 289.0; }
  vec3 permute(vec3 x){ return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187,0.366025403784439,
                       -0.577350269189626,0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0,0.0) : vec2(0.0,1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
                    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m; m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // domain-warped fractal noise for smoother flow
  float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for(int i = 0; i < 5; i++){
      v += a * snoise(p);
      p *= 2.02;
      a *= 0.5;
    }
    return v;
  }

  void main(){
    vec2 uv = vUv;
    // correct aspect so the flow doesn't stretch
    float aspect = uResolution.x / uResolution.y;
    vec2 p = vec2(uv.x * aspect, uv.y);

    float t = uTime * 0.04;

    // domain warping — two layers
    vec2 q = vec2(fbm(p * 1.2 + t), fbm(p * 1.2 - t + 5.2));
    vec2 r = vec2(
      fbm(p * 1.1 + q * 1.8 + vec2(1.7, 9.2) + t),
      fbm(p * 1.1 + q * 1.8 + vec2(8.3, 2.8) - t)
    );
    float n = fbm(p + r * 1.5);
    n = smoothstep(-0.35, 0.6, n);

    // aurora palette: indigo -> violet -> teal
    vec3 cIndigo = vec3(0.388, 0.404, 0.945);
    vec3 cViolet = vec3(0.545, 0.361, 0.965);
    vec3 cTeal   = vec3(0.133, 0.827, 0.933);

    vec3 col = mix(cIndigo, cViolet, n);
    col = mix(col, cTeal, smoothstep(0.4, 0.85, r.x * 0.5 + 0.5));

    // soft vertical gradient toward darker edges (vignette of color)
    float vg = smoothstep(0.0, 0.55, uv.y) * smoothstep(1.0, 0.45, uv.y);
    col *= 0.55 + vg * 0.6;

    // base alpha low so the page bg + glass still read through
    float alpha = (0.35 + n * 0.5) * (0.55 + uIntensity * 0.5);

    gl_FragColor = vec4(col, alpha);
  }
`;

type AuroraShaderProps = {
  intensity?: number;
};

export function AuroraShader({ intensity = 0 }: AuroraShaderProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const { size } = useFrameStore();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uIntensity: { value: intensity },
      uResolution: { value: new THREE.Vector2(1, 1) },
    }),
    [intensity],
  );

  useFrame((_, delta) => {
    if (!matRef.current) return;
    matRef.current.uniforms.uTime.value += delta;
    // smooth intensity changes
    const cur = matRef.current.uniforms.uIntensity
      .value as number;
    matRef.current.uniforms.uIntensity.value =
      cur + (intensity - cur) * Math.min(1, delta * 2);
    matRef.current.uniforms.uResolution.value.set(size.width, size.height);
  });

  return (
    <mesh position={[0, 0, -8]} scale={[40, 24, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// tiny helper to read viewport size inside the shader component
import { useThree } from "@react-three/fiber";
function useFrameStore() {
  const size = useThree((s) => s.size);
  return { size };
}
