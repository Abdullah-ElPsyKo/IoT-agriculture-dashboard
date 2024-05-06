## Data collection
1. Rainfall Data: Rainfall is a primary source of water for crops in rain-fed agriculture, which is prevalent in many parts of Africa. Understanding rainfall patterns helps in planning planting dates to coincide with the onset of the rainy season and in managing water resources more effectively.

2. Temperature: Temperature affects the growth rate of crops and determines the growing season. Certain crops require specific temperature ranges for germination and development. Knowing the temperature patterns enables the selection of suitable crops and the timing of planting to ensure that the crops can complete their growth cycle within the favorable temperature range.

3. Soil Moisture: Soil moisture directly influences the availability of water to crops. It affects seed germination, root development, and overall plant health. Monitoring soil moisture helps in making informed irrigation decisions to prevent both water stress and waterlogging, which can harm the crops.

4. wind speed


## Data Transmission
MQTT or HTTP Protocols: For sending data from your devices to the cloud, lightweight communication protocols like MQTT (ideal for low-bandwidth, unreliable networks) or HTTP (for more straightforward data transmission) can be used. These protocols can work well over cellular connections using GPRS/3G/4G.


## Data storage
MongoDB or PostgreSQL (to be decided)


## User interface/Backend/API
Frameworks: Angular
backend: Flask/Django


## Data processing
Python


## hardware??
Cloud or Raspberry pi?


## data accessible
We should be able to see:
- environmental Data: previously mentioned data and maybe more
- trends: graphs, charts, data over days, weeks, months, or even years to help identify patterns or anomalies.
- Predictive Insights and Recommendations
    - Optimal Planting Times: Predictions on the best upcoming days for planting, based on historical and current data trends.
    - Irrigation Advice: Recommendations for when and how much to water crops, tailored to the current soil moisture levels and weather forecasts.


## example of data we might receive
Given the 160-character limit of a standard SMS, here's an example of how you can format your data:
```Date: 2023-01-01, City: Nairobi, Temp: 24.5C, Prec: 0mm, SoilMoist: 22.3%, winds```
