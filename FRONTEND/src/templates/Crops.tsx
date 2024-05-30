const crops = [
  {
    name: "Maize (Corn)",
    description: `
      Temperature: 18-27°C
      Humidity: 60-70%
      Soil Moisture: 50-60%
      Additional Tips: Maize thrives in fertile, loamy soils and benefits from balanced fertilization and regular irrigation.
    `,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/9432/9432700.png",
  },
  {
    name: "Cassava",
    description: `
      Temperature: 25-29°C
      Humidity: 60-80%
      Soil Moisture: 60-70%
      Additional Tips: Cassava prefers well-drained sandy or loamy soils and can be grown in less fertile soils compared to other crops. Regular weeding is essential for optimal growth.
    `,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/5869/5869158.png",
  },
  {
    name: "Sorghum",
    description: `
      Temperature: 25-30°C
      Humidity: 50-70%
      Soil Moisture: 40-50%
      Additional Tips: Sorghum is drought-resistant and suitable for semi-arid regions. It benefits from minimal irrigation and is often used as a staple in dry areas.
    `,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/14718/14718489.png",
  },
  {
    name: "Millet",
    description: `
      Temperature: 20-30°C
      Humidity: 40-60%
      Soil Moisture: 30-40%
      Additional Tips: Millet is highly adaptable to poor soils and arid conditions. It is a good choice for areas with limited rainfall.
    `,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/13945/13945862.png",
  },
  {
    name: "Groundnuts (Peanuts)",
    description: `
      Temperature: 21-27°C
      Humidity: 50-60%
      Soil Moisture: 50-60%
      Additional Tips: Groundnuts need calcium-rich soils and regular watering during flowering and pod formation stages. Avoid waterlogging to prevent fungal diseases.
    `,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/3944/3944274.png",
  },
  {
    name: "Yams",
    description: `
      Temperature: 25-30°C
      Humidity: 70-80%
      Soil Moisture: 70-80%
      Additional Tips: Yams grow best in deep, fertile, and well-drained soils. Regular mulching helps maintain soil moisture and reduces weed growth.
    `,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/15114/15114874.png",
  },
  {
    name: "Tomatoes",
    description: `
      Temperature: 20-25°C
      Humidity: 60-70%
      Soil Moisture: 60-70%
      Additional Tips: Tomatoes thrive in nutrient-rich soils with good organic content. Regular pruning and staking support plant growth and fruit development.
    `,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/9482/9482665.png",
  },
  {
    name: "Beans (Green Beans)",
    description: `
      Temperature: 18-24°C
      Humidity: 50-70%
      Soil Moisture: 50-60%
      Additional Tips: Beans benefit from crop rotation to prevent soil depletion and pest buildup. Ensure adequate spacing to reduce disease spread and improve airflow.
    `,
    imageUrl: "https://cdn-icons-png.flaticon.com/128/12242/12242638.png",
  },
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
            className="bg-white shadow-md rounded-lg overflow-hidden flex items-center"
          >
            <img
              className="w-24 h-24 sm:w-32 sm:h-32 object-contain"
              src={crop.imageUrl}
              alt={crop.name}
            />
            <div className="p-6 flex-1">
              <h3 className="text-2xl font-semibold text-gray-800">
                {crop.name}
              </h3>
              <p className="mt-2 text-gray-600 whitespace-pre-line">
                {crop.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CropBoxes;
