export default function interpolateRgb(xyz0, xyz1, f) {
  return [
    xyz0[0] + f * (xyz1[0] - xyz0[0]),
    xyz0[1] + f * (xyz1[1] - xyz0[1]),
    xyz0[2] + f * (xyz1[2] - xyz0[2])
  ];
}
