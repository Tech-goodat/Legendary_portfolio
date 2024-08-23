from flask import Flask, jsonify, request, make_response
from flask_jwt_extended import create_access_token, JWTManager
from flask_restful import Api, Resource
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt
from flask_cors import CORS

from models import db, User

app = Flask(__name__)

# Configuration
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["JWT_SECRET_KEY"] = "mysnowflake"

# Initialize extensions
db.init_app(app)
migrate = Migrate(app, db)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
api = Api(app)
CORS(app)

# Home Resource
class Home(Resource):
    def get(self):
        welcome_message = {"message": "Welcome to your portfolio!!"}
        return make_response(jsonify(welcome_message), 200)

# SignUp Resource
class SignUp(Resource):
    def post(self):
        data = request.get_json()
        first_name = data.get("first_name")
        last_name = data.get("last_name")
        email = data.get("email")
        residence_country = data.get("residence_country")
        city = data.get("city")
        mobile_number = data.get("mobile_number")
        password = data.get("password")

        if not all([first_name, last_name, email, residence_country, city, mobile_number, password]):
            return jsonify({"message": "Missing required fields"}), 400
        
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        access_token = create_access_token(identity=first_name)

        new_user = User(
            first_name=first_name,
            last_name=last_name,
            email=email,
            residence_country=residence_country,
            city=city,
            mobile_number=mobile_number,
            password=hashed_password
        )

        db.session.add(new_user)
        db.session.commit()

        return jsonify({
            "id": new_user.id,
            "first_name": new_user.first_name,
            "access_token": access_token
        })
        
class UserLogIn(Resource):
    def post(self):
        data=request.get_json()
        print (data)
        
        email = data.get("email")
        password = str(data.get("password"))
        
        user = User.query.filter_by(email=email).first()
        
        if user is None:
            return jsonify({"error" : "Unauthorized!"}), 401
        
        if not bcrypt.check_password_hash(user.password, password):
            return jsonify({'error' : 'Unauthorized! Incorrect password'}), 401
        
        access_token = create_access_token(identity=email)
        user.access_token = access_token
        
        return jsonify({
            "id":user.id,
            "email":user.email,
            "access_token":user.access_token,
        })
            

# Add resources to API
api.add_resource(Home, '/')
api.add_resource(SignUp, '/user/signup')
api.add_resource(UserLogIn, "/user/login")

if __name__ == "__main__":
    app.run(port=5555, debug=True)
