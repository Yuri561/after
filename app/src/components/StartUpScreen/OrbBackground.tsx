import Orb from "../ogl/orb";

const OrbBackground = () => (
  <>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,255,255,0.10),transparent_45%),radial-gradient(circle_at_70%_70%,rgba(0,255,255,0.06),transparent_40%)] pointer-events-none" />
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="w-[1200px] h-[1200px] sm:w-[950px] sm:h-[950px] opacity-50">
        <Orb hoverIntensity={0.45} rotateOnHover hue={180} forceHoverState={false} />
      </div>
    </div>
  </>
);

export default OrbBackground;
