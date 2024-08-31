# Use the official Python image based on Alpine Linux
FROM python:3.12-alpine

# Set environment variables to prevent Python from writing pyc files and buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install dependencies required for running Python and building some packages
RUN apk update && apk add --no-cache \
    build-base \
    libpq \
    postgresql-dev \
    musl-dev \
    gcc \
    python3-dev \
    jpeg-dev \
    zlib-dev \
    libjpeg \
    curl

# Install Poetry
RUN curl -sSL https://install.python-poetry.org | python3 -

# Set the working directory
WORKDIR /app

# Copy the Poetry files
COPY pyproject.toml poetry.lock /app/

# Install dependencies using Poetry
RUN poetry config virtualenvs.create false && poetry install --no-interaction --no-ansi

# Copy the rest of the application code
COPY . /app/

# Collect static files (this assumes you have Django settings configured correctly)
RUN python manage.py collectstatic --noinput

# Expose the port the app runs on
EXPOSE 8000

# Command to run the ASGI application using Uvicorn
CMD ["uvicorn", "backend.asgi:application", "--host", "0.0.0.0", "--port", "8000"]
