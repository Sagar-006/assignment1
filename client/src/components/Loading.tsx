import { FadeLoader } from "react-spinners";
const Loading = () => {
  return (
    <div className="flex justify-center items-center text-3xl h-[100vh]">
      <FadeLoader />
    </div>
  );
};

export default Loading;
