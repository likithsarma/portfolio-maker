# backend app urls.py
from django.urls import path
from .views import (
    GenerateLayoutAPIView,
    ResumeUploadAPIView,
    ResumeDetailAPIView,
    PortfolioCreateAPIView,
    PublicPortfolioAPIView,
    GenerateSummaryAPIView
)

urlpatterns = [
    path("upload-resume/", ResumeUploadAPIView.as_view(), name="upload-resume"),
    path("resume/<int:pk>/", ResumeDetailAPIView.as_view(), name="resume-detail"),
    path("portfolio/", PortfolioCreateAPIView.as_view(), name="portfolio-create"),
    path("portfolio/<slug:slug>/", PublicPortfolioAPIView.as_view(), name="portfolio-detail"),
    path("generate-summary/", GenerateSummaryAPIView.as_view(), name="generate-summary"),
    path("generate-layout/", GenerateLayoutAPIView.as_view(), name="generate-layout"),
]
