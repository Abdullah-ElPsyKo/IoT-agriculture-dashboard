const people = [
  {
    name: "Nelson Neves",
    role: "Project Advisor",
    imageUrl:
      "https://images.unsplash.com/photo-1517843569279-7f6c3ff7785d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    university: "University of Oxford",
  },
  {
    name: "Abdulla Bagishev",
    role: "Backend Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    university: "AP Hogeschool",
  },
  {
    name: "Bruno Aguiar",
    role: "Documentation",
    imageUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    university: "Ispgaya",
  },
  {
    name: "George Paschalis",
    role: "Hardware",
    imageUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    university: "Hellenic Mediterranean University",
  },
  {
    name: "John von Muhlen",
    role: "Web Design",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    university: "InHolland University of Applied Sciences",
  },
  {
    name: "Mabula Thomas",
    role: "Hardware",
    imageUrl:
      "https://images.unsplash.com/photo-1517423440428-a5a00ad493e8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    university: "Karume Institute of Science and Technology",
  },
  {
    name: "Seppe Faster",
    role: "Web Design",
    imageUrl:
      "https://images.unsplash.com/photo-1517843569279-7f6c3ff7785d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
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
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  className="h-16 w-16 rounded-full"
                  src={person.imageUrl}
                  alt=""
                />
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
          ))}
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
