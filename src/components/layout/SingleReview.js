function SingleReview(props) {
  return (
    <div className="py-4">
      <div className="bg-white  px-16 py-2  transition duration-500">
        <div className="flex justify-between items-center">
          <div className=" flex items-center space-x-4 ">
            <div className="">
              <img
                className="w-12 h-12 rounded-full"
                src="https://i.pinimg.com/736x/7c/ee/6f/7cee6fa507169843e3430a90dd5377d4.jpg"
                alt=""
              />
            </div>
            <div className="text-xl font-semibold">{props.title}</div>
          </div>

          <div>
            <div className="text-sm font-semibold">{"@" + props.username}</div>
          </div>
        </div>
        <div className="mt-4">
          <p className="mt-4 text-md text-gray-600">{props.content}</p>
          <hr />
        </div>
      </div>
      {/* <hr /> */}
    </div>
  );
}

export default SingleReview;
