from typing import Optional, get_type_hints, Type

from ninja import Schema

# For debugging our dto chain 
def make_optional(schema_cls: Type[Schema]):
    """Modify the schema class to make all fields Optional."""
    annotations = get_type_hints(schema_cls)
    for key, value in annotations.items():
        if not hasattr(value, "__origin__") or value.__origin__ is not Optional:
            annotations[key] = Optional[value]
    schema_cls.__annotations__ = annotations
    return schema_cls


class BaseSchema(Schema):
    def __init_subclass__(cls, **kwargs):
        super().__init_subclass__(**kwargs)
        make_optional(cls)

class UserSchema(BaseSchema):
    id: int
    username: str
    avatar: str
    # first_name: Optional[str] # TODO: remove these from the model
    # last_name: Optional[str] # TODO: remove these from the model
    email: str


class UserCreateSchema(BaseSchema):
    username: Optional[str]
    avatar: Optional[str]
    password: str
    # first_name: Optional[str]
    # last_name: Optional[str]
    email: Optional[str]


class UserUpdateSchema(BaseSchema):
    username: Optional[str]
    # first_name: Optional[str]
    # last_name: Optional[str]
    email: Optional[str]


class UserCredentialsSchema(BaseSchema):
    user_id: int
    password_hash: str
