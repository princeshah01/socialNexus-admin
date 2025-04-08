const Loader = ({ fullScreen = false }) => (
  <div
    className={`flex items-center justify-center ${
      fullScreen ? "h-screen w-full" : ""
    }`}
  >
    <div className="spinner">
      <div className="spinner1"></div>
    </div>
  </div>
);

export default Loader;
