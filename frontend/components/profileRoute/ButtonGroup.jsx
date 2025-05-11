

const ButtonGroup = () => {
  return (
    <div className="flex justify-end gap-4 my-4 lg:my-8  flex-wrap">
      <button className="bg-purple-600 hover:bg-purple-700 transition px-4 py-2 rounded-xl text-sm font-semibold">
        RENEW PACK
      </button>
      <button className="bg-pink-600 hover:bg-pink-700 transition px-4 py-2 rounded-xl text-sm font-semibold">
        CHANGE PACK
      </button>
      <button className="bg-gradient-to-r from-pink-600 to-purple-600 hover:opacity-90 transition px-4 py-2 rounded-xl text-sm font-semibold">
        LOG OUT
      </button>
    </div>
  );
};

export default ButtonGroup;
