FROM python:3.11-slim

ENV PORT 8000

COPY ./app /app
WORKDIR /app

COPY ./requirements.txt ./requirements.txt
RUN pip install -r requirements.txt

EXPOSE $PORT
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
