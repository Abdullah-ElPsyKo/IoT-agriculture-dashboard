# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set the working directory in the container
WORKDIR /app

# Install netcat, specifying the exact package name
RUN apt-get update && \
    apt-get install -y netcat-openbsd && \
    rm -rf /var/lib/apt/lists/*

# Copy the current directory contents into the container at /app
COPY . /app

ENV PYTHONDONTWRITEBYTECODE 1

# Install any needed packages specified in requirements.txt
RUN pip install --trusted-host pypi.python.org -r requirements.txt

# Make port 5000 available to the world outside this container
EXPOSE 5000

# Create entrypoint script directly in the image and make it executable
RUN echo '#!/bin/bash\n\
echo "Waiting for postgres..."\n\
while ! nc -z db 5432; do\n\
  sleep 0.1\n\
done\n\
echo "PostgreSQL started"\n\
flask db upgrade\n\
exec "$@"' > /entrypoint.sh && chmod +x /entrypoint.sh

# Define environment variable
ENV NAME World

# Set the entrypoint to execute the migrations and then run the application
ENTRYPOINT ["/entrypoint.sh"]
CMD ["flask", "run", "--host=0.0.0.0"]
