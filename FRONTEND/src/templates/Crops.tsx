const crops = [
  {
    name: "Wheat",
    description:
      "Wheat is a grass widely cultivated for its seed, a cereal grain which is a worldwide staple food.",
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    name: "Corn",
    description:
      "Corn, also known as maize, is a cereal grain first domesticated by indigenous peoples in southern Mexico.",
    imageUrl: "https://via.placeholder.com/100",
  },
  {
    name: "Rice",
    description:
      "Rice is the seed of the grass species Oryza sativa or less commonly Oryza glaberrima.",
    imageUrl: "https://via.placeholder.com/100",
  },
  // Add more crops as needed
];

const CropBoxes = () => {
  return (
    <div className="bg-gray-100 py-16 px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800">
          Crop Recommendations
        </h1>
        <p className="text-lg text-gray-600">
          Learn more about the best ways to cultivate.
        </p>
      </div>
      <div className="space-y-8">
        {crops.map((crop) => (
          <div
            key={crop.name}
            className="bg-white shadow-md rounded-lg overflow-hidden flex"
          >
            <img
              className="w-32 h-32 object-cover"
              src={crop.imageUrl}
              alt={crop.name}
            />
            <div className="p-6 flex-1">
              <h3 className="text-2xl font-semibold text-gray-800">
                {crop.name}
              </h3>
              <p className="mt-2 text-gray-600">{crop.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropBoxes;
