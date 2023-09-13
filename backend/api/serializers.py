from rest_framework import serializers
from users.models import User

class UserSerializer(serializers.ModelSerializer):
    id = serializers.SerializerMethodField('get_id')

    class Meta:
        model = User
        extra_fields = ['id']
        exclude = ('password', )

    def get_id(self, obj):
        return obj.pk