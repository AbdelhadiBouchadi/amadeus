import { CircleLoader } from 'react-spinners';

function BigLoader() {
  return (
    <div className="w-full py-4 px-2 flex-colo h-screen">
      <CircleLoader color="#2a4f9f" className="size-20" />
    </div>
  );
}

export default BigLoader;
