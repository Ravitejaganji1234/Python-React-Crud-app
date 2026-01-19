FROM python:3.9

WORKDIR /app

# Upgrade pip first
RUN pip install flask_cors pymysql flask
# Install requirements

COPY . .

EXPOSE 5000

CMD ["python", "app.py","--","--host","0.0.0.0"]
