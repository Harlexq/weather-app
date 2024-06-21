from flask import jsonify, request, send_from_directory
from flask_restful import Resource, reqparse
from flask_jwt_extended import JWTManager
from flask_mail import Message
from flask_cors import CORS
from dotenv import load_dotenv
from datetime import datetime
from passlib.hash import md5_crypt
from config import create_app, init_api, init_mysql, init_mail
from views.functions import  generate_salt, generate_salted_token, allowed_file
import datetime
import datetime as dt
import uuid
import os

app = create_app()
mysql = init_mysql(app)
api = init_api(app)
mail = init_mail(app)

jwt = JWTManager(app)
app.config['JWT_SECRET_KEY'] = str(os.getenv('JWT_SECRET_KEY'))
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = datetime.timedelta(minutes=15)
CORS(app)
load_dotenv()

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}

SITE_URL = "http://127.0.0.1:3500"

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)


def send_email(firstName, lastName, email, phone, rating, message):
    msg = Message("WEATHER-APP Geri Bildirim Formundan İleti", sender="help.dershane@gmail.com", recipients=["serhanbakir5@gmail.com"])
    msg.body = "FirstName: " + firstName + "\n LastName: " + lastName + "\n Email: " + email + "\n Phone: " + phone + "\n Rating: " + rating + "\n Message: " + message
    mail.send(msg)

class AdminSignup(Resource):
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

            cursor = mysql.connection.cursor()
            query_check_email = "SELECT * FROM adminusers WHERE email = %s"
            cursor.execute(query_check_email, (email,))
            if cursor.fetchone():
                cursor.close()
                return {'error': 'Email address already exists'}, 400

            hashed_password = md5_crypt.encrypt(password)

            profile_image = f"https://ui-avatars.com/api/?name={name}&size=256"

            created_date = datetime.datetime.now().strftime("%d/%m/%Y")

            salt = generate_salt()
            token = generate_salted_token(name, salt)

            query_insert_user = """
            INSERT INTO adminusers (name, profileImage, email, password, createdDate, token)
            VALUES (%s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query_insert_user, (name, profile_image, email, hashed_password, created_date, token))
            mysql.connection.commit()
            user_id = cursor.lastrowid
            cursor.close()

            return {'result': 'success', 'token': token, 'id': user_id}, 200

        except Exception as e:
            return {'error': f'An error occurred: {str(e)}'}, 500     
class AdminLogin(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()

            parser.add_argument('email', required=True)
            parser.add_argument('password', required=True)
            args = parser.parse_args()

            email = args['email']
            password = args['password']

            cursor = mysql.connection.cursor()

            query = "SELECT * FROM adminusers WHERE email = %s"
            result = cursor.execute(query, (email,))

            if result > 0:
                data = cursor.fetchone()

                if md5_crypt.verify(password, data['password']):
                    cursor.close()

                    return {'result': 'success', 'token': data['token'], 'id': data['id']}, 200
                
                else:
                    cursor.close()
                    return {'error': 'sifre hatali'}, 400

            else:
                cursor.close()
                return {'error': 'email adresi bulunamadi'}, 200


        except Exception as e:
            return {'error': 'Bir hata olustu: {}'.format(str(e))}, 500     
class AdminUsers(Resource):
    def get(self):
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT id, name, profileImage, email, createdDate, token FROM adminusers"
            cursor.execute(query)
            users = cursor.fetchall()
            cursor.close()
            
            if users:
                user_list = []
                for user in users:
                    user_dict = {
                        'id': user['id'],
                        'name': user['name'],
                        'profileImage': user['profileImage'],
                        'email': user['email'],
                        'createdDate': user['createdDate'],
                        'token': user['token']
                    }
                    user_list.append(user_dict)
                return jsonify(user_list)
            else:
                return {'message': 'No users found'}, 200

        except Exception as e:
            return {'error': 'Bir hata olustu: {}'.format(str(e))}, 500
class AdminUserById(Resource):
    def get(self, user_id):
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT id, name, profileImage, email, createdDate, token FROM adminusers WHERE id = %s"
            cursor.execute(query, (user_id,))
            user = cursor.fetchone()
            cursor.close()
            
            if user:
                user_dict = {
                    'id': user['id'],
                    'name': user['name'],
                    'profileImage': user['profileImage'],
                    'email': user['email'],
                    'createdDate': user['createdDate'],
                    'token': user['token']
                }
                return jsonify(user_dict)
            else:
                return {'message': 'User not found'}, 404

        except Exception as e:
            return {'error': 'Bir hata olustu: {}'.format(str(e))}, 500
class AdminDeleteUser(Resource):
    def delete(self, user_id):
        try:
            cursor = mysql.connection.cursor()
            
            query_check = "SELECT * FROM adminusers WHERE id = %s"
            result = cursor.execute(query_check, (user_id,))
            
            if result == 0:
                cursor.close()
                return {'error': 'User not found'}, 404
            
            query_delete = "DELETE FROM adminusers WHERE id = %s"
            cursor.execute(query_delete, (user_id,))
            
            mysql.connection.commit()
            cursor.close()
            
            return {'message': 'User deleted successfully'}, 200
        
        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500   
class AdminUpdateUser(Resource):
    def put(self, user_id):
        data = request.form
        name = data.get('name')
        email = data.get('email')
        
        file = request.files.get('profileImage')
        
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT profileImage FROM adminusers WHERE id = %s"
            cursor.execute(query, (user_id,))
            existing_image = cursor.fetchone()
            
            if file and allowed_file(file.filename):
                filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)
                image_url = f"{request.host_url}{UPLOAD_FOLDER}/{filename}"
                
                if existing_image:
                    existing_image_path = os.path.join(UPLOAD_FOLDER, os.path.basename(existing_image['profileImage']))
                    if os.path.exists(existing_image_path):
                        os.remove(existing_image_path)
                
            else:
                if existing_image:
                    image_url = existing_image['profileImage']
                else:
                    image_url = None
            
            query = """UPDATE adminusers SET name = %s, email = %s, profileImage = %s WHERE id = %s"""
            cursor.execute(query, (name, email, image_url, user_id))
            mysql.connection.commit()
            cursor.close()
            return {'message': 'User updated successfully'}, 200
        
        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500  
class Signup(Resource):
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

            cursor = mysql.connection.cursor()
            query_check_email = "SELECT * FROM users WHERE email = %s"
            cursor.execute(query_check_email, (email,))
            if cursor.fetchone():
                cursor.close()
                return {'error': 'Email address already exists'}, 400

            hashed_password = md5_crypt.encrypt(password)

            profile_image = f"https://ui-avatars.com/api/?name={name}&size=256"

            created_date = datetime.datetime.now().strftime("%d/%m/%Y")

            salt = generate_salt()
            token = generate_salted_token(name, salt)

            gender = ""
            country = ""
            city = ""

            query_insert_user = """
            INSERT INTO users (name, profileImage, email, password, createdDate, token, gender, country, city)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query_insert_user, (name, profile_image, email, hashed_password, created_date, token, gender, country, city))
            mysql.connection.commit()
            user_id = cursor.lastrowid
            cursor.close()

            return {'result': 'success', 'token': token, 'id': user_id}, 200

        except Exception as e:
            return {'error': f'An error occurred: {str(e)}'}, 500
class Login(Resource):
    def post(self):
        try:
            parser = reqparse.RequestParser()

            parser.add_argument('email', required=True)
            parser.add_argument('password', required=True)
            args = parser.parse_args()

            email = args['email']
            password = args['password']

            cursor = mysql.connection.cursor()

            query = "SELECT * FROM users WHERE email = %s"
            result = cursor.execute(query, (email,))

            if result > 0:
                data = cursor.fetchone()

                if md5_crypt.verify(password, data['password']):
                    cursor.close()

                    return {'result': 'success', 'token': data['token'], 'id': data['id']}, 200
                
                else:
                    cursor.close()
                    return {'error': 'sifre hatali'}, 400

            else:
                cursor.close()
                return {'error': 'email adresi bulunamadi'}, 200

        except Exception as e:
            return {'error': 'Bir hata olustu: {}'.format(str(e))}, 500    
class Users(Resource):
    def get(self):
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT id, name, profileImage, email, createdDate, gender, country, city, token FROM users"
            cursor.execute(query)
            users = cursor.fetchall()
            cursor.close()
            
            if users:
                user_list = []
                for user in users:
                    user_dict = {
                        'id': user['id'],
                        'name': user['name'],
                        'profileImage': user['profileImage'],
                        'email': user['email'],
                        'createdDate': user['createdDate'],
                        'gender': user['gender'],
                        'country': user['country'],
                        'city': user['city'],
                        'token': user['token']
                    }
                    user_list.append(user_dict)
                return jsonify(user_list)
            else:
                return {'message': 'No users found'}, 200

        except Exception as e:
            return {'error': 'Bir hata olustu: {}'.format(str(e))}, 500
class UserById(Resource):
    def get(self, user_id):
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT id, name, profileImage, email, createdDate, gender, country, city, token FROM users WHERE id = %s"
            cursor.execute(query, (user_id,))
            user = cursor.fetchone()
            cursor.close()
            
            if user:
                user_dict = {
                    'id': user['id'],
                    'name': user['name'],
                    'profileImage': user['profileImage'],
                    'email': user['email'],
                    'createdDate': user['createdDate'],
                    'gender': user['gender'],
                    'country': user['country'],
                    'city': user['city'],
                    'token': user['token']
                }
                return jsonify(user_dict)
            else:
                return {'message': 'User not found'}, 404

        except Exception as e:
            return {'error': 'Bir hata olustu: {}'.format(str(e))}, 500
class DeleteUser(Resource):
    def delete(self, user_id):
        try:
            cursor = mysql.connection.cursor()
            
            query_check = "SELECT * FROM users WHERE id = %s"
            result = cursor.execute(query_check, (user_id,))
            
            if result == 0:
                cursor.close()
                return {'error': 'User not found'}, 404
            
            query_delete = "DELETE FROM users WHERE id = %s"
            cursor.execute(query_delete, (user_id,))
            
            mysql.connection.commit()
            cursor.close()
            
            return {'message': 'User deleted successfully'}, 200
        
        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500
class UpdateUser(Resource):
    def put(self, user_id):
        data = request.form
        name = data.get('name')
        email = data.get('email')
        gender = data.get('gender')
        country = data.get('country')
        city = data.get('city')
        
        file = request.files.get('profileImage')
        
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT profileImage FROM users WHERE id = %s"
            cursor.execute(query, (user_id,))
            existing_image = cursor.fetchone()
            
            if file and allowed_file(file.filename):
                filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)
                image_url = f"{request.host_url}{UPLOAD_FOLDER}/{filename}"
                
                if existing_image:
                    existing_image_path = os.path.join(UPLOAD_FOLDER, os.path.basename(existing_image['profileImage']))
                    if os.path.exists(existing_image_path):
                        os.remove(existing_image_path)
                
            else:
                if existing_image:
                    image_url = existing_image['profileImage']
                else:
                    image_url = None
            
            query = """UPDATE users SET name = %s, email = %s, gender = %s, country = %s, city = %s, profileImage = %s WHERE id = %s"""
            cursor.execute(query, (name, email, gender, country, city, image_url, user_id))
            mysql.connection.commit()
            cursor.close()
            return {'message': 'User updated successfully'}, 200
        
        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500  
class Citys(Resource):
    def get(self):
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT id, name, flag, path FROM citys"
            cursor.execute(query)
            citys = cursor.fetchall()
            cursor.close()
            
            if citys:
                city_list = []
                for city in citys:
                    city_dict = {
                        'id': city['id'],
                        'name': city['name'],
                        'flag': city['flag'],
                        'path': city['path'],
                    }
                    city_list.append(city_dict)
                return jsonify(city_list)
            else:
                return {'message': 'No citys found'}, 200

        except Exception as e:
            return {'error': 'Bir hata olustu: {}'.format(str(e))}, 500    
class CityCreate(Resource):
    def post(self):
        try:
            name = request.form.get('name')
            path = request.form.get('path')
            file = request.files.get('flag')

            if file and allowed_file(file.filename):
                filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)
                image_url = f"{request.host_url}{UPLOAD_FOLDER}/{filename}"
            else:
                image_url = None

            cursor = mysql.connection.cursor()
            query = "INSERT INTO citys (name, path, flag) VALUES (%s, %s, %s)"
            cursor.execute(query, (name, path, image_url))
            mysql.connection.commit()

            new_city_id = cursor.lastrowid
            cursor.close()

            return {'message': 'City created successfully', 'id': new_city_id}, 201
        
        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500
class City(Resource):
    def get(self, city_id):
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT id, name, flag, path FROM citys WHERE id = %s"
            cursor.execute(query, (city_id,))
            city = cursor.fetchone()
            cursor.close()

            if city:
                return jsonify(city)
            else:
                return {'message': 'City not found'}, 404

        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500

    def put(self, city_id):
        data = request.form
        name = data.get('name')
        path = data.get('path')
        
        file = request.files.get('flag')
        
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT flag FROM citys WHERE id = %s"
            cursor.execute(query, (city_id,))
            existing_image = cursor.fetchone()
            
            if file and allowed_file(file.filename):
                filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)
                image_url = f"{request.host_url}{UPLOAD_FOLDER}/{filename}"
                
                if existing_image:
                    existing_image_path = os.path.join(UPLOAD_FOLDER, os.path.basename(existing_image['flag']))
                    if os.path.exists(existing_image_path):
                        os.remove(existing_image_path)
                
            else:
                if existing_image:
                    image_url = existing_image['flag']
                else:
                    image_url = None
            
            query = """UPDATE citys SET name = %s, path = %s, flag = %s WHERE id = %s"""
            cursor.execute(query, (name, path, image_url, city_id))
            mysql.connection.commit()
            cursor.close()
            return {'message': 'City updated successfully'}, 200
        
        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500

    def delete(self, city_id):
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT flag FROM citys WHERE id = %s"
            cursor.execute(query, (city_id,))
            image_data = cursor.fetchone()
            
            query = "DELETE FROM citys WHERE id = %s"
            cursor.execute(query, (city_id,))
            mysql.connection.commit()
            cursor.close()
            
            if image_data and image_data['flag']:
                image_path = os.path.join(UPLOAD_FOLDER, os.path.basename(image_data['flag']))
                if os.path.exists(image_path):
                    os.remove(image_path)
            
            return {'message': 'City deleted successfully'}, 200
        
        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500
class Blogs(Resource):
    def get(self):
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT id, title, author, publicationDate, city, image, description FROM blogs"
            cursor.execute(query)
            blogs = cursor.fetchall()
            cursor.close()
            
            if blogs:
                blog_list = []
                for blog in blogs:
                    blog_dict = {
                        'id': blog['id'],
                        'title': blog['title'],
                        'author': blog['author'],
                        'publicationDate': blog['publicationDate'],
                        'city': blog['city'],
                        'image': blog['image'],
                        'description': blog['description']
                    }
                    blog_list.append(blog_dict)
                return jsonify(blog_list)
            else:
                return {'message': 'No blogs found'}, 200

        except Exception as e:
            return {'error': 'Bir hata olustu: {}'.format(str(e))}, 500
class BlogCreate(Resource):
    def post(self):
        try:
            title = request.form.get('title')
            author = request.form.get('author')
            city = request.form.get('city')
            description = request.form.get('description')
            file = request.files.get('image')

            if file and allowed_file(file.filename):
                filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)
                image_url = f"{request.host_url}{UPLOAD_FOLDER}/{filename}"
            else:
                image_url = None

            publicationDate = datetime.datetime.now().strftime("%d/%m/%Y")

            cursor = mysql.connection.cursor()
            query = "INSERT INTO blogs (title, author, publicationDate, city, image, description) VALUES (%s, %s, %s, %s, %s, %s)"
            cursor.execute(query, (title, author, publicationDate, city, image_url, description))
            mysql.connection.commit()

            new_blog_id = cursor.lastrowid
            cursor.close()

            return {'message': 'Blog created successfully', 'id': new_blog_id}, 201
        
        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500
class Blog(Resource):
    def get(self, blog_id):
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT id, title, author, publicationDate, city, image, description FROM blogs WHERE id = %s"
            cursor.execute(query, (blog_id,))
            blog = cursor.fetchone()
            cursor.close()

            if blog:
                return jsonify(blog)
            else:
                return {'message': 'Blog not found'}, 404

        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500

    def put(self, blog_id):
        data = request.form  # use request.form to access form data
        title = data.get('title')
        city = data.get('city')
        description = data.get('description')
        
        # Check if image file is sent
        file = request.files.get('image')
        
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT image FROM blogs WHERE id = %s"
            cursor.execute(query, (blog_id,))
            existing_image = cursor.fetchone()
            
            # If a new image file is uploaded, save it and update the database
            if file and allowed_file(file.filename):
                filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)
                image_url = f"{request.host_url}{UPLOAD_FOLDER}/{filename}"
                
                # Delete the existing image file if there was one
                if existing_image:
                    existing_image_path = os.path.join(UPLOAD_FOLDER, os.path.basename(existing_image['image']))
                    if os.path.exists(existing_image_path):
                        os.remove(existing_image_path)
                
            else:
                # No new image file uploaded, keep the existing one
                if existing_image:
                    image_url = existing_image['image']
                else:
                    image_url = None
            
            query = """UPDATE blogs SET title = %s, city = %s, description = %s, image = %s WHERE id = %s"""
            cursor.execute(query, (title, city, description, image_url, blog_id))
            mysql.connection.commit()
            cursor.close()
            return {'message': 'Blog updated successfully'}, 200
        
        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500

    def delete(self, blog_id):
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT image FROM blogs WHERE id = %s"
            cursor.execute(query, (blog_id,))
            image_data = cursor.fetchone()
            
            query = "DELETE FROM blogs WHERE id = %s"
            cursor.execute(query, (blog_id,))
            mysql.connection.commit()
            cursor.close()
            
            # Delete associated image file if exists
            if image_data and image_data['image']:
                image_path = os.path.join(UPLOAD_FOLDER, os.path.basename(image_data['image']))
                if os.path.exists(image_path):
                    os.remove(image_path)
            
            return {'message': 'Blog deleted successfully'}, 200
        
        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500


    def put(self, user_id):
        data = request.form
        name = data.get('name')
        email = data.get('email')
        gender = data.get('gender')
        country = data.get('country')
        city = data.get('city')
        
        file = request.files.get('profileImage')
        
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT profileImage FROM users WHERE id = %s"
            cursor.execute(query, (user_id,))
            existing_image = cursor.fetchone()
            
            if file and allowed_file(file.filename):
                filename = str(uuid.uuid4()) + '.' + file.filename.rsplit('.', 1)[1].lower()
                filepath = os.path.join(UPLOAD_FOLDER, filename)
                file.save(filepath)
                image_url = f"{request.host_url}{UPLOAD_FOLDER}/{filename}"
                
                if existing_image:
                    existing_image_path = os.path.join(UPLOAD_FOLDER, os.path.basename(existing_image['profileImage']))
                    if os.path.exists(existing_image_path):
                        os.remove(existing_image_path)
                
            else:
                if existing_image:
                    image_url = existing_image['profileImage']
                else:
                    image_url = None
            
            query = """UPDATE users SET name = %s, email = %s, gender = %s, country = %s, city = %s, profileImage = %s WHERE id = %s"""
            cursor.execute(query, (name, email, gender, country, city, image_url, user_id))
            mysql.connection.commit()
            cursor.close()
            return {'message': 'User updated successfully'}, 200
        
        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500  

class Comments(Resource):
    def get(self):
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT id, personId, publicationDate, city, message FROM comments"
            cursor.execute(query)
            comments = cursor.fetchall()
            cursor.close()
            
            if comments:
                comment_list = []
                for comment in comments:
                    comment_dict = {
                        'id': comment['id'],
                        'personId': comment['personId'],
                        'publicationDate': comment['publicationDate'],
                        'city': comment['city'],
                        'message': comment['message'],
                    }
                    comment_list.append(comment_dict)
                return jsonify(comment_list)
            else:
                return {'message': 'No comments found'}, 200

        except Exception as e:
            return {'error': 'Bir hata olustu: {}'.format(str(e))}, 500   
class CommentsByCity(Resource):
    def get(self, city_name):
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT id, personId, publicationDate, city, message FROM comments WHERE city = %s"
            cursor.execute(query, (city_name,))
            comments = cursor.fetchall()
            cursor.close()
            
            if comments:
                comment_list = []
                for comment in comments:
                    comment_dict = {
                        'id': comment['id'],
                        'personId': comment['personId'],
                        'publicationDate': comment['publicationDate'],
                        'city': comment['city'],
                        'message': comment['message'],
                    }
                    comment_list.append(comment_dict)
                return jsonify(comment_list)
            else:
                return {'message': 'No comments found for this city'}, 404

        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500
        

class CommentCreate(Resource):
    def post(self):
        try:
            data = request.get_json()
            personId = data.get('personId')
            city = data.get('city')
            message = data.get('message')

            publicationDate = datetime.datetime.now().strftime("%d/%m/%Y")

            cursor = mysql.connection.cursor()
            query = "INSERT INTO comments (personId, city, publicationDate, message) VALUES (%s, %s, %s, %s)"
            cursor.execute(query, (personId, city, publicationDate, message))
            mysql.connection.commit()

            new_comment_id = cursor.lastrowid
            cursor.close()

            return {'message': 'Comment created successfully', 'id': new_comment_id}, 201
        
        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500

class Comment(Resource):
    def get(self, comment_id):
        try:
            cursor = mysql.connection.cursor()
            query = "SELECT id, personId, city, publicationDate, message FROM comments WHERE id = %s"
            cursor.execute(query, (comment_id,))
            comment = cursor.fetchone()
            cursor.close()

            if comment:
                comment_dict = {
                    'id': comment['id'],
                    'personId': comment['personId'],
                    'publicationDate': comment['publicationDate'].strftime("%Y-%m-%d"),
                    'city': comment['city'],
                    'message': comment['message'],
                }
                return jsonify(comment_dict)
            else:
                return {'message': 'Comment not found'}, 404

        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500

    def delete(self, comment_id):
        try:
            cursor = mysql.connection.cursor()
            
            query = "DELETE FROM comments WHERE id = %s"
            cursor.execute(query, (comment_id,))
            mysql.connection.commit()
            cursor.close()
            
            return {'message': 'Comment deleted successfully'}, 200
        
        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500

class FeedBack(Resource):
    def post(self):
        try:
            data = request.get_json()
            firstName = data.get('firstName')
            lastName = data.get('lastName')
            email = data.get('email')
            phone = data.get('phone')
            rating = data.get('rating')
            message = data.get('message')

            send_email(firstName, lastName, email, phone, rating, message)

            return {'message': 'success'}, 200
        
        except Exception as e:
            return {'error': 'An error occurred: {}'.format(str(e))}, 500


@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)

api.add_resource(AdminSignup, "/adminSignup")
api.add_resource(AdminLogin, "/adminLogin")
api.add_resource(AdminUsers, "/adminUsers")
api.add_resource(AdminUserById, "/adminUser/<int:user_id>")
api.add_resource(AdminDeleteUser, "/adminUser/<int:user_id>")
api.add_resource(AdminUpdateUser, "/adminUser/<int:user_id>")

api.add_resource(Signup, "/signup")
api.add_resource(Login, "/login")
api.add_resource(Users, "/users")
api.add_resource(UserById, "/user/<int:user_id>")
api.add_resource(DeleteUser, "/user/<int:user_id>")
api.add_resource(UpdateUser, "/user/<int:user_id>")

api.add_resource(Blogs, "/blogs")
api.add_resource(BlogCreate, "/blogCreate")
api.add_resource(Blog, "/blog/<int:blog_id>")

api.add_resource(Citys, "/citys")
api.add_resource(CityCreate, "/cityCreate")
api.add_resource(City, "/city/<int:city_id>")

api.add_resource(Comments, '/comments')
api.add_resource(CommentCreate, '/commentCreate')
api.add_resource(Comment, '/comment/<int:comment_id>')
api.add_resource(CommentsByCity, '/comments/city/<string:city_name>')

api.add_resource(FeedBack, "/feedback")

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 3500))
    app.run(host="0.0.0.0", port=port, debug=True)