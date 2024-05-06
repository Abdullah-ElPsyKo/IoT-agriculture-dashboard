//here were getting al the data and displaying it in a table. the data is already fetched and formatted in json so we can access
//it directly with item.attribute
const ApiTesting = (data: any) => {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>City</th>
            <th>Temperature</th>
            <th>Precipitation</th>
            <th>Soil Moisture</th>
            <th>Winds</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.date}</td>
              <td>{item.city}</td>
              <td>{item.temperature}</td>
              <td>{item.precipitation}</td>
              <td>{item.soil_moisture}</td>
              <td>{item.winds}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApiTesting;
