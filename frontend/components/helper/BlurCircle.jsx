const BlurCircle = ({
    className = "",
    height = "h-[350px]",
    position= "absolute",
    width = "w-[350px]",
    top = "top-0",
    left = "left-0",
    color = "bg-[#6076A1]",
    opacity = "opacity-50",
  }) => (
    <div
      className={`${position} rounded-full blur-3xl -z-50 ${height} ${width} ${top} ${left} ${color} ${opacity} ${className}`}
    />
  );
  
  export default BlurCircle;
  