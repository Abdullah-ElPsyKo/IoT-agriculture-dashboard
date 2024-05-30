import {
  FaUser,
  FaCode,
  FaFileAlt,
  FaServer,
  FaPaintBrush,
} from "react-icons/fa";

const people = [
  {
    name: "Nelson Neves",
    role: "Project Advisor",
    university: "University of Oxford",
  },
  {
    name: "Abdulla Bagishev",
    role: "Backend Developer",
    university: "AP Hogeschool",
  },
  {
    name: "Bruno Aguiar",
    role: "Documentation",
    university: "Ispgaya",
  },
  {
    name: "George Paschalis",
    role: "Hardware",
    university: "Hellenic Mediterranean University",
  },
  {
    name: "John von Muhlen",
    role: "Web Design",
    university: "InHolland University of Applied Sciences",
  },
  {
    name: "Mabula Thomas",
    role: "Hardware",
    university: "Karume Institute of Science and Technology",
  },
  {
    name: "Seppe Faster",
    role: "Web Design",
    university: "AP Hogeschool",
  },
];

const AboutUs = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div
          className="max-w-2xl"
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <img
            className="h-auto"
            style={{ width: "11rem" }}
            src="/full_logo_w_bg.png"
            alt="TerraByte"
          />
          <div style={{ textAlign: "left", marginTop: "20px" }}>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Meet our team
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Meet the people behind the project. We're a team from all over the
              world who joined up to create something important.
            </p>
          </div>
        </div>

        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => {
            let IconComponent;
            switch (person.role) {
              case "Project Advisor":
                IconComponent = FaUser; // Example icon for Project Advisor
                break;
              case "Backend Developer":
                IconComponent = FaCode; // Example icon for Backend Developer
                break;
              case "Documentation":
                IconComponent = FaFileAlt; // Example icon for Documentation
                break;
              case "Hardware":
                IconComponent = FaServer; // Example icon for Hardware
                break;
              case "Web Design":
                IconComponent = FaPaintBrush; // Example icon for Web Design
                break;
              default:
                IconComponent = FaUser; // Default icon if none matches
            }

            return (
              <li key={person.name}>
                <div className="flex items-center gap-x-6">
                  <IconComponent size="2em" /> {/* Adjust size as needed */}
                  <div>
                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                      {person.name}
                    </h3>
                    <p className="text-sm font-semibold leading-6 text-green-600">
                      {person.role}
                    </p>
                    <p className="text-sm leading-6 text-gray-600">
                      {person.university}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingTop: "100px",
        }}
      >
        <img
          src="/team.jpg"
          alt="team"
          className="h-auto"
          style={{ width: "75%" }}
        />
      </div>
    </div>
  );
};

export default AboutUs;
