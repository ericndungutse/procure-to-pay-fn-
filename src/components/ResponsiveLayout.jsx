export default function ResponsiveLaout({ maxWidth, children, otherStyles }) {
  return (
    <div
      className={`w-[90%]  ${otherStyles}`}
      style={{
        maxWidth: maxWidth,
      }}
    >
      {children}
    </div>
  );
}
