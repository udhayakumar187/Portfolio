import * as THREE from "three";

export function dampAngle(current: number, target: number, lambda: number, delta: number) {
  const angleDelta = THREE.MathUtils.euclideanModulo(target - current + Math.PI, Math.PI * 2) - Math.PI;
  return current + angleDelta * (1 - Math.exp(-lambda * delta));
}

export function progressVelocity(progressRef: { current: number }, previousRef: { current: number }, delta: number) {
  const progress = progressRef.current;
  const velocity = delta > 0 ? Math.abs(progress - previousRef.current) / delta : 0;
  previousRef.current = progress;
  return velocity;
}
