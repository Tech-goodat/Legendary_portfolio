from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy_serializer import SerializerMixin
from datetime import datetime
from sqlalchemy.orm import validates


convention={
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}

metadata=MetaData(naming_convention=convention)
db=SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__='user'
    id=db.Column(db.Integer, primary_key=True)
    first_name=db.Column(db.String)
    last_name=db.Column(db.String)
    email=db.Column(db.String(30), unique=True, nullable=False)
    residence_country=db.Column(db.String)
    city=db.Column(db.String)
    mobile_number=db.Column(db.String(13))
    password=db.Column(db.String, nullable=False)
    
    @validates ('password')
    def validate_password(self, key, password):
        if len(password)<8 :
            raise ValueError('password must be more than 8 characters')
        return password
    
    @validates ('email')
    def validate_email(self, key, email):
        if not email.endswith("@gmail.com"):
            raise ValueError("Email must have the @ keyword ")
        return email