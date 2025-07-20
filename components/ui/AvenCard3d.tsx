import Spline from "@splinetool/react-spline/next";

export default function AvenCard3d() {
  return (
    <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] relative">
      <Spline
        scene="https://prod.spline.design/vRlkb2P6ehrqJeBS/scene.splinecode"
        className="w-full h-full"
      />
    </div>
  );
}
