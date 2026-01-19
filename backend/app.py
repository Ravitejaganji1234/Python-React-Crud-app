from flask import Flask, jsonify, request
from flask_cors import CORS
from config import get_connection

app = Flask(__name__)
CORS(app)

@app.route("/users", methods=["GET"])
def get_users():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(users)

@app.route("/users", methods=["POST"])
def add_user():
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO users (name, email) VALUES (%s, %s)",
        (data["name"], data["email"])
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "User added successfully!"})

@app.route("/users/<int:id>", methods=["PUT"])
def update_user(id):
    data = request.json
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "UPDATE users SET name=%s, email=%s WHERE id=%s",
        (data["name"], data["email"], id)
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "User updated successfully!"})

@app.route("/users/<int:id>", methods=["DELETE"])
def delete_user(id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM users WHERE id=%s", (id,))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "User deleted!"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
