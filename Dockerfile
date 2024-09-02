# Use the official Python image as the base image
FROM python:3.12-slim

# Install curl to fetch Poetry installation script
RUN apt-get update && apt-get install -y curl

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -

# Add Poetry to the PATH
ENV PATH="/root/.local/bin:$PATH"

# Set the working directory inside the container
WORKDIR /app

# Copy the pyproject.toml and poetry.lock files
COPY pyproject.toml poetry.lock ./

# Install dependencies using Poetry
RUN poetry install --no-dev --no-root

# Copy the rest of the application code
COPY . .

# Expose the port on which the app will run
EXPOSE 8000

# Default command to run when starting the container
CMD ["poetry", "run", "uvicorn", "backend.asgi:application", "--host", "0.0.0.0", "--port", "8000"]
