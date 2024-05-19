from datetime import datetime
import hashlib
import os

def getDate():
    now = datetime.now()
    
    turkish_months = [
        "Ocak", "Şubat", "Mart", "Nisan",
        "Mayıs", "Haziran", "Temmuz", "Ağustos",
        "Eylül", "Ekim", "Kasım", "Aralık"
    ]
    
    turkish_date = f"{now.day} - {turkish_months[now.month - 1]} - {now.year}"
    
    return turkish_date

def generate_salted_token(username: str, salt: str) -> str:
    salted_input = (username + salt).encode()
    hash_object = hashlib.sha256(salted_input)
    token = hash_object.hexdigest()
    return token

def generate_salt(length: int = 16) -> str:
    return os.urandom(length).hex()

def check_username(username):
    if ' ' in username:
        return False, "Kullanıcı adında boşluk bulunamaz."
    
    if len(username) < 4:
        return False, "Kullanıcı adı en az 4 karakterden oluşmalıdır."
    
    if username != username.lower():
        return False, "Kullanıcı adında büyük harf bulunamaz."
    
    if not username[0].isalpha():
        return False, "Kullanıcı adı bir harfle başlamalıdır."
    
    return True, "Kullanıcı adı geçerlidir."