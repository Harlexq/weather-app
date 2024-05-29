from flask import make_response, jsonify, request
from flask_restful import Resource, reqparse
from flask_jwt_extended import JWTManager, create_access_token, jwt_required
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import datetime
from passlib.hash import md5_crypt
from avatar_generator import Avatar


from config import create_app, init_api, init_mysql
from views.functions import getDate, generate_salt, generate_salted_token, check_username, allowed_file

import datetime
import hashlib
import uuid
import os

app = create_app()
mysql = init_mysql(app)
api = init_api(app)

jwt = JWTManager(app)

app.config['JWT_SECRET_KEY'] = str(os.getenv('JWT_SECRET_KEY'))
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=15)

CORS(app)

load_dotenv()

SITE_URL = "http://127.0.0.1:90"

class Index(Resource):
    def get(self):
        return {'hello': 'world'}
    
class LoginAPI(Resource):
    def post(self):
        users = {
        'admin': {
            'password': os.getenv('ADMIN_PASSWORD')
            }
        }
        
        parser = reqparse.RequestParser()
        parser.add_argument('name', required=True)
        parser.add_argument('password', required=True)
        args = parser.parse_args()

        username = args['name']
        password = args['password']

        if username not in users:
            return {'message': 'Invalid username'}, 401

        if users[username]['password'] == password:
            if 'access_token' in users[username]:
                access_token = users[username]['access_token']
            else:
                access_token = create_access_token(identity=username)
                users[username]['access_token'] = access_token

            return {'token': access_token}, 200
        else:
            return {'message': 'Invalid password'}, 401
        
class Register(Resource):
    @jwt_required()
    def post(self):
        try:
            parser = reqparse.RequestParser()
    
            parser.add_argument('name', required=True)
            parser.add_argument('email', required=True)
            parser.add_argument('password', required=True)
            args = parser.parse_args()

            name = args['name']
            email = args['email']
            password = args['password']

            hpassword = md5_crypt.encrypt(password)

            controlName = check_username(name)

            if controlName == False:
                cursor.close()
                return {'error': 'Kullanici adi duzgun gonderilmemis'}, 400
    
            profileImage = "/avatar/{}".format(str(name))
            createdDate = getDate()
    
            salt = generate_salt()
            token = generate_salted_token(name, salt)

            cursor = mysql.connection.cursor()

            queryc = "SELECT * FROM users WHERE name = %s"
            querym = "SELECT * FROM users WHERE email = %s"

            resultc = cursor.execute(queryc, (name,))
            resultm = cursor.execute(querym, (email,))

            if resultc > 0:
                cursor.close()
                return {'error': 'kullanici adi zaten var'}, 400
            
            if resultm > 0:
                cursor.close()
                return {'error': 'mail adresi zaten var'}, 400

            query = "INSERT INTO users (name, profileImage, email, password, createdDate, token) VALUES (%s, %s, %s, %s, %s, %s)"
            cursor.execute(query, (name, profileImage, email, hpassword, createdDate, token))

            if cursor.rowcount > 0:
                mysql.connection.commit()
                cursor.close()

                return {'result': 'success'}, 200

            else:
                cursor.close()
                return {'error': 'mysql beklenmedik bir sekilde hata verdi.'}, 500

        except Exception as e:
            return {'error': 'Bir hata olustu: {}'.format(str(e))}, 500

class Login(Resource):
    @jwt_required()
    def post(self):
        try:
            parser = reqparse.RequestParser()

            parser.add_argument('name', required=True)
            parser.add_argument('password', required=True)
            args = parser.parse_args()

            name = args['name']
            password = args['password']

            cursor = mysql.connection.cursor()

            query = "SELECT * FROM users WHERE name = %s"
            result = cursor.execute(query, (name,))

            if result > 0:
                data = cursor.fetchone()

                if md5_crypt.verify(password, data['password']):
                    cursor.close()

                    user_dict = [
                        {
                            'id': data['id'],
                            'name': data['name'],
                            'profileImage': data['profileImage'],
                            'email': data['email'],
                            'createdDate': data['createdDate'],
                            'token': data['token']
                        }
                    ]

                    return jsonify(user_dict)
                
                else:
                    cursor.close()
                    return {'error': 'sifre hatali'}, 400

            else:
                cursor.close()
                return {'error': 'kullanici adi bulunamadi'}, 200


        except Exception as e:
            return {'error': 'Bir hata olustu: {}'.format(str(e))}, 500
        
class GetProfilePhoto(Resource):
    def get(self, photoName):
        avatar = Avatar.generate(128, photoName, "PNG")
        headers = { 'Content-Type': 'image/png' }

        return make_response(avatar, 200, headers)
    
class AddProfilePhoto(Resource):
    @jwt_required()
    def post(self, id):
        try:
            if 'file' not in request.files:
                return {"message": "No file part"}, 400
        
            file = request.files['file']
            if file.filename == '':
                return {"message": "No selected file"}, 400
            
            if file and allowed_file(file.filename):
                filename = str(uuid.uuid4()) + os.path.splitext(file.filename)[1]

                cursor = mysql.connection.cursor()

                fileurl = "static/uploads/" + filename

                query = "UPDATE users SET profileImage = %s WHERE id = %s"
                cursor.execute(query, (fileurl, id))

                if cursor.rowcount > 0:
                    mysql.connection.commit()
                    cursor.close()

                else:
                    cursor.close()
                    return {'message': 'mysql beklenmedik bir sekilde hata verdi veya id yanlis'}, 400


                file.save(os.path.join('static/uploads', filename))
                return {"message": "File uploaded successfully", "filename": filename}, 200

            else:
                return {'message': 'Invalid file type. Only .jpg, .jpeg, .png files are allowed.'}, 400

        except Exception as e:
            return {'message': 'Bir hata olustu: {}'.format(str(e))}, 500

class ChangePassword():
    def post(self):
        try:
            pas = "2"
    
        except Exception as e:
            return {'message': 'Bir hata olustu: {}'.format(str(e))}, 500

api.add_resource(Index, '/')
api.add_resource(LoginAPI, "/author")

api.add_resource(Register, "/register")
api.add_resource(Login, "/login")

api.add_resource(GetProfilePhoto, "/avatar/<photoName>")

api.add_resource(AddProfilePhoto, "/user/edit/profilePhoto/<id>")



if __name__ == "__main__":
    port = int(os.environ.get("PORT", 90))
    app.run(host="0.0.0.0", port=port, debug=True)