from rest_framework import serializers
from .models import Resume
from .models import Portfolio

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ["id", "name", "parsed_data", "created_at"]

class PortfolioSerializer(serializers.ModelSerializer):
    resume_data = serializers.SerializerMethodField()

    class Meta:
        model = Portfolio
        fields = ["id", "template_name", "slug", "is_published", "resume_data"]
        read_only_fields = ["slug", "is_published", "resume_data"]

    def get_resume_data(self, obj):
        return obj.resume.parsed_data